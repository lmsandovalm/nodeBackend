const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
    {
      question_text: {
        type: String,
        required: true,
      },
      question_answers: [
        {
          type: Schema.Types.ObjectId,
          ref: "Answer",
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

module.exports = model("QuestionsTopic", QuestionSchema, "questions_topic_coll");
