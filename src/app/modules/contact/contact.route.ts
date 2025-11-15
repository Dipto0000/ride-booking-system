import { Router } from "express";
import { ContactControllers } from "./contact.controller";

const router = Router();

router.post("/", ContactControllers.submitContactForm);

export const ContactRoutes = router;
