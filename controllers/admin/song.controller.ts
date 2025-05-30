import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

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

export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers,
  });
};
