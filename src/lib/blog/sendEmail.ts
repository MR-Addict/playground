import nodemailer from "nodemailer";

interface mailOptionsType {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const mailTransport = nodemailer.createTransport({
  host: "smtp.qq.email",
  service: "qq",
  secure: true,
  auth: {
    user: process.env.MAILFROM,
    pass: process.env.MAILPASS,
  },
});

export default async function sendEmail({ from, to, subject, text, html }: mailOptionsType) {
  try {
    await mailTransport.sendMail({ from, to, subject, text, html });
    return { status: true, message: "Sending email succeeded!" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Sending email failed!" };
  }
}
