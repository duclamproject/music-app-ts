import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;

  let newSongs = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    // Tạo slug không dấu và có dấu trừ ngăn cách (-) (Tìm kiếm theo slug) sử dụng thư viện unidecode
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    });

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });

      item["infoSinger"] = infoSinger;
    }

    newSongs = songs;
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả tìm kiếm: ${keyword}`,
    keyword: keyword,
    songs: newSongs,
  });
};
