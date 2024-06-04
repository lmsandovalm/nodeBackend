const { Schema, model } = require("mongoose");

const QuestionMovilSchema = new Schema(
  {
    question_text: {
      type: String,
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "TopicCourse",
    },
    question_answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "AnswerTopicMovil",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(
  "QuestionTopicMovil",
  QuestionMovilSchema,
  "questions_topic_movil_coll"
);
