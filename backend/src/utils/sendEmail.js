import { transporter } from "../config/mail.config.js";
export const sendVerificationEmail = async (email, token) => {
  const verificationLink =
    `http://localhost:3000/verify-email?token=${token}`;
  //`http://localhost:5000/api/users/verify-email/${token}`;

  transporter.verify((error, success) => {
    if (error) {
      console.log("SMTP Error:", error);
    } else {
      console.log("Gmail SMTP is ready");
    }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome to SocialConnect</h2>
      <p>Click the button below to verify your account.</p>
      <a href="${verificationLink}">
        Verify Email
      </a>
    `,
  });
};