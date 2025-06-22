import { Router } from "express";
import * as controller from "../../controllers/client/home.controller";
const route: Router = Router();

route.get("/", controller.index);

export const homeRoutes = route;
