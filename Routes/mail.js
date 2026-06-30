const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// ✅ Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // ✅ from .env
    pass: process.env.EMAIL_PASS, // ✅ Gmail App Password
  },
});

// ✅ POST /api/mail/send
router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `[Portfolio Inquiry] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // fallback
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;700&family=JetBrains+Mono:wght@300&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
          
          <!-- Brand Header -->
          <div style="padding: 40px 40px 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.03);">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5em; margin-bottom: 12px;">Inbound Transmission</div>
            <h1 style="margin: 0; font-size: 32px; letter-spacing: -2px; line-height: 1;">
              <span style="font-weight: 100; color: rgba(255,255,255,0.6);">NEW</span>
              <span style="font-weight: 700; color: #ffffff; text-transform: uppercase;">CONTACT</span>
            </h1>
          </div>

          <!-- Content Body -->
          <div style="padding: 40px;">
            <!-- Sender Info -->
            <div style="margin-bottom: 32px;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 8px;">From the Desk of</div>
              <div style="font-size: 20px; font-weight: 400; color: #ffffff;">${name}</div>
              <div style="font-size: 14px; color: #3b82f6; margin-top: 4px;">${email}</div>
            </div>

            <!-- Subject -->
            <div style="margin-bottom: 32px; padding: 24px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 8px;">Objective</div>
              <div style="font-size: 18px; font-weight: 300; color: #ffffff;">${subject}</div>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 10px;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 12px;">Encrypted Message</div>
              <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); font-weight: 300; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 30px 40px; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.03); text-align: center;">
             <div style="font-size: 11px; font-weight: 200; color: rgba(255,255,255,0.2); letter-spacing: 2px; text-transform: uppercase;">
              Architected by Abhishek Katnoria • Punjab, India
             </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

module.exports = router;