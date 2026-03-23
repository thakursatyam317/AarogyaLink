import express from 'express';
import { chatBot } from '../controllers/chatBot.js';

const router = express.Router();

// Chatbot endpoint
router.post('/chatbotMessages', chatBot);
export default router;