"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, topic_route_1.topicRoutes);
    app.use(`${PATH_ADMIN}/songs`, song_route_1.songRoutes);
    app.use(`${PATH_ADMIN}/upload`, upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
