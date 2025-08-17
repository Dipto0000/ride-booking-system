import { Router } from "express";
import { RideControllers } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/ride-request",checkAuth(Role.RIDER), RideControllers.rideRequest);
router.get("/", checkAuth(Role.ADMIN), RideControllers.getAllRide);
router.get("/history",checkAuth(Role.RIDER, Role.ADMIN), RideControllers.getRideHistory)

export const RideRoutes = router;