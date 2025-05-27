import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import contactValidation from "./contact.validation";
import { contactController } from "./contact.controller";

const router = express.Router();

router.post("/api/contact", validateRequest(contactValidation), contactController.createContact);

router.get("/api/contact", contactController.getAllContacts);

export const contactRoute = router;
