import Mailgen from "mailgen";

export const generateEmail = ({ name, introText, verificationCode }) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Aarogya Link",
      link: "https://aarogyalink.com",
    },
  });

  const email = {
    body: {
      name: name || "User",
      intro: introText || "Welcome to Aarogya Link!",
      table: {
        data: [
          {
            "Verification Code": verificationCode,
            "Valid For": "10 minutes",
          },
        ],
      },
      outro: "If you did not request this, please ignore this email.",
    },
  };

  return mailGenerator.generate(email);
};
