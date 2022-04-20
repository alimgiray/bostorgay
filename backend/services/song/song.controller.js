const express = require("express");
const router = express.Router();

const Joi = require("joi");

const validateRequest = require("../../helpers/validate-request");
const authenticateAdmin = require("../../helpers/authenticate-admin");
const authenticateEditor = require("../../helpers/authenticate-editor");

const songService = require("./song.service");

router.get("/", getAllSongs);
router.get("/count", getSongCount);
router.get("/latest", getLatestSongs);
router.get("/search", searchSongs);
router.get("/:id", getSong);
router.post("/", authenticateEditor, songSchema, addSong);
router.put("/:id", authenticateEditor, songSchema, editSong);
router.delete("/:id", authenticateAdmin, deleteSong);

function getAllSongs(req, res, next) {
  songService
    .getAllSongs()
    .then((songs) => res.json(songs))
    .catch(next);
}

function getLatestSongs(req, res, next) {
  songService
    .getLatestSongs()
    .then((songs) => res.json(songs))
    .catch(next);
}

function searchSongs(req, res, next) {
  const query = req.query.q;
  songService
    .searchSongs(query)
    .then((songs) => res.json(songs))
    .catch(next);
}

function getSong(req, res, next) {
  const songID = req.params.id;
  songService
    .getSong(songID)
    .then((song) => res.json(song))
    .catch(next);
}

function songSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    artists: Joi.array().items(Joi.number()).required().min(1), // Artist IDs
    url: Joi.string().allow(""), // Expecting a valid youtube URL
    file: Joi.alternatives().conditional("url", {
      is: "",
      then: Joi.string().required(),
    }),
  });
  validateRequest(req, res, next, schema);
}

function addSong(req, res, next) {
  const song = req.body;
  songService
    .addSong(song)
    .then((song) => res.json(song))
    .catch(next);
}

function editSong(req, res, next) {
  const songID = req.params.id;
  const song = req.body;
  songService
    .editSong(songID, song)
    .then((song) => res.json(song))
    .catch(next);
}

function deleteSong(req, res, next) {
  const songID = req.params.id;
  songService
    .deleteSong(songID)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function getSongCount(req, res, next) {
  songService
    .getSongCount()
    .then((resp) => res.json(resp))
    .catch(next);
}

module.exports = router;
