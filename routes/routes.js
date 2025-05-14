const express = require("express");
const multerMiddleware = require("../middleware/multer");
const postControllers = require("../controllers/postController");
const router = new express.Router();

router.post('/upload',multerMiddleware.single('modelfile'),postControllers.uploadPost)
router.get("/allpost",postControllers.getPost)


module.exports = router;