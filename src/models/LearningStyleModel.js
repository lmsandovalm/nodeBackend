const { Schema, model } = require("mongoose");

const LearningStyleSchema = new Schema(
  {
    name_style: {
      type: String,
      required: [true, "The name learning style is required."],
    },
    description_style: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(
  "LearningStyle",
  LearningStyleSchema,
  "learning_styles_coll"
);
