// Required modules

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

// Express configurations
let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public')

let app = express()
let server = http.createServer(app)
let io = socketIO(server)
app.use(express.static(publicPath))

// Web socket methods for emmision or listening of the events

io.on('connection', function (socket) {
    console.log('New user connected!');

    // let messageData = {
    //     from: 'jatin.yadav1307@gmail.com',
    //     text: 'Hello world from email application',
    //     createdAt: 1212312321,
    // }
    // socket.emit('newMessage', messageData)

    socket.on('createMessage', function (messsage) {
        console.log(messsage)
        io.emit('newMessage', {
            from: messsage.from,
            text: messsage.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', function () {
        console.log('Disconnected from the client!')
    })
})

// Starting up the server

server.listen(port, function () {
    console.log(`Server started at port : ${port}`)
})