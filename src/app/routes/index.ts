import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RideRoutes } from "../modules/ride/ride.route";
import { AuthRoutes } from "../modules/auth/auth.routes";


export const router = Router();

const moduleRoutes = [

   {
     path: "/users",
     route: UserRoutes
   },
   {
    path: "/rides",
    route: RideRoutes
   },
   {
    path: "/auth",
    route: AuthRoutes
   }

]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})