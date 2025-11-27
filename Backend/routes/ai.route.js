import express from 'express';
import { AIController } from '../controllers/ai.controller.js';

const AiRouter = express.Router();

AiRouter.post('/ai', AIController);

export default AiRouter;

