import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "devxpert404@gmail.com",
        pass: "kygweatqnrvgkkca",
    },
});