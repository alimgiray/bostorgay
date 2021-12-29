const { DataTypes } = require("sequelize");
const database = require("../../database");

const Artist = require("../artist/artist.model");

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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    lyrics: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Song.belongsToMany(Artist);
Artist.hasMany(Song);

module.exports = Song;
