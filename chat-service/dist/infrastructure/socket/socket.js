"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/envConfig/config");
const socket = require("socket.io");
const connectSocketIo = (server) => {
    const io = socket(server, {
        cors: {
            origin: [config_1.Fron_End_Ip],
            credentials: true
        }
    });
    const userSocketMap = {};
    io.on('connection', (socket) => {
        console.log('socket conneted');
        const userId = socket.handshake.query.userId;
        if (userId != "undefined") {
            userSocketMap[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        socket.on('join chat', (room) => {
            socket.join(room);
            console.log('user joined hte room', room);
        });
        socket.on('new message', (data) => {
            const chat = data.chatId;
            console.log("socket.on", chat);
            io.to(chat).emit("message recieved", data.data);
        });
        socket.on("disconnect", () => {
            delete userSocketMap[userId];
            console.log('socket disconnected');
        });
    });
};
exports.default = connectSocketIo;
