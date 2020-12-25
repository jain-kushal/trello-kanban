import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { TaskCardController } from "./controller/KanbanController/TaskCard.controller";
import { TaskCategoryController } from "./controller/KanbanController/taskCategory.controller";

export function createApp() {
  const taskCategoryController = new TaskCategoryController();
  const taskCardController = new TaskCardController();

  const app = express();

  // Bodyparser Middleware
  app.use(bodyParser.json());

  // Handling CORS policy (Currently in dev mode: All origins allowed!)
  app.use(cors());

  // API routes handling
  app.use("/api/taskcategory", taskCategoryController.getRouter());
  app.use("/api/taskcard", taskCardController.getRouter());

  // Handle 404 error
  app.get("*", (req, res) => {
    res.status(404).send("NOT FOUND");
  });

  return app;
}
