const http = require('http');
const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const { Socket } = require('engine.io');
const port = 3000;
const server = http.createServer(app);
const { Server } = require('socket.io');
app.use(cors());

const io = new Server(server);



app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname, '/public/index.html');
})


// ON Connect-Disconnect

io.on('connection', (socket) => {

    socket.on('user-message', (message) => {
        console.log('new message ' + message);
        io.emit("message", message);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
})