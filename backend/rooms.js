export const rooms = new Map();

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

const generateID = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

export const createRoom = () => {
  const roomCode = generateRoomCode();

  rooms.set(roomCode, {
    code: roomCode,
    players: new Map(),
    state: 'waiting'
  });

  return roomCode;
};

const joinRoom = (code, playerName) => {
  const room = rooms.get(code);
  if (!room) return { error: 'Room not found' };
  if (room.state !== 'waiting') return { error: 'Game already started' };
  if (players.has(playerName)) return { error: 'Player name already exists' };

  room.set(playerName, { name: playerName, id: generateID() });
  return { success: true, room };
};
