import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router()


router.post("/login", AuthControllers.credentialLogin)
router.post("/logout", AuthControllers.logout)
router.post("/refresh-token", AuthControllers.getNewAccessToken)

router.post("/forgot-password", AuthControllers.forgotPassword)
router.post("/reset-password", AuthControllers.resetPassword)



export const AuthRoutes = router;