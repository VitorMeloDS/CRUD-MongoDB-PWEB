import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  titulo: {type: String, required: true},
  autor: {type: String, required: true},
  isbn: {type: Number},
  resumo: {type: String},
  ano_lancamento: {type: Number},
});

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;
