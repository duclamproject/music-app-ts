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
exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
    })
        .limit(6)
        .sort("title");
    const newSongs = [];
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
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
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).limit(6);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        songs: newSongs,
        topics: topics,
    });
});
exports.index = index;
