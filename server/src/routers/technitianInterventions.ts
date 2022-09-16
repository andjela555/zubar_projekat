import { Router } from "express";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source";
import { Intervention } from "../entity/Intervention";
import { fromIntervention } from "../interventionsUtil";
import { typeMiddleware } from "./middleware";


const router = Router();
router.use(typeMiddleware('technitian'))


router.get('/', async (req, res) => {
  let page = Number(req.query.page);
  if (!page) {
    page = 0;
  }
  let size = Number(req.query.size);
  if (!size) {
    size = 20;
  }
  let dentistId: number | undefined = Number(req.query.dentistId);
  if (!dentistId) {
    dentistId = undefined;
  }
  let from = req.query.from ? new Date(Number(req.query.from)) : null;
  let to = req.query.to ? new Date(Number(req.query.to)) : null;
  let where: any = {};
  if (dentistId) {
    where.dentist = {
      id: dentistId
    }
  }
  if (from) {
    where.start = MoreThanOrEqual(from);
  }
  if (to) {
    where.start = LessThanOrEqual(to);
  }
  let [interventions, totalElements] = await AppDataSource.getRepository(Intervention).findAndCount({
    relations: {
      dentist: true,
      user: true,
    },
    where: where,
    take: size,
    skip: page * size
  });

  res.json({
    totalElements,
    interventions: interventions.map(fromIntervention)
  });
})

export default router;