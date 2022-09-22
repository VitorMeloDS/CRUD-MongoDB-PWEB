import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { routeController } from './routes/routeController';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(routeController);

app.listen(8086, () => {
    console.clear();
    console.log('Server started in localhost:8086 🚀');
})
