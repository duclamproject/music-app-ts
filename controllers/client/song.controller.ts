import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";

//[GET]: /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slugTopic = req.params.slugTopic;
  const topic = await Topic.findOne({
    slug: slugTopic,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });

    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};
