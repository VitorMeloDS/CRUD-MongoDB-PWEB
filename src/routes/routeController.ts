import { Request, Response, Router } from "express";
import { BookController } from "../controller/bookController";

const router: Router = Router();

router.get('/search-books', (req: Request, res: Response) => {
    const books = new BookController();
    books.getBooks(req, res);
});
router.post('/create-books', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota post' })
});
router.delete('/delete-books', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota delete' })
});
router.put('/update-books', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota put' })
});


export const routeController: Router = router;
