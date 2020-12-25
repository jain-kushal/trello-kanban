import { Request, Response, Router } from "express";

export class HelloController {
  getRouter(): Router {
    const router = Router();
    router.get("/", this.getHello.bind(this));
    return router;
  }

  getHello(request: Request, response: Response) {
    response.send("Hello world!").status(200);
  }
}
