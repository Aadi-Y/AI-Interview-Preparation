const express = require("express");
const {
    registerUser,loginUser,getUserProfile
} = require("../controllers/userControllers.js");
const {protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!res.file){
        res.status(400).json({
            error:true,
            message:"Please give profile image"
        })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

    if(imageUrl){
        res.status(201).json({
            error:false,
            message:"Image url is created and uploaded",
            imageUrl
        })
    }else{
        res.status(500).json({
            error:true,
            message:"Something went wrong try again later"
        })
    }
});

module.exports = router