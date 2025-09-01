"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRoutes = void 0;
const express_1 = require("express");
const ride_controller_1 = require("./ride.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/ride-request", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.RideControllers.rideRequest);
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), ride_controller_1.RideControllers.getAllRide);
router.get("/history", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER, user_interface_1.Role.ADMIN), ride_controller_1.RideControllers.getRideHistory);
router.patch("/:id/cancel", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER, user_interface_1.Role.ADMIN), ride_controller_1.RideControllers.cancelRide);
// Driver Ride Requests
router.patch("/:id/accept", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideControllers.driverAcceptRide);
router.patch("/:id/reject", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideControllers.driverRejectRide);
router.patch("/:id/status", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideControllers.driverUpdateRideStatus);
router.patch("/:id/availability", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideControllers.setAvailability);
router.get("/earning", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideControllers.driverTotalEarning);
exports.RideRoutes = router;
