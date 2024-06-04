const { Schema, model } = require("mongoose");

const MaterialTopicSchema = new Schema(
  {
    material_name: {
      type: String,
      required: [true, "The name is required."],
    },
    material_description: {
      type: String,
    },

    material_source: [
      {
        type: String,
      },
    ],

    material_topic: {
      type: Schema.Types.ObjectId,
      ref: "TopicCourse",
      required: [true, "The topic id is required."],
    },
    material_style: {
      type: Schema.Types.ObjectId,
      required: [true, "The learning style id is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(
  "MaterialTopic",
  MaterialTopicSchema,
  "material_topics_coll"
);
