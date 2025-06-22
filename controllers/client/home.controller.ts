import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import Song from "../../models/songs.model";
import Topic from "../../models/topic.model";
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  })
    .limit(6)
    .sort("title");
  const newSongs = [];
  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
    });
    newSongs.push({
      id: song.id,
      title: song.title,
      like: song.like,
      avatar: song.avatar,
      slug: song.slug,
      infoSinger: {
        fullName: singer.fullName,
      },
    });
  }

  const topics = await Topic.find({
    deleted: false,
  }).limit(6);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    songs: newSongs,
    topics: topics,
  });
};
