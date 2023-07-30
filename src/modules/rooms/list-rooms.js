import db from '../../db/index.js';

export const listRooms = async (query = {}) => {
  let {
    q = null,
    page: { limit, offset } = { limit: 5, offset: 0 },
    sort: { by, order } = { by: 'id', order: 'DESC' },
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

  const total = await dbQuery.clone().count().groupBy("id");

  dbQuery.orderBy(by, order);

  dbQuery.limit(limit).offset(offset);

  const rooms = await dbQuery;

  return {
    list: rooms,
    total: total.length,
    offset,
    limit,
  };
};