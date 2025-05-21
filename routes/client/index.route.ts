import { Express } from "express";
import { topicRouter } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRouter);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
};

export default clientRoutes;
