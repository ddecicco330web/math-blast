const rooms = new Map();
const MAX_PLAYERS = 30;

const generateRoomCode = () => {
  let code;
  let attempts = 0;

  do {
    code = Math.random().toString(16).slice(2, 8).toUpperCase();
    attempts++;
    if (attempts > 100) throw new Error('Could not generate unique code');
  } while (rooms.has(code));

  return code;
};

export const createRoom = () => {
  const roomCode = generateRoomCode();

  rooms.set(roomCode, {
    roomCode: roomCode,
    players: new Map(),
    names: new Set(),
    state: 'waiting',
    defaultNames: false
  });

  return roomCode;
};

export const findRoom = (roomCode) => {
  const room = rooms.get(roomCode);
  if (!room) return { error: 'Room not found' };
  if (room.players.size >= 30) return { error: 'Max players reached' };
  if (room.state !== 'waiting') return { error: 'Game already started' };

  return { success: true, room };
};

const updatePlayerName = (id, name, roomCode) => {
  name = name.trim();
  if (!name) return { error: 'Enter a name' };
  if (rooms.get(roomCode)?.names.has(name)) return { error: 'Name is taken' };

  const player = rooms.get(roomCode)?.players.get(id);
  player.name = name;

  rooms.get(roomCode)?.names.add(name);

  console.log(rooms.get(roomCode));
  return player;
};

export const addPlayer = (id, name, roomCode) => {
  const room = rooms.get(roomCode);
  if (room.players.size >= MAX_PLAYERS) return { error: 'Max players reached' };
  if (room.state !== 'waiting') return { error: 'Game already started' };
  room.players.set(id, { id: id, name: null, score: 0 });
  console.log(rooms.get(roomCode));

  return updatePlayerName(id, name, roomCode);
};

export const removePlayer = (id, roomCode) => {
  console.log(roomCode);
  const room = rooms.get(roomCode);
  console.log(room);

  if (room.players.has(id)) room.names.delete(room.players.get(id).name);
  console.log(rooms.get(roomCode));
};

export const startGame = (roomCode) => {
  const room = rooms.get(roomCode);
  room.state = 'started';
};

export const setDefaultNames = (value, roomCode) => {
  rooms.get(roomCode).defaultNames = value;
  console.log(rooms.get(roomCode));
};
