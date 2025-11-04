import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import { getSocketRecieverId, io } from "../Socket/socket.js";

export const sendMessageController = async (req, res) => {
    try {
        
        const senderId = req.userId;
        const recieverId = req.params.id;
        const { message } = req.body;

        let getChat = await Chat.findOne({participants: {$all: [senderId, recieverId]}});

        if(!getChat){
            getChat = await Chat.create({
                participants: [senderId, recieverId],
            })
        };

         const newMessage = await Message.create({
            senderId,
            recieverId,
            message,
         });

         if(newMessage){
            getChat.latestMessage.push(newMessage._id); 
         }

         //This is will save both instantly
         await Promise.all([
            newMessage.save(),
            getChat.save(),
         ]);

         //Socket Connnection
         const recieverSocketId = getSocketRecieverId(recieverId);

         //in This we are sending reciever id via getSocketRecieverId
         if(recieverSocketId){
            io.to(recieverSocketId).emit('newMessage', newMessage);
         }

         return res.status(200).json({
            message: "Message sent successfully",
            newMessage,
         });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Send Message Controller",
            error: error.message,
        })
    }
}

//GET MESSAGE
export const getMessageController = async (req, res) => {
    try {
        const senderId = req.userId;
        const recieverId = req.params.id;

        const conversation = await Chat.findOne({participants: {$all: [senderId, recieverId]}})
        .populate('latestMessage');

        return res.status(200).json( conversation.latestMessage, );

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Get Message Controller",
            error: error.message,
        })
    }
}

