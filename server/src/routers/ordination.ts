import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Ordination } from "../entity/Ordination";


const router = Router();

router.get('/', async (req, res) => {
  res.json(await AppDataSource.getRepository(Ordination).find());
})

export default router;