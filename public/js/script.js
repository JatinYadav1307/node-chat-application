// Sends request to the server to open up the web socket connection
let socket = io();

socket.on('connect', function () {
    console.log('Connected to the server!')

    // let messageData = {
    //     from: 'jatin.yadav1307@gmail.com',
    //     text: 'Hello world from email application',
    // }
    // socket.emit('createMessage', messageData)
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server!')
})

socket.on('newMessage', function (message) {
    console.log('New Message!', message)
})