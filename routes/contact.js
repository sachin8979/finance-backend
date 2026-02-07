import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `Message from ${name}`,
      text: message,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

export default router;
