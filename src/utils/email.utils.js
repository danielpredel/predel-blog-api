const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = (recipient, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: recipient,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail,
};
