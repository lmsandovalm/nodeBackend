const { Schema, model } = require("mongoose");

const QuestionTestSchema = new Schema(
  {
    question_name: {
      type: String,
      required: [true, "The name is required."],
    },
    question_description: {
      type: String,
    },
    test: {
      type: Schema.Types.ObjectId,
    },
    answers_question: [
      {
        type: Schema.Types.ObjectId,
        ref: "TestAnswer",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(
  "QuestionTest",
  QuestionTestSchema,
  "test_questions_coll"
);
