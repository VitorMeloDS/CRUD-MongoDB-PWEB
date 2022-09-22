import { Request, Response, Router } from "express";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota get' })
});
router.post('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota post' })
});
router.delete('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota delete' })
});
router.put('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'rota put' })
});


export const routeController: Router = router;
