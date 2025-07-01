// backend/server.js
import express from 'express';
import cors from 'cors';
import bookCallRoutes from './routes/bookCall.js';
import chatbotRoutes from './routes/chatbot.js';
import createRoomRoutes from './routes/createRoom.js';
import messagesQuotaRoutes from './routes/messageQuota.js';
import messagesRoutes from './routes/messages.js';
import myCallsRoutes from './routes/myCalls.js';
import myChatsRoutes from './routes/myChats.js';
import registerCallRoutes from './routes/registerCall.js';
import uploadRoutes from './routes/upload.js';
import userRoutes from './routes/user.js';
import usersRoutes from './routes/users.js';
import verifyEmailRoutes from './routes/verifyEmail.js';
import volunteerRoutes from './routes/volunteer.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookCall", bookCallRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/createRoom", createRoomRoutes);
app.use("/api/messagesQuota", messagesQuotaRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/myCalls", myCallsRoutes);
app.use("/api/myChats", myChatsRoutes);
app.use("/api/registerCall", registerCallRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/verifyEmail", verifyEmailRoutes);
app.use("/api/volunteer", volunteerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
