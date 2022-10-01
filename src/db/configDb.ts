import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_STRING ?? '');

const conn = mongoose.connection;

export default conn;