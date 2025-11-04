import mongoose from "mongoose";

const chatModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    latestMessage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
},{timestamps:true});

const Chat = mongoose.model("Chat", chatModel);

export default Chat;