import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Dentist } from "../entity/Dentist";
import { Ordination } from "../entity/Ordination";
import { typeMiddleware } from "./middleware";


const router = Router();

router.get('/', async (req, res) => {
  res.json(await AppDataSource.getRepository(Dentist).find({
    relations: {
      ordination: true
    }
  }));
})

router.post('/', typeMiddleware('technitian'), async (req, res) => {
  const ordinationId = req.body.ordinationId;
  const ordination = await AppDataSource.getRepository(Ordination).findOne({
    where: { id: ordinationId }
  });
  if (!ordination) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }
  const dentist = await AppDataSource.getRepository(Dentist).save({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    ordination: ordination
  })
  res.json(dentist);
})

router.patch('/:id', typeMiddleware('technitian'), async (req, res) => {
  const id = Number(req.params.id);
  let dentist = await AppDataSource.getRepository(Dentist).findOne({
    where: {
      id
    }
  })
  if (!dentist) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  if (req.body.ordinationId) {
    const ordination = await AppDataSource.getRepository(Ordination).findOne({
      where: { id: req.body.ordinationId }
    });
    if (!ordination) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    dentist.ordination = ordination;
  }
  if (req.body.firstName) {
    dentist.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    dentist.lastName = req.body.lastName;
  }
  if (req.body.phone) {
    dentist.phone = req.body.phone;
  }
  dentist = await AppDataSource.getRepository(Dentist).save(dentist);
  res.json(dentist);
})

router.delete('/:id', typeMiddleware('technitian'), async (req, res) => {
  const id = Number(req.params.id);
  let dentist = await AppDataSource.getRepository(Dentist).findOne({
    where: {
      id
    }
  })
  if (!dentist) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  await AppDataSource.getRepository(Dentist).delete({
    id: id
  });

  res.sendStatus(204);
})

export default router;