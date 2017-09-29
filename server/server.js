// Required modules

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

// Express configurations
let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public')

let app = express()
let server = http.createServer(app)
let io = socketIO(server)
app.use(express.static(publicPath))

// Web socket methods for emmision or listening of the events

io.on('connection', function (socket) {
    // console.log('New user connected!');

    // Emitting a new message once the user is connected to welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application!'))
    // Letting others know that a new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    // Whenever a user creates or send a message, broadcasting it to all the other users as well to view
    socket.on('createMessage', function (messsage, callback) {
        // console.log(messsage)
        io.emit('newMessage', generateMessage(messsage.from, messsage.text))
        callback();
    })

    // Run, when a user disconnects from the server
    // socket.on('disconnect', function () {
    //     console.log('Disconnected from the client!')
    // })
})

// Starting up the server

server.listen(port, function () {
    console.log(`Server started at port : ${port}`)
})