require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8888;
const mailRoute = require("./Routes/mail");
const aiRoute = require("./Routes/ai");

// ✅ Middleware
const allowedOrigins = [
  'https://project-777mo.vercel.app/',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// ✅ Routes
app.use("/api/mail", mailRoute);
app.use("/api/ai", aiRoute);

app.get("/", (req, res) => {
  res.send("📧 Mailer API is running.");
});

// ✅ Server start
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, (err) => {
    if (err) {
      console.error("❌ Server failed to start:", err);
    } else {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    }
  });
}

// Required for Vercel deployment
module.exports = app;

