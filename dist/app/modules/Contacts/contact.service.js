"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactServices = void 0;
const contact_model_1 = require("./contact.model");
const mongoose_1 = require("mongoose");
const createContact = (contactData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.create(contactData);
    return result;
});
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.find().sort({ createdAt: -1 });
    return result;
});
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid contact ID");
    }
    const result = yield contact_model_1.contactModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.contactServices = {
    createContact,
    getAllContacts,
    deleteContact,
};
