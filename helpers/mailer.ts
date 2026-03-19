import nodemailer from "nodemailer";
import User from "@/models/userModels";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    // hash token for DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    });

    const domain = process.env.DOMAIN;

    if (!domain) {
      throw new Error("DOMAIN is not defined in .env file");
    }

    const url =
      emailType === "VERIFY"
        ? `${domain}/verifyemail?token=${token}`
        : `${domain}/resetpassword?token=${token}`;

    const mailOptions = {
      from: "klpklpklp@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <h1>${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h1>
        <p>Click the link below:</p>
        <a href="${url}">${url}</a>
      `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
