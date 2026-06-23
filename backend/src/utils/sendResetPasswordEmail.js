import { transporter } from "../config/mail.config.js";


export const sendResetPasswordEmail = async (
  email,
  resetLink
) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>SocialConnect</h2>
      <p>
        Click below to reset your password:
      </p>
      <a href="${resetLink}">
        Reset Password
      </a>
    `,
  });
};