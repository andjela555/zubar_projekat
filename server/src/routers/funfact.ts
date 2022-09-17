import axios from "axios";
import { Router } from "express";


const router = Router();

router.get('/', async (req, res) => {
  const resp = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
  res.json({
    text: resp.data.text
  })
})

export default router;