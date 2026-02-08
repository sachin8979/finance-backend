import mongoose from "mongoose";
import { Resend } from "resend";

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

    // Initialize Resend with existing API Key (SMTP_PASS)
    const resend = new Resend(process.env.SMTP_PASS);

    // Send Email via HTTP API (No SMTP Timeout)
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.MAIL_TO,
      subject: "New Contact Form Message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      throw new Error(data.error.message);
    }

    return res.json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error sending email (Resend API)"
    });
  }
}
