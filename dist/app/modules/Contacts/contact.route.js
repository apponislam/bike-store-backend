"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const contact_validation_1 = __importDefault(require("./contact.validation"));
const contact_controller_1 = require("./contact.controller");
const router = express_1.default.Router();
router.post("/api/contact", (0, validateRequest_1.default)(contact_validation_1.default), contact_controller_1.contactController.createContact);
router.get("/api/contact", contact_controller_1.contactController.getAllContacts);
router.delete("/api/contact/:id", contact_controller_1.contactController.deleteContact);
exports.contactRoute = router;
