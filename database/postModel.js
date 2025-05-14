const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  modelfile: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
});

const postUploads = mongoose.model("postUploads", postSchema);

module.exports = postUploads;

