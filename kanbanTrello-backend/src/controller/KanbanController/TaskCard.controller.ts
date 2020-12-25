import { Request, Response, Router } from "express";
import TaskCard, { ITaskCard } from "../../model/taskcard";

export class TaskCardController {
  getRouter(): Router {
    const router = Router();

    /**
     * @route   GET api/TaskCard
     * @desc    Get All TaskCards
     * @access  Public
     */
    router.get("/", async (req: Request, res: Response) => {
      try {
        const taskCards = await TaskCard.find();
        if (!taskCards) throw Error("No TaskCards");
        const getJSONTaskCards = getJSONTaskCardsHelper(taskCards);
        res.status(200).json(getJSONTaskCards);
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
    });

    /**
     * @route   POST api/TaskCard
     * @desc    Create A TaskCard
     * @access  Public
     */
    router.post("/", async (req: Request, res: Response) => {
      const taskCard = new TaskCard({
        title: req.body.title,
        description: req.body.description,
        listID: req.body.listID,
      });

      try {
        const newTaskCard = await taskCard.save();
        if (!newTaskCard)
          throw Error("Something went wrong while saving the TaskCard!");
        res.status(200).json(newTaskCard);
      } catch (err) {
        res.status(400).json({ msn: err.message });
      }
    });

    /**
     * @route   PUT api/TaskCard
     * @desc    UPDATE An TaskCard
     * @access  Public
     */
    router.put("/:id", async (req: Request, res: Response) => {
      try {
        const taskCardFound = await TaskCard.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { new: true, useFindAndModify: false }
        );
        if (!taskCardFound)
          throw Error("Something went wrong while saving the TaskCard!");
        res.status(200).json(taskCardFound);
      } catch (err) {
        res.status(400).json({ msn: err.message });
      }
    });

    return router;
  }
}

function getJSONTaskCardsHelper(taskCards: ITaskCard[]) {
  const taskCardsDictionary: { [id: string]: any[] } = {};
  for (const taskCard of taskCards) {
    if (!(String(taskCard.listID) in taskCardsDictionary)) {
      taskCardsDictionary[String(taskCard.listID)] = [];
    }
    taskCardsDictionary[String(taskCard.listID)].push(taskCard);
  }
  return taskCardsDictionary;
}
