import { Server } from 'socket.io';

let io;

export function setupSocket(server) {
  if (process.env.NODE_ENV === 'development') {
    if (!global.io) {
      global.io = new Server(server, {
        path: 'http://localhost:5000/api/socket',
      });

      global.io.on('connection', (socket) => {
        console.log('🟢 [dev] New client connected:', socket.id);

        // Join room for this user
        socket.on('join', (userId) => {
          socket.join(userId);
          console.log(`👥 [dev] User ${userId} joined room`);
        });

        // Send message to specific user
        socket.on('sendMessage', (msg) => {
          global.io.to(msg.receiverId).emit('receiveMessage', msg);
        });

        socket.on('disconnect', () => {
          console.log('🔌 [dev] Client disconnected:', socket.id);
        });
      });
    }
    io = global.io;
  } else {
    if (!io) {
      io = new Server(server, {
        path: 'http://localhost:5000/api/socket',
      });

      io.on('connection', (socket) => {
        console.log('🟢 New client connected:', socket.id);

        socket.on('join', (userId) => {
          socket.join(userId);
          console.log(`👥 User ${userId} joined room`);
        });

        socket.on('sendMessage', (msg) => {
          io.to(msg.receiverId).emit('receiveMessage', msg);
        });

        socket.on('disconnect', () => {
          console.log('🔌 Client disconnected:', socket.id);
        });
      });
    }
  }

  return io;
}
