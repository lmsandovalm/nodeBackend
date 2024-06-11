const { Schema, model } = require("mongoose");

const TopicsCourseSchema = new Schema(
  {
    topic_name: {
      type: String,
      required: [true, "The name is required."],
    },
    topic_description: {
      type: String,
      required: [true, "The description is required."],
    },
    topic_material: [
      {
        type: Schema.Types.ObjectId,
        ref: "MaterialTopic",
      },
    ],
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "The course id is required."],
    },
    movil_questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionTopicMovil",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("TopicCourse", TopicsCourseSchema, "topics_course_coll");
