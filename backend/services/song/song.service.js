const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
  return await Song.findAll({});
}

async function searchSongs(query) {
  return await Song.findAll({
    where: {
      name: {
        [Op.substring]: query,
      },
    },
  });
}

async function getSong(songID) {
  const song = await Song.findOne({
    where: {
      id: songID,
    },
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
    const newSong = await Song.create({
      name: song.name,
      url: song.url,
    });
    newSong.addArtists(artists);
    return await newSong.save();
  } catch (err) {
    if (err.errors[0].message.includes("url must be unique")) {
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
