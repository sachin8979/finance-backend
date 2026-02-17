import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function verifySMTP() {
    console.log("🔍 Testing SMTP Connection...");
    console.log(`Host: ${process.env.SMTP_HOST}`);
    console.log(`Port: ${process.env.SMTP_PORT}`);
    console.log(`User: ${process.env.SMTP_USER}`);
    console.log(`Secure: ${Number(process.env.SMTP_PORT) === 465}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        debug: true, // Enable debug logs
        logger: true // Log to console
    });

    try {
        const info = await transporter.verify();
        console.log("✅ SMTP Configuration is Valid!", info);
    } catch (error) {
        console.error("❌ SMTP Connection Failed:", error);
    }
}

verifySMTP();
