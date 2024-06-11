const { Schema, model } = require("mongoose");

const RankingSchema = new Schema(
  {
    score: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Ranking", RankingSchema, "ranking_coll");
