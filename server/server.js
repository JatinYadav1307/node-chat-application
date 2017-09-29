// Required modules

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {isRealString} = require('./utils/validation')
const {generateMessage} = require('./utils/message')
const {Users} = require('./utils/users')

// Express configurations
let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public')

let app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users()
app.use(express.static(publicPath))

// Web socket methods for emmision or listening of the events

io.on('connection', function (socket) {
    // console.log('New user connected!');
    socket.on('join', function (params, callback) {
        
        if (!isRealString(params.name) || !isRealString(params.password)) {
            return callback('Password or Display name is invalid')
        } else if (params.password !== 'no-pants-mafia') {
            return callback('Password Incorrect!')
        }
        
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name)

        io.emit('updateUserList', users.getUserList())
        callback();
    })

    // Emitting a new message once the user is connected to welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application!'))
    // Letting others know that a new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    // Whenever a user creates or send a message, broadcasting it to all the other users as well to view
    socket.on('createMessage', function (messsage, callback) {
        // console.log(messsage)
        let username = users.getUser(socket.id).name
        io.emit('newMessage', generateMessage(username, messsage.text))
        callback();
    })

    // Run, when a user disconnects from the server
    socket.on('disconnect', function () {
        var user = users.removeUser(socket.id)
        if (user) {
            io.emit('updateUserList', users.getUserList());
            io.emit('newMessage', generateMessage('Admin', `${user.name} has left the chat!`))
        }
    })
})

// Starting up the server

server.listen(port, function () {
    console.log(`Server started at port : ${port}`)
})