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

router.get("/me", checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.getMe);
router.patch("/me", checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.updateMe);

router.post("/me/emergency-contacts", checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.addEmergencyContact);
router.get("/me/emergency-contacts", checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.getEmergencyContacts);
router.delete("/me/emergency-contacts/:id", checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.deleteEmergencyContact);



export const UserRoutes = router;