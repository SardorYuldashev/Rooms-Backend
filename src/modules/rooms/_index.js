import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { listRooms } from './list-rooms.js';
import { showRoom } from './show-room.js';
import { addRoom } from './add-room.js';
import { editRoom } from './edit-room.js';
import { deleteRoom } from './delete-room.js';
import { roomList } from './roomList.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'rooms', '_schema.gql'),
  'utf8'
);

const resolvers = {
  Query: {
    rooms: async (_, args) => {
      const result =  await listRooms(args.input);
      
      return result;
    },

    room: (_, args) => {
      return showRoom(args);
    }
  },
  Mutation: {
    createRoom: async (_, args) => {

      const result = await addRoom(args.input);

      pubsub.publish('ROOM_CREATED', { roomCreated: result });

      return result;
    },

    updateRoom: (_, args) => {
      return editRoom({ id: args.id, ...args.input });
    },

    removeRoom: (_, args) => {
      return deleteRoom({ id: args.id });
    }
  },
  Subscription: {
    roomCreated: {
      subscribe: () => pubsub.asyncIterator(['ROOM_CREATED']),
    }
  },
  // RoomsList: {
  //   list: async () => {
  //     return await roomList();
  //   }
  // },

};

export default { typeDefs, resolvers };