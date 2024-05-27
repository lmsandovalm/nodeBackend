const { Schema, model } = require("mongoose");

const TestAnswerSchema = new Schema(
  {
    answer_question: {
      type: String,
      required: [true, "The answer is required."],
    },
    
    answer_type: {
      type: Schema.Types.ObjectId,
      required: [true, "The learning style is required."],
    },
    question: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("TestAnswer", TestAnswerSchema, "test_answers_coll");
