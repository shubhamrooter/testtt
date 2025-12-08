import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema for subscription request
const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Email configuration - will be populated from environment variables
let emailTransporter: nodemailer.Transporter | null = null;

// Initialize email transporter with credentials from environment
function getEmailTransporter() {
  if (emailTransporter) {
    return emailTransporter;
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    console.warn(
      "Email credentials not configured. Subscription emails will not be sent.",
    );
    return null;
  }

  emailTransporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  return emailTransporter;
}

export const handleSubscribe: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const { email } = subscriptionSchema.parse(req.body);

    const transporter = getEmailTransporter();

    if (!transporter) {
      // Email not configured, but still return success to user
      return res.status(200).json({
        success: true,
        message: "Thank you for subscribing! We'll be in touch.",
      });
    }

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "connect@xploitarena.ai",
      subject: "New XploitArean Waitlist Signup",
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>New user has joined the XploitArean waitlist.</p>
      `,
      text: `New Waitlist Signup\n\nEmail: ${email}\nTime: ${new Date().toLocaleString()}\n\nNew user has joined the XploitArean waitlist.`,
    });

    res.status(200).json({
      success: true,
      message: "Thank you for subscribing! We'll be in touch.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
        errors: error.errors,
      });
    }

    console.error("Subscription error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};
