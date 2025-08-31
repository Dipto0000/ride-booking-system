import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post("/register", UserControllers.createUser)

router.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUser)

router.patch("/drivers/:id/approve", checkAuth(Role.ADMIN), UserControllers.approveDriver)
router.patch("/drivers/:id/suspend", checkAuth(Role.ADMIN), UserControllers.suspendDriver)



router.patch("/users/:id/block", checkAuth(Role.ADMIN), UserControllers.blockUser);
router.patch("/users/:id/unblock", checkAuth(Role.ADMIN), UserControllers.unblockUser);


export const UserRoutes = router;