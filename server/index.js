// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const users = {};

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with id: ${socket.id} joinroom ${data}`);
//     // users[username] = data;
//     // io.emit('username',user);
//   });

//   socket.on("username", (username) => {
//     users[username] = socket.id;
//     console.log(`total user: ${users}`);
//     // user name sending to frontend
//     io.emit("username", users); 
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//     // socket.emit('receive_message',data)
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//     for(let user in users){
//       if(users[user] === socket.id) {
//         delete users[user];
//       }
//     }
//   });
// });

// server.listen(3001, () => {
//   console.log("server running");
// });
