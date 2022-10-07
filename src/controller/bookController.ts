import { Message } from './../interface/message';
import { Request, Response } from 'express';
import BookModel from '../model/bookModel';
import { CreateBookController } from './createBookController';

export class BookController extends CreateBookController {
  public async getBook(req: Request, res: Response): Promise<any> {
    let result: any;
    let erro: any;

    try {
      if (req.query.id) {
        result = await BookModel.find({id: req.query.id});
        if (result.length == 0) {
          throw new Error(`O livro número ${req.query.id} não existe`);
        }
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
    let consulta: any;
    let result: Message;
    let erro: string = '';

    try {
      if (req.query.id == undefined) {
        result = { message: 'Não foi passado o id do livro'};
      } else {
        consulta = await BookModel.find({id: req.query.id});
        if (consulta.length > 0) {
          result = { message: `O livro número ${req.query.id} existe`};
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
    let result: Message;
    let erro: any;

    try {
      if (req.body.length > 0) {
        for (const book of req.body) {
          await this.create(book);
        }
      } else {
        await this.create(req.body);
      }
      result = { message: `Livro adicionado com sucesso!` }; 
    }catch (e: any) {
      erro = { message: e.message };
      console.log(erro);
    };

    return erro ? res.status(404).send(erro) : res.status(201).send(result!);
  }

  public async deleteBook(req: Request, res: Response): Promise<any> { 
    let consulta: any;
    let result: Message;
    let erro: string = '';
    
    try {
      consulta = await BookModel.find({id: req.query.id})
      if (consulta?.length > 0) {
        await BookModel.findByIdAndDelete(consulta[0]._id)
        result = { message: `O livro ${req.query.id} foi deletado` };       
      } else {
        result = { message: `O livro ${req.query.id} não existe` };               
      }
    } catch (e: any) {
      erro = e.message;
      console.log(erro);
    }

    return erro ? res.status(404).send(erro) : res.status(200).send(result!);
  }

  public async updateBook(req: Request, res: Response): Promise<any> {
    let result: Message;
    let erro: any;

    try {
      let { _id } = req.body;
      await BookModel.findByIdAndUpdate(
      _id,
      {
        $set: req.body
      });
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
}

