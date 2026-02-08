import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

export async function handleContactForm(req, res) {
  try {
    const { name, email, message } = req.body;

    // Save message to MongoDB
    await Contact.create({ name, email, message });

    // Create SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.resend.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,  // Port 465 ALWAYS uses secure TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      debug: true,
      logger: true
    });

    // Send Email
    await transporter.sendMail({
      from: `"Portfolio Contact" <onboarding@resend.dev>`,   // FIXED
      to: process.env.MAIL_TO,                               // Your email
      subject: "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return res.json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error sending email"
    });
  }
}
