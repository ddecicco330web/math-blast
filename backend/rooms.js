const rooms = new Map();

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
    state: 'waiting'
  });

  return roomCode;
};

export const joinRoom = (roomCode) => {
  const room = rooms.get(roomCode);
  if (!room) return { error: 'Room not found' };
  if (room.state !== 'waiting') return { error: 'Game already started' };

  return { success: true, room };
};

export const addPlayer = (id, roomCode) => {
  const room = rooms.get(roomCode);
  room.players.set(id, { id: id, name: null, score: 0 });
  console.log(rooms.get(roomCode));
};

export const updatePlayerName = (id, name, roomCode) => {
  const player = rooms.get(roomCode)?.players.get(id);
  player.name = name;

  console.log(rooms.get(roomCode));
  return player;
};
