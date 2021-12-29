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

async function getAllSongs() {}
async function searchSongs(query) {}
async function getSong(songID) {}
async function addSong(song) {}
async function editSong(songID, song) {}
async function deleteSong(songID) {}
