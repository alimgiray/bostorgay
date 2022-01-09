const { DataTypes } = require("sequelize");
const database = require("../../database");

const User = require("../user/user.model");

const Playlist = database.define(
  "playlist",
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
  },
  {
    timestamps: true,
  }
);

Playlist.belongsTo(User, { as: "user" });
User.hasMany(Playlist, { as: "playlists" });

module.exports = Playlist;
