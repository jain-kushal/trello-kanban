import { Request, Response, Router } from "express";
import TaskCategory from "../../model/taskcategory";

export class TaskCategoryController {
  getRouter(): Router {
    const router = Router();

    /**
     * @route   GET api/TaskCategory
     * @desc    Get All TaskCategories
     * @access  Public
     */
    router.get("/", async (req: Request, res: Response) => {
      try {
        const taskCategory = await TaskCategory.find();
        if (!taskCategory) throw Error("No TaskCategory");
        res.status(200).json(taskCategory);
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
    });

    /**
     * @route   POST api/TaskCategory
     * @desc    POST A TaskCategory
     * @access  Public
     */
    router.post("/", async (req: Request, res: Response) => {
      const taskCategory = new TaskCategory({
        title: req.body.title,
        listID: req.body.listID,
      });

      try {
        const newTaskCategory = await taskCategory.save();
        if (!newTaskCategory)
          throw Error("Something went wrong while saving the newTaskCategory!");
        res.status(200).json(newTaskCategory);
      } catch (err) {
        res.status(400).json({ msn: err.message });
      }
    });
    return router;
  }
}
