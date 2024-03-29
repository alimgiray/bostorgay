const express = require("express");
const router = express.Router();

const Joi = require("joi");

const validateRequest = require("../../helpers/validate-request");
const authenticateAdmin = require("../../helpers/authenticate-admin");
const authenticateEditor = require("../../helpers/authenticate-editor");

const artistService = require("./artist.service");

router.get("/", getAllArtists);
router.get("/count", getArtistCount);
router.get("/search", searchArtists);
router.get("/latest", getLatestArtists);
router.get("/:id/songs", getSongsOfArtist);
router.get("/:id", getArtist);
router.post("/", authenticateEditor, artistSchema, addArtist);
router.put("/:id", authenticateEditor, artistSchema, editArtist);
router.delete("/:id", authenticateAdmin, deleteArtist);

function getAllArtists(req, res, next) {
  artistService
    .getAllArtists()
    .then((artists) => res.json(artists))
    .catch(next);
}

function getLatestArtists(req, res, next) {
  const from = req.query.from ?? 0;
  artistService
    .getLatestArtists(from)
    .then((artists) => res.json(artists))
    .catch(next);
}

function searchArtists(req, res, next) {
  const query = req.query.q;
  artistService
    .searchArtists(query)
    .then((artists) => res.json(artists))
    .catch(next);
}

function getSongsOfArtist(req, res, next) {
  const artistID = req.params.id;
  artistService
    .getSongsOfArtist(artistID)
    .then((songs) => res.json(songs))
    .catch(next);
}

function getArtist(req, res, next) {
  const artistID = req.params.id;
  artistService
    .getArtist(artistID)
    .then((artist) => res.json(artist))
    .catch(next);
}

function artistSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });
  validateRequest(req, res, next, schema);
}

function addArtist(req, res, next) {
  const artist = req.body;
  artistService
    .addArtist(artist.name)
    .then((artist) => res.json(artist))
    .catch(next);
}

function editArtist(req, res, next) {
  const artistID = req.params.id;
  const artist = req.body;
  artistService
    .editArtist(artistID, artist.name)
    .then((artist) => res.json(artist))
    .catch(next);
}

function deleteArtist(req, res, next) {
  const artistID = req.params.id;
  artistService
    .deleteArtist(artistID)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function getArtistCount(req, res, next) {
  artistService
    .getArtistCount()
    .then((resp) => res.json(resp))
    .catch(next);
}

module.exports = router;
