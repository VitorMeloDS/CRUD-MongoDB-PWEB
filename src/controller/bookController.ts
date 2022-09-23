import { Request, Response } from 'express';
import fs from 'fs';
import { Books } from '../interface/books';

export class BookController {
  public async getBooks(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: Books;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

      if (req.query.id) {
        for (const item of books) {
          if(item.id === Number(req.query.id)){
            result = item;
          }
        }
      } else {
        result = books;
      }

    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(500).send(erro) : res.status(200).send(result!);
  }

  public async postBook(req: Request, res: Response): Promise<any> {
    let books: any;
    let arrayBooks: any[] = [];
    let result: Books;
    let erro: string = '';

    try {
      arrayBooks?.push(req.body)
      console.log(arrayBooks)
      books = 

      books = fs.writeFileSync('books.json', Buffer.from(arrayBooks), 'utf8' );

      console.log(books);

      // result = req.body;

    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(500).send(erro) : res.status(200).send(result!);
  }

  
}