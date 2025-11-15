const submitContactForm = async (payload: any) => {
    // In a real app, you would send an email or save the contact form submission to a database.
    console.log("Contact form submission:", payload);

    return {
        message: "Your message has been received. We will get back to you shortly.",
    };
};

export const ContactServices = {
    submitContactForm,
};