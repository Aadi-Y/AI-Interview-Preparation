const express = require("express");
const {generateQuestions,generateExplanation} = require("../controllers/aiController");

const router = express.Router();

router.post("/generateQuestion",generateQuestions);
router.post("/generateExplanation",generateExplanation);


module.exports = router;