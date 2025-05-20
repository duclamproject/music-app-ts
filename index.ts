import express, { Request, Response, Express } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/topics", (req: Request, res: Response) => {
  res.send("Đây là trang chủ đề");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
