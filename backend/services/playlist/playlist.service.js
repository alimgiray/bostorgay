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

async function getPlaylist(userID, playlistID) {
  const playlist = await Playlist.findOne({
    where: {
      id: playlistID,
    },
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

async function createPlaylist(userID, playlist) {
  const user = await User.findOne({ where: { id: userID } });
  const newPlaylist = await Playlist.create({
    name: playlist.name,
  });
  user.addPlaylist(newPlaylist);
  if (playlist.songs && playlist.songs.length > 0) {
    const songs = await Song.findAll({ where: { id: playlist.songs } });
    newPlaylist.setSongs(songs);
  }
  return await newPlaylist.save();
}

async function editPlaylist(userID, playlist) {
  const oldPlaylist = await getPlaylist(userID, playlist.id);
  oldPlaylist.name = playlist.name;
  if (playlist.songs && playlist.songs.length > 0) {
    const songs = await Song.findAll({ where: { id: playlist.songs } });
    oldPlaylist.setSongs(songs);
  }
  return await oldPlaylist.save();
}

async function deletePlaylist(userID, playlistID) {
  const playlist = await getPlaylist(userID, playlistID);
  await playlist.destroy();
}
