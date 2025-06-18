import { Router } from "express";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

import multer from "multer";

const route: Router = Router();
const upload = multer();
import * as controller from "../../controllers/admin/upload.controller";

route.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRoutes = route;
