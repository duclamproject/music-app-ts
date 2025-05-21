import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

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

//[GET]: /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id,
    deleted: false,
  });

  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic,
  });
};

//[PATCH]: /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );

  res.json({
    code: 200,
    message: "Thành công!",
    newLike: newLike,
  });
};

//[PATCH]: /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitsSong = await FavoriteSong.findOne({
        songId: idSong,
        deleted: false,
      });
      if (!exitsSong) {
        const newSong = new FavoriteSong({
          // userId: ""
          songId: idSong,
        });
        await newSong.save();
        // res.json({
        //   code: 200,
        //   message: "Thành công!",
        //   data: data,
        // });
      }
      // res.json({
      //   code: 400,
      //   message: "Thất bại!",
      // });

      break;

    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong,
      });
      break;

    default:
      break;
  }
  res.json({
    code: 200,
    message: "Thành công!",
  });
};
