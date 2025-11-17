import express from 'express';
import isAuthenticated from '../Middlewares/isAuthenticated.js';
import { addMemberController, createGroupController, deleteGroupController, getUserGroupsController, removeMemberController } from '../controllers/group.controller.js';

const groupRouter = express.Router();

//CREATE GROUP
groupRouter.post('/create', isAuthenticated, createGroupController);

//REMOVE MEMBER FROM GROUP
groupRouter.post('/remove', isAuthenticated, removeMemberController);

//Add Members to Group
groupRouter.patch('/add', isAuthenticated, addMemberController);

//delete Group
groupRouter.delete('/delete', isAuthenticated, deleteGroupController);

//Get Groups of User
groupRouter.get('/get-Groups', isAuthenticated, getUserGroupsController);

export default groupRouter;