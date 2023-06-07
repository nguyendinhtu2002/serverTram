// const express = require('express');
// const socketio = require('socket.io');

// const app = express();
// const server = app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const io = socketio(server);
// let adminSocket = null; // Biến lưu trữ socket của admin
// let userSockets = {}; // Đối tượng lưu trữ socket của từng khách hàng

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/admin', (req, res) => {
//   res.sendFile(__dirname + '/public/admin.html');
// });

// // io.on('connection', (socket) => {
// //   console.log('A user connected');

// //   socket.on('admin', () => {
// //     adminSocket = socket;
// //     console.log('Admin connected');

// //   });

// //   socket.on('user', () => {
// //     userSockets[socket.id] = socket;
// //     console.log('User connected');
// //     socket.emit('message', 'Xin chào, bạn có cần hỗ trợ gì không?');

// //   });

// //   socket.on('message', (data) => {
// //     console.log('Message received:', data);
// //     if (socket === adminSocket) {
// //       // Nếu tin nhắn được gửi từ admin, gửi đến khách hàng
// //       for (const userSocket of Object.values(userSockets)) {
// //         userSocket.emit('message', data);
// //       }
// //     } else {
// //       // Nếu tin nhắn được gửi từ khách hàng, gửi đến admin
// //       if (adminSocket) {
// //         adminSocket.emit('message', data);
// //       }
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('A user disconnected');
// //     if (socket === adminSocket) {
// //       adminSocket = null;
// //       console.log('Admin disconnected');
// //     } else {
// //       delete userSockets[socket.id];
// //     }
// //   });
// // });
// // ...

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('admin', () => {
//     adminSocket = socket;
//     console.log('Admin connected');
//   });

//   socket.on('user', () => {
//     userSockets[socket.id] = socket;
//     console.log('User connected');

//     // Gửi tin nhắn chào mừng từ admin đến người dùng
//     socket.emit('message', { from: 'Admin', message: 'Xin chào, bạn có cần hỗ trợ gì không?' });

//     // Thông báo kết nối người dùng mới cho admin
//     if (adminSocket) {
//       adminSocket.emit('userConnected', socket.id);
//     }
//   });

//   socket.on('message', (data) => {
//     console.log('Message received:', data);
//     const { userId, message } = data;

//     if (socket === adminSocket) {
//       // Nếu tin nhắn được gửi từ admin, gửi đến người dùng cụ thể
//       const userSocket = userSockets[userId];
//       if (userSocket) {
//         userSocket.emit('message', { from: 'Admin', message:data });
//       }
//     } else {
//       // Nếu tin nhắn được gửi từ người dùng, gửi đến admin
//       if (adminSocket) {
//         adminSocket.emit('message', { from: `User ${socket.id}`, message:data });
//       }
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//     if (socket === adminSocket) {
//       adminSocket = null;
//       console.log('Admin disconnected');
//     } else {
//       delete userSockets[socket.id];
//       // Thông báo ngắt kết nối người dùng cho admin
//       if (adminSocket) {
//         adminSocket.emit('userDisconnected', socket.id);
//       }
//     }
//   });
// });

// // io.on('connection', (socket) => {
// //   console.log('A user connected');

// //   socket.on('admin', () => {
// //     adminSocket = socket;
// //     console.log('Admin connected');
// //   });

// //   socket.on('user', () => {
// //     userSockets[socket.id] = socket;
// //     console.log('User connected');

// //     // Gửi tin nhắn chào mừng từ admin đến người dùng
// //     socket.emit('message', { from: 'Admin', message: 'Xin chào, bạn có cần hỗ trợ gì không?' });

// //     // Thông báo kết nối người dùng mới cho admin
// //     if (adminSocket) {
// //       adminSocket.emit('userConnected', socket.id);
// //     }
// //   });

// //   socket.on('message', (data) => {
// //     console.log('Message received:', data);
// //     const { userId, message } = data;

// //     if (socket === adminSocket) {
// //       // Nếu tin nhắn được gửi từ admin, gửi đến người dùng cụ thể hoặc tất cả người dùng
// //       if (userId === 'all') {
// //         // Gửi tin nhắn đến tất cả người dùng
// //         for (const userSocket of Object.values(userSockets)) {
// //           userSocket.emit('message', { from: 'Admin', message });
// //         }
// //       } else {
// //         // Gửi tin nhắn đến người dùng cụ thể
// //         const userSocket = userSockets[userId];
// //         if (userSocket) {
// //           userSocket.emit('message', { from: 'Admin', message });
// //         }
// //       }
// //     }
// //   });

// //   socket.on('messageToUser', (data) => {
// //     console.log('Message to user received:', data);
// //     const { userId, message } = data;

// //     if (socket === adminSocket) {
// //       // Nếu tin nhắn được gửi từ admin, gửi đến người dùng cụ thể
// //       const userSocket = userSockets[userId];
// //       if (userSocket) {
// //         userSocket.emit('message', { from: 'Admin', message });
// //       }
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('A user disconnected');
// //     if (socket === adminSocket) {
// //       adminSocket = null;
// //       console.log('Admin disconnected');
// //     } else {
// //       delete userSockets[socket.id];
// //       // Thông báo ngắt kết nối người dùng cho admin
// //       if (adminSocket) {
// //         adminSocket.emit('userDisconnected', socket.id);
// //       }
// //     }
// //   });
// // });

// app.use(express.static('public'));

// const express = require('express');
// const socketio = require('socket.io');

// const app = express();
// const server = app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const io = socketio(server);
// let adminSocket = null;
// let userSockets = {};
// let userMessages = {}; // Lưu trữ tin nhắn từng người dùng

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/admin', (req, res) => {
//   res.sendFile(__dirname + '/public/admin.html');
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('admin', () => {
//     adminSocket = socket;
//     console.log('Admin connected');

//     // Khôi phục thông tin phiên chát cho admin khi kết nối lại
//     for (const userId in userMessages) {
//       userMessages[userId].forEach((message) => {
//         adminSocket.emit('message', { from: `User ${userId}`, message });
//       });
//     }
//   });

//   socket.on('user', () => {
//     userSockets[socket.id] = socket;
//     console.log('User connected');

//     // Gửi tin nhắn chào mừng từ admin đến người dùng
//     socket.emit('message', { from: 'Admin', message: 'Xin chào, bạn có cần hỗ trợ gì không?' });

//     // Thông báo kết nối người dùng mới cho admin
//     if (adminSocket) {
//       adminSocket.emit('userConnected', socket.id);
//     }

//     // Khôi phục thông tin phiên chát cho người dùng khi kết nối lại
//     if (socket.id in userMessages) {
//       userMessages[socket.id].forEach((message) => {
//         socket.emit('message', { from: 'Admin', message });
//       });
//     }
//   });

//   socket.on('message', (data) => {
//     console.log('Message received:', data);
//     const { userId, message } = data;

//     if (socket === adminSocket) {
//       // Nếu tin nhắn được gửi từ admin, gửi đến người dùng cụ thể hoặc tất cả người dùng
//       if (userId === 'all') {
//         for (const userSocket of Object.values(userSockets)) {
//           userSocket.emit('message', { from: 'Admin', message:data });
//         }
//       } else {
//         const userSocket = userSockets[userId];
//         if (userSocket) {
//           userSocket.emit('message', { from: 'Admin', message:data });
//         }
//       }
//     } else {
//       // Nếu tin nhắn được gửi từ người dùng, gửi đến admin
//       if (adminSocket) {
//         adminSocket.emit('message', { from: `User ${socket.id}`, message:data });
//       }
//       // Lưu tin nhắn trong phiên chát của người dùng
//       if (!userMessages[socket.id]) {
//         userMessages[socket.id] = [];
//       }
//       userMessages[socket.id].push({ from: `User ${socket.id}`, message:data });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//     if (socket === adminSocket) {
//       adminSocket = null;
//       console.log('Admin disconnected');
//     } else {
//       delete userSockets[socket.id];
//       // Thông báo ngắt kết nối người dùng cho admin
//       if (adminSocket) {
//         adminSocket.emit('userDisconnected', socket.id);
//       }
//     }
//   });
// });
const express = require("express");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const Message = require("./models/MessageModel");
const session = require("express-session");
dotenv.config();
const connectDatabase = require("./config/MongoDb.js");

connectDatabase();

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = socketio(server);
let adminSocket = null;
let userSockets = {};



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("admin", () => {
    adminSocket = socket;
    console.log("Admin connected");

    // Khôi phục thông tin phiên chát cho admin khi kết nối lại
    Message.find({})
      .then((messages) => {
        messages.forEach((message) => {
          adminSocket.emit("message", {
            from: `User ${message.userId}`,
            message: message.message,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  socket.on("user", () => {
    userSockets[socket.id] = socket;
    console.log("User connected");

    // Gửi tin nhắn chào mừng từ admin đến người dùng
    socket.emit("message", {
      from: "Admin",
      message: "Xin chào, bạn có cần hỗ trợ gì không?",
    });

    // Thông báo kết nối người dùng mới cho admin
    if (adminSocket) {
      adminSocket.emit("userConnected", socket.id);
    }

    // Khôi phục thông tin phiên chát cho người dùng khi kết nối lại
    Message.find({ userId: socket.id })
      .then((messages) => {
        messages.forEach((message) => {
          socket.emit("message", { from: "Admin", message: message.message });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  socket.on("message", (data) => {
    console.log("Message received:", data);
    const { userId, message } = data;

    if (socket === adminSocket) {
      // Nếu tin nhắn được gửi từ admin, gửi đến người dùng cụ thể hoặc tất cả người dùng
      if (userId === "all") {
        for (const userSocket of Object.values(userSockets)) {
          userSocket.emit("message", { from: "Admin", message:data });
        }
      } else {
        const userSocket = userSockets[userId];
        if (userSocket) {
          userSocket.emit("message", { from: "Admin", message:data });
        }
      }
    } else {
      // Nếu tin nhắn được gửi từ người dùng, gửi đến admin
      if (adminSocket) {
        adminSocket.emit("message", { from: `User ${socket.id}`, message:data });
      }
      // Lưu tin nhắn vào MongoDB cho phiên chát của người dùng
      const newMessage = new Message({
        userId: socket.id,
        from: `User ${socket.id}`,
        message,
      });
      newMessage
        .save()
        .then(() => {
          console.log("Message saved successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    if (socket === adminSocket) {
      adminSocket = null;
      console.log("Admin disconnected");
    } else {
      delete userSockets[socket.id];
      // Thông báo ngắt kết nối người dùng cho admin
      if (adminSocket) {
        adminSocket.emit("userDisconnected", socket.id);
      }
    }
  });
});