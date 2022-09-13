import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";


const router = Router();

router.get('/', async (req, res) => {
  res.json(await AppDataSource.getRepository(Service).find());
})

export default router;