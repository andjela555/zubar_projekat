import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Intervention } from "../entity/Intervention";
import { typeMiddleware } from "./middleware";


const router = Router();

router.use(typeMiddleware('patient'))

router.get('/', async (req, res) => {
  const id = (req as any).user.id;
  const interventions = await AppDataSource.getRepository(Intervention).find({
    where: {
      user: {
        id: id
      }
    },
    relations: {
      dentist: true,
      items: true
    }
  })
  res.json(interventions);

})

export default router;