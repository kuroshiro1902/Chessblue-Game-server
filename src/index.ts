import 'dotenv/config';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '@/router';
import { setupAssociations } from '@/models';
import GameSocket from '@/sockets/GameSocket';
// import { REDIS } from '@/database/redis';

setupAssociations();
// REDIS.connect();

const PORT = 4538;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.json());
app.use(cors());

app.use(
  '/api',
  (req, res, next) => {
    console.log(req.hostname + ' sends request.');
    next();
  },
  router
);

const server = http.createServer(app);
GameSocket.createServer(server);

server.listen(4538, () => {
  console.log('listening on port ' + PORT);
});
