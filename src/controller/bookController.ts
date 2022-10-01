import { Message } from './../interface/message';
import { Request, Response } from 'express';
import fs from 'fs';
import { Message } from '../interface/message';
import BookModel from '../model/bookModel';

export class BookController {
  public async getBook(req: Request, res: Response): Promise<any> {
    let result: any;
    let erro: any;

    try {
      if (req.query.id) {
        result = await BookModel.find({id: req.query.id});
      } else {
        result = await BookModel.find();
      }

    } catch (e: any) {
      erro = { message: e.message };
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result);
  }

  public async existBook(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: Message;
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

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  public async postBook(req: Request, res: Response): Promise<any> {
    let result: any;
    let erro: any;

    try {
      await BookModel.create({
        id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        isbn: req.body.isbn,
        resumo: req.body.resumo,
        ano_lancamento: req.body.ano_lancamento,
      });
      
      result = { message: `Livro adicionado com sucesso!` }; 
    }catch (e: any) {
      erro = { message: e.message };
      console.log(erro);
    };

    return erro ? res.status(404).send(erro) : res.status(201).send(result!);
  }

  public async deleteBook(req: Request, res: Response): Promise<any> {
    let books: any = '';
    let result: Message;
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

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  public async updateBook(req: Request, res: Response) {
    let result: Message;
    let erro: any;

    try {
      await BookModel.findByIdAndUpdate(req.body.id, {$set: req.body});
      result = { message: 'Livro atualizado com sucesso!' };
    } catch (e: any) {
      erro = { message: e.message };
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(201).send(result!);
  }
  
  public async countBook(req: Request, res: Response): Promise<any> {
    let result: Message;
    let erro: string = '';

    try {
      let contador = await BookModel.count()
      result = { message: `Existem ${contador} livros cadastrados` };
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  private removeItem(array: any[], key: string , value: Number) {
    return array.filter((elemento) => {
      return elemento[key] !== value
    })
  }
}

