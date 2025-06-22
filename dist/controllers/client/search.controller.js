"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.query.keyword}`;
    const type = `${req.params.type}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword.trim());
        const stringSlugRegex = new RegExp(stringSlug.trim(), "i");
        const songs = yield songs_model_1.default.find({
            $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
        });
        for (const item of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: item.singerId,
            });
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
});
exports.result = result;
