import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { addPlayer, createRoom, joinRoom, updatePlayerName } from './rooms.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/host', express.static(join(__dirname, '../public/host')));
app.use('/join', express.static(join(__dirname, '../public/join')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/host/host.html'));
});

app.get('/join', (req, res) => {
  res.sendFile(join(__dirname, '../public/join/join.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Create Room
  socket.on('create room', () => {
    const roomCode = createRoom();

    socket.join(roomCode);

    socket.emit('room created', { roomCode: roomCode });

    console.log(`Room ${roomCode} created by ${socket.id}`);
  });

  // Connect to Room
  socket.on('connect to room', (data) => {
    console.log(data);
    const response = joinRoom(data.roomCode);

    if (response.error) {
      data = response;
      socket.emit('connected to room', response);
    } else {
      socket.join(response.room.roomCode);
      addPlayer(socket.id, response.room.roomCode);
      console.log(`${socket.id} connected to room ${response.room.roomCode}`);
      socket.emit('connected to room', socket.id);
    }
  });

  // Join Game
  socket.on('join game', (data) => {
    const player = updatePlayerName(socket.id, data.name, data.roomCode);
    socket.emit('joined game', player);
  });

  // User Disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
