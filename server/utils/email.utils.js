import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/env.js";

export const sendReminderEmail = async (
  toEmail,
  subscriptionName,
  renewalDate
) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Subscription Tracker" <${EMAIL_USER}>`,
      to: toEmail,
      subject: `Reminder: Your ${subscriptionName} subscription expires soon`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: linear-gradient(135deg, #ffffff, #f2f4f8); padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <div style="text-align: center;">
        <h1 style="color: #2c3e50;">📬 Subscription Reminder</h1>
        <p style="font-size: 16px; color: #34495e; margin-bottom: 30px;">
          Hi <strong>${toEmail}</strong>,
        </p>
      </div>

      <p style="font-size: 16px; color: #2c3e50; line-height: 1.6;">
        Your subscription to <strong>${subscriptionName}</strong> will expire on 
        <strong style="color: #e74c3c;">${new Date(
          renewalDate
        ).toDateString()}</strong>.
      </p>

      <p style="font-size: 16px; color: #2c3e50; line-height: 1.6;">
        Please renew your subscription to avoid any service interruptions.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background-color: #1abc9c; padding: 12px 24px; color: #fff; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
          🔄 Renew Now
        </a>
      </div>

      <p style="font-size: 14px; color: #7f8c8d;">
        If you’ve already renewed, please ignore this message.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ecf0f1;" />

      <p style="font-size: 13px; color: #95a5a6; text-align: center;">
        &copy; ${new Date().getFullYear()} Subscription Tracker · All rights reserved
      </p>
    </div>
  `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${toEmail}`);
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};
