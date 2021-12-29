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

async function getAllArtists() {
  return await Artist.findAll({});
}

async function searchArtists() {}
async function getSongsOfArtist(artistID) {}
async function getArtist(artistID) {}

async function addArtist(name) {
  const artist = await Artist.create({ name });
  return await artist.save();
}

async function editArtist(artistID, artist) {}
async function deleteArtist(artistID) {}
