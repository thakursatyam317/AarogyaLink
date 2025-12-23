import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL  ,
    pass:  process.env.EMAIL_PASS,
  },
});

// const sendMail = async (email, verificationCode) => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"Aarogya Link" <thakursatyam317@gmail.com>',
//       to: email,
//       subject: "Verifiy your email",
//       text: "Verifiy your email", // Plain-text version of the message
//       html: verificationCode, // HTML version of the message
//     });

//     console.log("Message sent:", info.messageId);
//   } catch (error) {
//     console.log("Error for sending email varification");
//   }
// };

// sendMail();
