# Portfolio Backend

A lightweight Node.js/Express backend providing essential services for the portfolio application, including contact email dispatching and an interactive AI chatbot reflection.

## 🛠️ Tech Stack

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Tools**: [Nodemailer](https://nodemailer.com/), [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai), [dotenv](https://www.npmjs.com/package/dotenv), [cors](https://www.npmjs.com/package/cors)

## 📡 API Endpoints

### POST `/api/mail/send`
Handles contact form submissions and forwards them via email to the site owner.
- **Payload**: `{ name, email, subject, message }`
- **Response**: `200 OK` on success, `500 Error` on failure.

### POST `/api/ai/chat`
Handles interactive chat sessions with the digital reflection chatbot powered by Gemini.
- **Payload**: `{ message, history }`
- **Response**: `{ response }` containing the AI's reply.

## 🚀 Getting Started

### Prerequisites

*   Node.js installed on your machine.
*   A Gmail account and a [Gmail App Password](https://support.google.com/accounts/answer/185833?hl=en) to enable email sending via Nodemailer.
*   A [Google Gemini API Key](https://aistudio.google.com/) for the AI chatbot.

### Environment Setup

1. Copy the template environment file:
   ```bash
   cp .env.example .env
   ```
2. Open the newly created `.env` file and populate it with your credentials:
   - `EMAIL_USER`: Your Gmail address (e.g., `example@gmail.com`).
   - `EMAIL_PASS`: Your 16-character Gmail App Password.
   - `PORT`: Port on which the backend server will run (default is `8888`).
   - `GEMINI_API_KEY`: Your Gemini API Key from Google AI Studio.

### Installation & Run

```bash
# Install dependencies
npm install

# Start the server (development mode)
npm run start
```

## 🌐 Deployment

This backend is optimized for deployment on **Vercel**.
1. Configure `vercel.json` if needed.
2. Push your code to GitHub.
3. Import the project in Vercel.
4. Add the environment variables (`EMAIL_USER`, `EMAIL_PASS`, `GEMINI_API_KEY`) in the Vercel project dashboard under Environment Variables.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///Users/ayush/Desktop/untitled%20folder%207/Portfolio-backend/LICENSE) file for details.
