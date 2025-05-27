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

const deleteContact = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid contact ID");
    }

    const result = await contactModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    return result;
};

export const contactServices = {
    createContact,
    getAllContacts,
    deleteContact,
};
