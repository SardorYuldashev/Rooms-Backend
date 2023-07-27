import db from '../../db/index.js';

export const roomList = async (filter = {}) => {
  const rooms = await db('rooms').select('*');

  return rooms;
};