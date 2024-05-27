const { Schema, model } = require("mongoose");

const TestSchema = new Schema(
  {
    name_test: {
      type: String,
      required: [true, "The name test is required."],
    },
    description_test: {
      type: String,
    },

    questions_test: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionTest",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Test", TestSchema, "test_coll");
