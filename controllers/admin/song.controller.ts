import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

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

export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const song = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };

  const newSong = new Song(song);
  await newSong.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};
