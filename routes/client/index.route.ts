import { Express } from "express";
import { topicRouter } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite.route";
import { searchRoutes } from "./search.route";
import { homeRoutes } from "./homt.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRouter);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
  app.use("/search", searchRoutes);
  app.use("/", homeRoutes);
};

export default clientRoutes;
