import db from '../../db/index.js';

export const addRoom = async (payload) => {
  const result = await db('rooms')
    .insert(payload)
    .returning('*');

  return result[0];
};