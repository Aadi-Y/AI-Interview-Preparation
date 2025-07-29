const express = require("express");
const {
    createSession,
    getMySession,
    getMySessionById,
    deleteSession,
    updateSession
} = require("../controllers/sessionControllers");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createSession",protect,createSession);
router.get("/getMySession",protect,getMySession);
router.get("/getMySessionById/:id",protect,getMySessionById);
// router.get("/updateSession/:id",protect,updateSession);
router.delete("/deleteSession/:id",protect,deleteSession);

module.exports = router