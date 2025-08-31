import { Router } from "express";
import { RideControllers } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/ride-request",checkAuth(Role.RIDER), RideControllers.rideRequest);
router.get("/", checkAuth(Role.ADMIN), RideControllers.getAllRide);
router.get("/history",checkAuth(Role.RIDER, Role.ADMIN), RideControllers.getRideHistory)
router.patch("/:id/cancel", checkAuth(Role.RIDER, Role.ADMIN), RideControllers.cancelRide);



// Driver Ride Requests
router.patch("/:id/accept", checkAuth(Role.DRIVER), RideControllers.driverAcceptRide);
router.patch("/:id/reject", checkAuth(Role.DRIVER), RideControllers.driverRejectRide);
router.patch("/:id/status", checkAuth(Role.DRIVER), RideControllers.driverUpdateRideStatus);
router.patch("/:id/availability", checkAuth(Role.DRIVER), RideControllers.setAvailability);
router.get("/earning", checkAuth(Role.DRIVER), RideControllers.driverTotalEarning);


export const RideRoutes = router;