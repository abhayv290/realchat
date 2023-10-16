
const socket = io();






send_btn.addEventListener('click', (e) => {
    const message = inpmsg.value;

    if (message) {
        socket.emit('user-message', message);
    }
});
socket.on("message", (message) => {
    const p = document.createElement('p');

    p.innerText = message;
    document.getElementById('user2').append(p);
})




