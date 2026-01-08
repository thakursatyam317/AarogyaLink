import { transporter } from "../configs/email.js";
import { generateEmail } from "../utils/emailTemplate.js";

export const sendVerificationCode = async (name, email, verificationCode) => {
  try {
    const emailBody = generateEmail({
    name,
    verificationCode: verificationCode,
    introText: "Thanks for registering with us!",
  });
  console.log("Verification COde ", verificationCode);

    const info = await transporter.sendMail({
      from: '"Aarogya Link" <thakursatyam317@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: "Verify your Email", // Plain-text version of the message
      html: emailBody, // HTML version of the message
    });
  } catch (error) {
    console.log("the email verification error", error);
  }
};
