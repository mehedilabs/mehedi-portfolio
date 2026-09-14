import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    liveLink: {
      type: String,
      required: true,
    },

    githubLink: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model("Project", projectSchema);