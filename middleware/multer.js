const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `model-${Date.now()}-${file.originalname}`);
  },
});

//mutler vech storage server ll create cheyaan ann

const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
