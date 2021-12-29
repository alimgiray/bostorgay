const errors = require("../../errors");

const Artist = require("./artist.model");

module.exports = {
  getAllArtists,
  searchArtists,
  getSongsOfArtist,
  getArtist,
  addArtist,
  editArtist,
  deleteArtist,
};

async function getAllArtists() {}
async function searchArtists() {}
async function getSongsOfArtist(artistID) {}
async function getArtist(artistID) {}
async function addArtist(artist) {}
async function editArtist(artistID, artist) {}
async function deleteArtist(artistID) {}
