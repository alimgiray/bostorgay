const express = require("express");
const router = express.Router();

// const Joi = require("joi");

// const validateRequest = require("../../helpers/validate-request");
// const authenticate = require("../../helpers/authenticate");

const songService = require("./song.service");

router.get("/", getSongsAfterID);
// router.post("/", addSongSchema, addSong);

// TODO get these from database
function getSongsAfterID(req, res, next) {
  const lastID = req.query.after;
  if (lastID > 0) {
    res.json([]);
    return;
  }
  const songs = [
    {
      id: 1,
      name: "Elimdeki Kemane",
      url: "https://www.youtube.com/watch?v=_iOLkj5eclk",
      artists: [1, 2],
    },
    {
      id: 2,
      name: "Qamışım",
      url: "https://www.youtube.com/watch?v=50OmnguhyOE",
      artists: [1, 3],
    },
    {
      id: 3,
      name: "Dahdan Da Endi Bir Kozu",
      url: "https://www.youtube.com/watch?v=arq87TC0OQ0",
      artists: [4],
    },
    {
      id: 4,
      name: "Tipir",
      url: "https://www.youtube.com/watch?v=dhSwvlAFtws",
      artists: [4],
    },
  ];
  res.json(songs);
}

module.exports = router;
