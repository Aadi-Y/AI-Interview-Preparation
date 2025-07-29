const express = require("express");
const {addQuestionToSession,updateQuestionNote,togglePinnedQuestion} = require("../controllers/questionControllers");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add",protect,addQuestionToSession);
router.post("/:id/pin",protect,togglePinnedQuestion);
router.post("/:id/note",protect,updateQuestionNote);


module.exports = router