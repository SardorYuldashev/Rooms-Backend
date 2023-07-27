import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const editRoom = async ({ id, ...changes }) => {

  const room = await db('rooms').where({ id }).first();

  if (!room) {
    throw new NotFoundError('Xona topilmadi');
  };

  return (
    await db('rooms')
      .where({ id })
      .update({ ...changes })
      .returning('*')
  )[0];
};
