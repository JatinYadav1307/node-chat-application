// Sends request to the server to open up the web socket connection
let socket = io();

// socket.on('connect', function () {
//     console.log('Connected to the server!')

// })

// socket.on('disconnect', function () {
//     console.log('Disconnected from the server!')
// })

// Run this function when a new message arrives from the server to the client
socket.on('newMessage', function (message) {
    // console.log('New Message!', message)
    let li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li);
})

// let messageData = {
//     from: 'jatin.yadav1307@gmail.com',
//     text: 'Hello world from email application',
// }
// socket.emit('createMessage', messageData, function () {
//     console.log('Got it, all good!')
// })


// Get the message from the form and submit it to the server to broadcast to all the user
$('#message-form').on('submit', function (e) {
    // Prevents the default event triggering
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {
        console.log('Message Sent!')
    })
})