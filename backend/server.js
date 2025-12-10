import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import {
  addPlayer,
  createRoom,
  findRoom,
  removePlayer,
  setDefaultNames,
  startGame
} from './rooms.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use('/host', express.static(join(__dirname, '../public/host')));
app.use('/join', express.static(join(__dirname, '../public/join')));

app.get('/host', (req, res) => {
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
    socket.roomId = roomCode;
    socket.role = 'host';

    socket.emit('room created', { roomCode: roomCode });

    console.log(`Room ${roomCode} created by ${socket.id}`);
  });

  // Connect to Room
  socket.on('connect to room', (data) => {
    console.log(data);
    const response = findRoom(data.roomCode);

    if (response.error) {
      socket.emit('connected to room', response);
    } else {
      socket.roomId = data.roomCode;
      console.log(`${socket.id} connected to room ${response.room.roomCode}`);
      socket.emit('connected to room', {
        defaultNames: response.room.defaultNames
      });
    }
  });

  // Join Game
  socket.on('join game', (data) => {
    const response = addPlayer(socket.id, data.name, data.roomCode);

    if (response.error) {
      socket.emit('failed to join', response.error);
      return;
    }

    socket.join(data.roomCode);
    io.to(data.roomCode).emit('joined game', response);
  });

  // Remove Player
  socket.on('remove player', (data) => {
    console.log(data);
    removePlayer(data.id, data.roomCode);
  });

  // Start Game
  socket.on('start game', (roomCode) => {
    startGame(roomCode);
    io.to(roomCode).emit('game started');
  });

  // Enable Default Names
  socket.on('set default names', (data) => {
    setDefaultNames(data.value, data.roomCode);
  });

  // User Disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    io.to(socket.roomId).emit('disconnected', socket.id);

    if (socket.role === 'host') io.to(socket.roomId).emit('host disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
