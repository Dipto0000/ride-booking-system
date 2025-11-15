import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RideRoutes } from "../modules/ride/ride.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ContactRoutes } from "../modules/contact/contact.route";


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
   },
   {
    path: "/admin",
    route: AdminRoutes
   },
   {
    path: "/contact",
    route: ContactRoutes
   }

]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})