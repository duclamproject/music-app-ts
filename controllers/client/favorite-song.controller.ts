import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Singer from "../../models/singer.model";
import Song from "../../models/songs.model";

export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    deleted: false,
  });

  for (const item of favoriteSongs) {
    const song = await Song.findOne({
      _id: item.songId,
      deleted: false,
    });
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    });
    item["song"] = song;
    item["singer"] = singer;
  }
  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs,
  });
};
