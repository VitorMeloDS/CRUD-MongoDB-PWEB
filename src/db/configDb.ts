import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb+srv://vitor:98869@db-livros-ifal.pepcich.mongodb.net/?retryWrites=true&w=majority');

const conn = mongoose.connection;

export default conn;