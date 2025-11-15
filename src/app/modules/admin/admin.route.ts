import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/analytics/rides", checkAuth(Role.ADMIN), AdminControllers.getRideAnalytics);
router.get("/analytics/users", checkAuth(Role.ADMIN), AdminControllers.getUserAnalytics);

export const AdminRoutes = router;
