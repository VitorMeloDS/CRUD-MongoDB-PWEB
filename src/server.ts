import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { routeController } from './routes/routeController';
import 'dotenv/config';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(routeController);

app.listen(process.env.PORT, () => {
    console.clear()
    console.log("Server stared in localhost:8086🚀")
});
