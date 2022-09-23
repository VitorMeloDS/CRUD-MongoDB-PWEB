import { Request, Response, Router } from "express";
import { BookController } from "../controller/bookController";

const router: Router = Router();
const books = new BookController();

router.get('/search-books', (req: Request, res: Response) => {
    books.getBooks(req, res);
});
router.post('/create-books', (req: Request, res: Response) => {
    books.postBook(req, res);
});
router.delete('/delete-books', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota delete' })
});
router.put('/update-books', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota put' })
});


export const routeController: Router = router;
