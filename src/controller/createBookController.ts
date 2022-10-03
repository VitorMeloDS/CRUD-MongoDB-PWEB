import { Book } from "../interface/book"
import BookModel from "../model/bookModel"

export class CreateBookController {
  protected async create(book: Book): Promise<any> {
    try {
      await BookModel.create({
        id: book.id,
        titulo: book.titulo,
        autor: book.autor,
        isbn: book.isbn,
        resumo: book.resumo,
        ano_lancamento: book.ano_lancamento
      })
    } catch(e: any) {
      throw new Error(e.message);
    };
  }
}
