const postUploads = require("../database/postModel");

exports.uploadPost = async (req, res) => {
  try {
    const { title } = req.body;
    const modelfile = req.file.filename;

    const existingPost = await postUploads.findOne({ title });

    if (existingPost) {
      res.status(409).json("Already Exist");
    } else {
      const newPost = new postUploads({ modelfile, title });
      await newPost.save();
      res.status(201).json({ newPost });
    }
  } catch (error) {
    res.status(500).json({ errmsg: error });
  }
};

exports.getPost = async (req, res) => {
  try {
    const getAllPost = await postUploads.find();
    res.status(200).json(getAllPost);
  } catch (error) {
    res.status(500).json({ errmsg: error });
  }
};
