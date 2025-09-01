"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const ride_route_1 = require("../modules/ride/ride.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes
    },
    {
        path: "/rides",
        route: ride_route_1.RideRoutes
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes
    }
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});
