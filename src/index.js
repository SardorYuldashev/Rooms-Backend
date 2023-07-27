import http from 'http';
import express from 'express';
import cors from 'cors';
import { buildGraphQLServer } from './graphql/index.js';
import config from './shared/config/index.js';
import { expressMiddleware } from '@apollo/server/express4'

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const { server } = buildGraphQLServer(httpServer);
await server.start();
app.use('/gql', expressMiddleware(server));

const PORT = config.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/gql`);
});