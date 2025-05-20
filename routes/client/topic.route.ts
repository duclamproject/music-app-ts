import { Request, Response, Router } from "express";
const router: Router = Router();

import Topic from "../../models/topic.model";

router.get("/", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });

  console.log(topics);

  res.render("client/pages/topics/index.pug", {
    title: "Trang chủ đề bài hát",
    topics: topics,
  });
});

export const topicRouter: Router = router;
