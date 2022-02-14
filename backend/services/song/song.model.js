const { DataTypes } = require("sequelize");
const database = require("../../database");

const Artist = require("../artist/artist.model");
const Playlist = require("../playlist/playlist.model");

const Song = database.define(
  "song",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Song.belongsToMany(Artist, {
  through: "artist_song",
  as: "artists",
  foreignKey: "song_id",
});
Artist.belongsToMany(Song, {
  through: "artist_song",
  as: "songs",
  foreignKey: "artist_id",
});

Song.belongsToMany(Playlist, {
  through: "playlist_song",
  as: "playlists",
  foreignKey: "song_id",
});
Playlist.belongsToMany(Song, {
  through: "playlist_song",
  as: "songs",
  foreignKey: "playlist_id",
});

module.exports = Song;
