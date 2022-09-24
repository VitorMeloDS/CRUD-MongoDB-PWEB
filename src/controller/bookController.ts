import { count } from 'console';
import { Request, Response } from 'express';
import fs from 'fs';
import { isTemplateExpression } from 'typescript';
import { Books } from '../interface/books';

export class BookController {
  public async getBook(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: Books;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

      if (req.query.id) {
        for (const item of books) {
          if(item.id === Number(req.query.id)){
            result = item;
            console.log(result)
          }
        }
      } else {
        result = books;
        console.log(result)
      }

    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  public async existBook(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: any;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

      for (const item of books) {
        if (item.id == Number(req.query.id)) {
          result = { message: `O livro número ${req.query.id} existe`};
          break
        } else {
          result = { message: `O livro número ${req.query.id} não existe`};
        }  
      }
     
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result);
  }

  public async postBook(req: Request, res: Response): Promise<any> {
    let books: any;
    let arrayBooks: any = [];
    let result: any;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
      for (const item of books) {
        arrayBooks.push(item);
      }
      for (const requisicao of req.body) {
        arrayBooks.push(requisicao);
      }
      fs.writeFileSync('books.json', JSON.stringify(arrayBooks), 'utf8');
      result = { message: `Livro adicionado com sucesso!` };
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(201).send(result!);
  }

  public async deleteBook(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: any;
    let erro: string = '';
    let index: number = 0;

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
      
      for (const item of books) {
        if (item.id == Number(req.query.id)) {
          books = this.removeItem(books, 'id', Number(req.query.id))
          result = { message: `O livro ${req.query.id} foi removido` }
          break
        } else {
          result = { message: `O livro ${req.query.id} não foi encontrado` }
        }
        index++
      }
      
      fs.writeFileSync('books.json', JSON.stringify(books), 'utf8')

    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result);
  }

  public async updateBook(req: Request, res: Response) {
    let books: any;
    let arrayBooks: any = [];
    let result: any;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

      for (const item of books) {
        arrayBooks.push(item);
      }

      for (const item of books) {
        if (item.id == req.body.id) {
          item.id = req.body.id,
          item.titulo = req.body.titulo,
          item.autor = req.body.autor,
          item.isbn = req.body.isbn,
          item.resumo = req.body.resumo,
          item.ano_lancamento = req.body.ano_lancamento
          break;
        }
      }

      fs.writeFileSync('books.json', JSON.stringify(arrayBooks), 'utf8');
      result = { message: 'Livro atualizado com sucesso!' };
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(201).send(result!);
  }
  
  public async countBook(req: Request, res: Response): Promise<any> {
    let books: any;
    let result: string;
    let erro: string = '';

    try {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

      result = `Existem ${books.length} livros cadastrados`;
      console.log(result);
      
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  private removeItem = (array: any[], key: string , value: Number) => {
    return array.filter((elemento) => {
      return elemento[key] !== value
    })
  }
}

