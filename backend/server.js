import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { createRoom, rooms } from './rooms.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/host/host.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('create room', () => {
    const roomCode = createRoom();

    socket.join(roomCode);

    socket.emit('room created', { roomCode: roomCode });

    console.log(`Room ${roomCode} created by ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
