import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
},{timestamps:true});

const Message = mongoose.model("Message", messageModel);

export default Message;