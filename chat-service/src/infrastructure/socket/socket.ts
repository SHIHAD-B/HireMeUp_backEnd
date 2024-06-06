import { Server as SocketIoServer, Socket } from "socket.io";
import { Server } from 'http'
import { Fron_End_Ip } from "../../config/envConfig/config";
const socket = require("socket.io")

const connectSocketIo = (server: Server) => {
    const io: Socket = socket(server, {
        cors: {
            origin: [Fron_End_Ip],
            credentials: true
        }
    });

    const userSocketMap: { [key: string]: string } = {}

    io.on('connection', (socket: Socket) => {
        console.log('socket conneted')
        const userId: string = socket.handshake.query.userId as string
        if (userId != "undefined") {
            userSocketMap[userId] = socket.id
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        socket.on('join chat', (room) => {
            socket.join(room);
            console.log('user joined hte room', room)
        })

        socket.on('new message', (data) => {
            const chat = data.chatId
            console.log("socket.on", chat)
            io.to(chat).emit("message recieved", data.data)
        });
        socket.on("disconnect", () => {
            delete userSocketMap[userId]
            console.log('socket disconnected')
        })
    })
}

export default connectSocketIo

