import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ContactServices } from "./contact.service";

const submitContactForm = catchAsync(async (req, res, next) => {
    const result = await ContactServices.submitContactForm(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Contact form submitted successfully",
        data: result,
    });
});

export const ContactControllers = {
    submitContactForm,
};