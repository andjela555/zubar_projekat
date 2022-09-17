import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Intervention } from "../entity/Intervention";
import { InterventionItem } from "../entity/InterventionItem";
import { Service } from "../entity/Service";
import { typeMiddleware } from "./middleware";


const router = Router();
router.use(typeMiddleware('technitian'));

router.get('', async (req, res) => {

  let timeStatistics = await AppDataSource
    .createQueryBuilder()
    .select('YEAR(i.createdAt)', 'year')
    .addSelect('MONTH(i.createdAt)', 'month')
    .addSelect('COUNT(*)', 'total')
    .from(Intervention, 'i')
    .where(`i.status = 'finished'`)
    .groupBy('YEAR(i.createdAt)')
    .addGroupBy('MONTH(i.createdAt)')
    .orderBy('YEAR(i.createdAt)')
    .addOrderBy('MONTH(i.createdAt)')
    .getRawMany()
  timeStatistics = timeStatistics.map(element => {
    return {
      total: Number(element.total),
      date: element.month + '.' + element.year
    }
  })

  let serviceStatistics = await AppDataSource
    .createQueryBuilder()
    .select('s.id', 'id')
    .addSelect('s.name', 'name')
    .addSelect('COALESCE(SUM(i.unitPrice * i.quantity), 0)', 'total')
    .from(Service, 's')
    .leftJoin(InterventionItem, 'i', 'i.serviceId = s.id')
    .groupBy('s.id')
    .getRawMany();

  res.json({
    serviceStatistics: serviceStatistics.map(e => {
      return {
        ...e,
        total: Number(e.total)
      }
    }),
    timeStatistics
  })
})

export default router;