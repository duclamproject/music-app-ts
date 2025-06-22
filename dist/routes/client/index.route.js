"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_route_1 = require("./favorite.route");
const search_route_1 = require("./search.route");
const homt_route_1 = require("./homt.route");
const clientRoutes = (app) => {
    app.use("/topics", topic_route_1.topicRouter);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/favorite-songs", favorite_route_1.favoriteSongRoutes);
    app.use("/search", search_route_1.searchRoutes);
    app.use("/", homt_route_1.homeRoutes);
};
exports.default = clientRoutes;
