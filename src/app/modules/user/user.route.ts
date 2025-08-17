import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post("/register", UserControllers.createUser)

router.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUser)

export const UserRoutes = router;