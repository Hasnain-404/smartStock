import { Verification_Email_Template, Welcome_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./emailMiddleware.js";

// Function to send verification email
export const sendVerificationEmail = async (email, vericationCode) => {

    try {
        const response = await transporter.sendMail({
            from: '"Smart Stock" <devxpert404@gmail.com>',
            to: email,
            subject: "Verify your email",
            text: "Verify your email",
            html: Verification_Email_Template.replace("{verificationCode}", vericationCode)
        })

    } catch (error) {
        console.log("Error sending email:", error);

    }
}


//Function to welcome email
export const welcomeEmail = async (email, name) => {

    try {
        const response = await transporter.sendMail({
            from: '"Smart Stock" <devxpert404@gmail.com>',
            to: email,
            subject: "Welcome to Smart Stock",
            text: "Welcome to Trading Dashboard",
            html: Welcome_Email_Template.replace("{name}", name)
        })

    } catch (error) {
        console.log("Error sending email:", error);

    }
} 
