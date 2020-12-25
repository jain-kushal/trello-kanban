import mongoose from "mongoose";

export interface ITaskCard extends mongoose.Document {
  title: String;
  description: String;
  listID: String;
  _id: String;
}

export const TaskCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  listID: String,
});

const TaskCard = mongoose.model<ITaskCard>("TaskCard", TaskCardSchema);

export default TaskCard;
