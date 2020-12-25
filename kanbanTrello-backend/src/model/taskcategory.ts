import mongoose from "mongoose";

export interface ITaskCategory extends mongoose.Document {
  title: String;
  _id: String;
}

export const TaskCategorySchema = new mongoose.Schema({
  title: String,
});

const TaskCategory = mongoose.model<ITaskCategory>(
  "TaskCategory",
  TaskCategorySchema
);

export default TaskCategory;
