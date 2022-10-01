import { Request, Response, Router } from "express";
import { BookController } from "../controller/bookController";

const router: Router = Router();
const books = new BookController();

// * findById & findAll
router.get('/book', (req: Request, res: Response) => {
    books.getBook(req, res);
});

// * existsById
router.get('/exist-book', (req: Request, res: Response) => {
    books.existBook(req, res);
});

// * create book
router.post('/book', (req: Request, res: Response) => {
    books.postBook(req, res);
});

// * del
router.delete('/book', (req: Request, res: Response) => {
    books.deleteBook(req, res);
});

// * count book
router.get('/count-book', (req: Request, res: Response) => {
    books.countBook(req, res);
});

// * 
router.put('/book', (req: Request, res: Response) => {
    books.updateBook(req, res);
});


export const routeController: Router = router;
