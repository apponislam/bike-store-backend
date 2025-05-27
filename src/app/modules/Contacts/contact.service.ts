import { Contact } from "./contact.interface";
import { contactModel } from "./contact.model";
import { Types } from "mongoose";

const createContact = async (contactData: Contact) => {
    const result = await contactModel.create(contactData);
    return result;
};

const getAllContacts = async () => {
    const result = await contactModel.find().sort({ createdAt: -1 });
    return result;
};

export const contactServices = {
    createContact,
    getAllContacts,
};
