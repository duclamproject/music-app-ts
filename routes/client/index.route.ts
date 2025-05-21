import { Express } from "express";
import { topicRouter } from "./topic.route";
import { songRoutes } from "./song.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRouter);
  app.use("/songs", songRoutes);
};

export default clientRoutes;
