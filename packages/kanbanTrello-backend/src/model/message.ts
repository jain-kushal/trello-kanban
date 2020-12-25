import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  text: string;
}

export const MessageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
