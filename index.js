const io = require('socket.io')(3000);



// ON Connect-Disconnect
const user = {};
io.on('connection', (socket) => {

    socket.on('new-user-joined', (name) => {
        user[socket.id] = name;
        console.log(name, ' joined');
        socket.broadcast.emit("User-Joined", name);
    })

    socket.on('user-message', (message) => {
        console.log('user-message', message);
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', user[socket.id]);
        delete user[socket.id];
    })
});


