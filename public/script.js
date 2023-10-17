const socket = io('http://localhost:3000');
// For connecting the server to the client  

const names = prompt('Enter the name for new joinee');
socket.emit('new-user-joined', names);

let messageSpan;
const main_container = document.getElementById('new-usr');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageSpan = document.createElement('span');
    messageSpan.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    main_container.append(messageElement);
    messageElement.append(messageSpan);
    messageSpan.classList.add('messagespan')
    messageSpan.style.margin = '10px'
}

socket.on('User-Joined', names => {
    append(`${names} joined the chat `, 'center');
    document.getElementById('contactname').innerHTML = names;
    messageSpan.style.background = 'cyan';
})
socket.on('leave', names => {
    append(`${names} left  the chat `, 'center');
    messageSpan.style.background = 'red';

})



send_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = inpmsg.value;
    if (message) {
        append('You:' + message, 'right');
        messageSpan.style.background = 'cornflowerblue'
        socket.emit('user-message', message);
        inpmsg.value = '';

    }
});

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
    messageSpan.style.background = 'palegreen';

})

const info = document.getElementById('infobtn');
infobtn.addEventListener('click', (e) => {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    }
    else menu.classList.add('hidden');

});





















// socket.on("message", (message) => {
//     const p = document.createElement('p');

//     p.innerText = message;
//     document.getElementById('user2').append(p);
// })




