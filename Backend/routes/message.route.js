import express from 'express';
import { getMessageController, sendMessageController } from '../controllers/message.Controller.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';


//Rest Object
const messageRouter = express.Router();

//Send Message
messageRouter.post('/send/:id', isAuthenticated, sendMessageController);

//Get Message Via Id
messageRouter.get('/get/:id', isAuthenticated, getMessageController);

export default messageRouter;