import express from 'express';
import colors from 'colors';
import { loginController, logoutController, registerController, getAllUsersController } from '../controllers/user.Controller.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';

//We are using router to give api a route
const userRouter = express.Router();

//CREATE A NEW USER
userRouter.post('/register', registerController);

//LOGIN USER
userRouter.post('/login', loginController);

//LOGOUT USER
userRouter.get('/logout', logoutController);

//GET ALL USERS 
userRouter.get('/getAll', isAuthenticated, getAllUsersController);

export default userRouter;