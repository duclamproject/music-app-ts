import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Topic from "./models/topic.model";

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/topics", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });

  console.log(topics);

  res.render("client/pages/topics/index.pug", {
    title: "Trang chủ đề bài hát",
    topics: topics,
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
