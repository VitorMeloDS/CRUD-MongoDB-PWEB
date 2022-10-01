import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { routeController } from './routes/routeController';
import 'dotenv/config';
import conn from './db/configDb';

const app: express.Application = express();

conn.on('error', (err: any) =>{
  console.log(err);
});
conn.on('open', () => {
  console.log('Connected to database 🚀');
  app.emit('open');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(routeController);

app.on('open', () => {
  app.listen(process.env.PORT || 8086, () => {
    console.log("Server stared in localhost:8086 🚀")
  });''
});
