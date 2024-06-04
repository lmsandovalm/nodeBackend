const { Schema, model } = require("mongoose");

const AnswerSchemaMovil = new Schema(
  {
    answer: {
      type: String,
      required: [true, "The answer is required."],
    },
    is_correct: {
      type: Boolean,
      required: [true, "The is correct answer is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("AnswerTopicMovil", AnswerSchemaMovil, "answers_topic_movil_coll");
