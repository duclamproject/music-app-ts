import { Request, Response } from "express";
import Song from "../../models/songs.model";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    status: "active",
    deleted: false,
  });

  res.render("admin/pages/songs/index", {
    pageTitle: "Trang quản lý bài hát",
    songs: songs,
  });
};
