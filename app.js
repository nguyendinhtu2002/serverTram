const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketio(server);
let adminSocket = null; // Biến lưu trữ socket của admin
let userSockets = {}; // Đối tượng lưu trữ socket của từng khách hàng

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('admin', () => {
    adminSocket = socket;
    console.log('Admin connected');

    
  });

  socket.on('user', () => {
    userSockets[socket.id] = socket;
    console.log('User connected');
    socket.emit('message', 'Xin chào, bạn có cần hỗ trợ gì không?');

  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    if (socket === adminSocket) {
      // Nếu tin nhắn được gửi từ admin, gửi đến khách hàng
      for (const userSocket of Object.values(userSockets)) {
        userSocket.emit('message', data);
      }
    } else {
      // Nếu tin nhắn được gửi từ khách hàng, gửi đến admin
      if (adminSocket) {
        adminSocket.emit('message', data);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (socket === adminSocket) {
      adminSocket = null;
      console.log('Admin disconnected');
    } else {
      delete userSockets[socket.id];
    }
  });
});

app.use(express.static('public'));