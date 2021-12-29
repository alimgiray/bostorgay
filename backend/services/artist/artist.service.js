const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

async function searchArtists(query) {
  return await Artist.findAll({
    where: {
      name: {
        [Op.substring]: query,
      },
    },
  });
}

async function getSongsOfArtist(artistID) {}

async function getArtist(artistID) {
  const artist = await Artist.findOne({
    where: {
      id: artistID,
    },
  });
  if (!artist) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "Artist not found",
      true
    );
  }
  return artist;
}

async function addArtist(name) {
  const artist = await Artist.create({ name });
  return await artist.save();
}

async function editArtist(artistID, name) {
  const artist = await getArtist(artistID);
  artist.name = name;
  return await artist.save();
}

async function deleteArtist(artistID) {
  const artist = await getArtist(artistID);
  await artist.destroy();
}
