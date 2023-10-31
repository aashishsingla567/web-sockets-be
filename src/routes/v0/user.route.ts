import { Router } from "express";
import handle404 from "../../controllers/404.controller";

const router = Router();

// 404 for all other routes
router.use(handle404);

export default router;
