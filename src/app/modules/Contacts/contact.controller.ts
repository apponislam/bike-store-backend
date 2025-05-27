import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { contactServices } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
    const result = await contactServices.createContact(req.body);

    res.status(201).json({
        status: true,
        message: "Message sent successfully",
        data: result,
    });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
    const result = await contactServices.getAllContacts();

    res.status(200).json({
        status: true,
        message: "Contacts retrieved successfully",
        data: result,
    });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await contactServices.deleteContact(id);
    res.status(200).json({
        status: true,
        message: "Contact deleted successfully",
        data: result,
    });
});

export const contactController = {
    createContact,
    getAllContacts,
    deleteContact,
};
