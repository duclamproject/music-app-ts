import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET]: /search/:type
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const type: string = `${req.params.type}`;

  let newSongs = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    // Tạo slug không dấu và có dấu trừ ngăn cách (-) (Tìm kiếm theo slug) sử dụng thư viện unidecode
    const stringSlug = convertToSlug(keyword.trim());
    const stringSlugRegex = new RegExp(stringSlug.trim(), "i");

    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    });

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });

      // item["infoSinger"] = infoSinger;

      newSongs.push({
        id: item.id,
        title: item.title,
        like: item.like,
        avatar: item.avatar,
        slug: item.slug,
        infoSinger: {
          fullName: infoSinger.fullName,
        },
      });
    }

    // newSongs = songs;
  }

  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả tìm kiếm: ${keyword}`,
        keyword: keyword,
        songs: newSongs,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công!",
        songs: newSongs,
      });
      break;
    default:
      res.json({
        code: 400,
        message: "Lỗi!",
      });
      break;
  }
};

// export const suggest = async (req: Request, res: Response) => {
//   const keyword = `${req.query.keyword}`;

//   const keywordRegex = new RegExp(keyword, "i");
//   const keywordSlug = convertToSlug(keyword);
//   const keywordSlugRegex = new RegExp(keywordSlug, "i");

//   const songSuggest = await Song.find({
//     $or: [{ title: keywordRegex }, { slug: keywordSlugRegex }],
//   }).select("title avatar slug singerId songId");

//   for (const item of songSuggest) {
//     const infoSinger = await Singer.findOne({
//       _id: item.singerId,
//     });

//     item["infoSinger"] = infoSinger;
//   }

//   res.json({
//     code: 200,
//     message: "Thành công!",
//     songSuggest: songSuggest,
//   });
// };
