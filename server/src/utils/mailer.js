import nodemailer from "nodemailer";
import { linkTemplate } from "./assets/linkTemplate";
import 'dotenv/config';

const mailingAccount = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
}
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: mailingAccount.user,
        pass: mailingAccount.pass,
    },
});

export const sendPlanningLink = async (link, receviver, planningName) =>
{
    const email = await transporter.sendMail({
        from: `Comguru intern <${mailingAccount.user}>`,
        to: `${receviver}`,
        subject: `${planningName}`,
        // text: "Hello world?",
        html: linkTemplate(link, planningName),
    });
}

export const sendRecupCode = async (code, receviver) =>
{
    const email = await transporter.sendMail({
        from: `Comguru intern <${mailingAccount.user}>`,
        to: `${receviver}`,
        subject: `Recuperation code`,
        text: `This is your recuperation code: ${code}`,
    });
}
