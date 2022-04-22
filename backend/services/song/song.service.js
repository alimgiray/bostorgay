const url = require("url");
const path = require("path");
const fs = require("fs");

const ffmpegPath = path.resolve(`./bin/${process.env.FFMPEG_BIN}`);
const outputDir = path.resolve("./audio");

const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const youtube_dl = require("youtube-mp3-downloader");
const yd = new youtube_dl({
  ffmpegPath: ffmpegPath,
  outputPath: outputDir,
  youtubeVideoQuality: "highestaudio",
  queueParallelism: 2,
  progressTimeout: 2000,
  allowWebm: false,
});

const errors = require("../../errors");

const Artist = require("../artist/artist.model");
const Song = require("./song.model");

module.exports = {
  getAllSongs,
  getLatestSongs,
  searchSongs,
  getSong,
  addSong,
  editSong,
  deleteSong,
  getSongCount,
};

async function getAllSongs() {
  return await Song.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Artist,
        as: "artists",
        attributes: ["id", "name"],
      },
    ],
  });
}

async function getLatestSongs() {
  return await Song.findAll({
    include: [
      {
        model: Artist,
        as: "artists",
        attributes: ["id", "name"],
      },
    ],
    order: [["id", "DESC"]],
    limit: [20],
  });
}

async function searchSongs(query) {
  return await Song.findAll({
    where: {
      name: Sequelize.where(
        Sequelize.fn("UPPER", Sequelize.col("name")),
        "LIKE",
        "%" + query.toUpperCase() + "%"
      ),
    },
    include: [
      {
        model: Artist,
        as: "artists",
        attributes: ["id", "name"],
      },
    ],
    limit: 20,
  });
}

async function getSong(songID) {
  const song = await Song.findOne({
    where: {
      id: songID,
    },
    include: [
      {
        model: Artist,
        as: "artists",
        attributes: ["id", "name"],
      },
    ],
  });
  if (!song) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "Song not found",
      true
    );
  }
  return song;
}

async function addSong(song) {
  const artists = await getArtistsOfSong(song.artists);
  if (song.url) {
    downloadAudio(song);
  }
  if (song.file) {
    saveAudio(song);
  }
  try {
    let newSong = await Song.create({
      name: song.name,
      filename: song.filename,
      url: `/audio/${song.filename}.mp3`,
    });
    newSong.addArtists(artists);
    newSong = await newSong.save();
    return newSong;
  } catch (err) {
    throw err;
  }
}

function saveAudio(song) {
  const filename = uuidv4();
  const buffer = Buffer.from(song.file.split("base64,")[1], "base64");
  fs.writeFileSync(`${outputDir}/${filename}.mp3`, buffer);
  song.filename = filename;
}

// Save song as audio file
function downloadAudio(song) {
  const songURL = url.parse(song.url, true);
  const query = songURL.query;
  if (!query.v) {
    throw new errors.AppError(
      errors.errorTypes.NOT_VALID,
      400,
      "Invalid Song URL",
      true
    );
  }
  const filename = uuidv4();
  yd.download(query.v, `${filename}.mp3`);
  song.filename = filename;
}

async function editSong(songID, song) {
  const artists = await getArtistsOfSong(song.artists);
  const oldSong = await getSong(songID);
  oldSong.name = song.name;
  oldSong.setArtists(artists);
  return await oldSong.save();
}

async function deleteSong(songID) {
  const song = await getSong(songID);
  await song.destroy();
}

async function getArtistsOfSong(artistIDs) {
  const artists = await Artist.findAll({
    where: {
      id: artistIDs,
    },
  });
  if (artists.length < artistIDs.length) {
    throw new errors.AppError(
      errors.errorTypes.NOT_VALID,
      400,
      "Some of the artists not found.",
      true
    );
  }
  return artists;
}

async function getSongCount() {
  const count = await Song.count();
  return { count };
}
