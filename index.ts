import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import * as database from "./config/database";
import { systemConfig } from "./config/config";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Method Override
app.use(methodOverride("_method"));

// Tiny MCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// admin Routes
adminRoutes(app);
// Client Routes
clientRoutes(app);

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
