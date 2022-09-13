import { Router } from "express";
import { typeMiddleware } from "./middleware";


const router = Router();
router.use(typeMiddleware('technitian'))


export default router;