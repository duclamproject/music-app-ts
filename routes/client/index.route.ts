import { Express } from "express";
import { topicRouter } from "./topic.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRouter);
};

export default clientRoutes;
