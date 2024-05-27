const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
  {
    coure_name: {
      type: String,
      required: [true, "The name is required."],
    },
    coure_description: {
      type: String,
      required: [true, "The description is required."],
    },
    course_topics: [
      {
        ref: "TopicCourse",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Course", CourseSchema, "courses_coll");
