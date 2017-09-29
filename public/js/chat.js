// Sends request to the server to open up the web socket connection
let socket = io();

socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err)
            window.location.href = '/'
        }
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server!')
})

socket.on('updateUserList', function (users) {
    let ol = $('<ol></ol>')

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user))
    })

    $('#users').html(ol);
})

function scrollToBottom() {
    let messages = $('#messages')
    let newMessage = messages.children('li:last-child')
    let clientHeight = messages.prop('clientHeight')
    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')
    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

// Run this function when a new message arrives from the server to the client
socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a')
    var tempate = $('#message-template').html()
    var html = Mustache.render(tempate, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

    $('#messages').append(html)
    scrollToBottom()
    // let li = $('<li></li>')
    // li.text(`${formattedTime} -- ${message.from}: ${message.text}`)

    // $('#messages').append(li);
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
    let messageTextbox = $('[name=message]')

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    })
})