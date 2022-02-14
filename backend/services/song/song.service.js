const url = require("url");
const path = require("path");

const ffmpegPath = path.resolve(`./bin/${process.env.FFMPEG_BIN}`);
const outputDir = path.resolve("./audio");

const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const Sequelize = require("sequelize");
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
  searchSongs,
  getSong,
  addSong,
  editSong,
  deleteSong,
};

async function getAllSongs() {
  return await Song.findAll({
    include: [
      {
        model: Artist,
        as: "artists",
        attributes: ["id", "name"],
      },
    ],
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
  try {
    let newSong = await Song.create({
      name: song.name,
      url: song.url,
    });
    newSong.addArtists(artists);
    newSong = await newSong.save();
    saveAudio(song);
    return newSong;
  } catch (err) {
    if (
      err.errors &&
      err.errors.length > 0 &&
      err.errors[0].message.includes("url must be unique")
    ) {
      throw new errors.AppError(
        errors.errorTypes.NOT_VALID,
        400,
        "Song URL already exists",
        true
      );
    } else {
      throw err;
    }
  }
}

// Save song as audio file
function saveAudio(song) {
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
  yd.download(query.v, `${song.id}.mp3`);
}

async function editSong(songID, song) {
  const artists = await getArtistsOfSong(song.artists);
  const oldSong = await getSong(songID);
  oldSong.name = song.name;
  oldSong.url = song.url;
  oldSong.lyrics = song.lyrics;
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
