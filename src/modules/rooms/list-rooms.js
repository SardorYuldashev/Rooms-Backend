import db from '../../db/index.js';
import { BadRequestError } from '../../shared/errors/index.js';

export const listRooms = async (query = {}) => {
  // let {
  //   q = null,
  //   page: { limit, offset } = { limit: 10, offset: 0 },
  //   sort: { by, order } = { by: 'id', order: "ASC" },
  //   filters: { floor, for_stuff } = { floor: 2, for_stuff: false }
  // } = query;

  let {
    q = null,
    page: { limit, offset } = { limit: 10, offset: 0 },
    sort: { by, order } = { by: 'id', order: 'ASC' },
    filters: { floor, for_stuff } = { floor: null, for_stuff: null }
  } = query;

  const dbQuery = db('rooms').select('*');

  if (floor) {
    dbQuery.where({ floor });
  };

  if (for_stuff) {
    dbQuery.andWhere({ for_stuff });
  };

  if (q) {
    dbQuery.andWhereILike('name', `%${q}%`);
  };

  dbQuery.orderBy(by, order);

  dbQuery.limit(limit).offset(offset);

  const rooms = await dbQuery;

  return {
    list: rooms,
    total: rooms.length,
    offset,
    limit,
  };
};