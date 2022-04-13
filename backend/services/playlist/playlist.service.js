const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const errors = require("../../errors");

const Playlist = require("./playlist.model");
const User = require("../user/user.model");
const Song = require("../song/song.model");

module.exports = {
  getAllPlaylistsOfUser,
  getPlaylist,
  createPlaylist,
  editPlaylist,
  deletePlaylist,
};

async function getAllPlaylistsOfUser(userID) {
  return await Playlist.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id"],
        where: {
          id: userID,
        },
      },
      {
        model: Song,
        as: "songs",
      },
    ],
  });
}

async function getPlaylist(playlistID) {
  const playlist = await Playlist.findOne({
    where: {
      id: playlistID,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username"],
      },
      {
        model: Song,
        as: "songs",
      },
    ],
  });
  if (!playlist) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "Playlist not found",
      true
    );
  }
  return playlist;
}

async function getUserPlaylist(userID, playlistID) {
  const playlist = await Playlist.findOne({
    where: {
      id: playlistID,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username"],
        where: {
          id: userID,
        },
      },
      {
        model: Song,
        as: "songs",
      },
    ],
  });
  if (!playlist) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "Playlist not found",
      true
    );
  }
  return playlist;
}

async function createPlaylist(userID, name) {
  const user = await User.findOne({ where: { id: userID } });
  const newPlaylist = await Playlist.create({
    name: name,
  });
  user.addPlaylist(newPlaylist);
  return await newPlaylist.save();
}

async function editPlaylist(userID, playlist) {
  const oldPlaylist = await getUserPlaylist(userID, playlist.id);
  oldPlaylist.name = playlist.name;
  const songs = await Song.findAll({ where: { id: playlist.songs } });
  await oldPlaylist.setSongs(songs);
  await oldPlaylist.save();
  return await getUserPlaylist(userID, playlist.id);
}

async function deletePlaylist(userID, playlistID) {
  const playlist = await getUserPlaylist(userID, playlistID);
  await playlist.destroy();
}
