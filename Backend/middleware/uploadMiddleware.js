const multer = require("multer");

//configure storage
const storage = multer.diskStorage({
    //destination
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    //filename
    filename:(req,file,cb)=>{
        cb(null,`${Data.now()}-${file.originalname}`)
    }
})

//file filter
const fileFilter = (req,file,cb) => {
    //Desidered mimetype of the file
    const allowedTypes = ["image/jpeg","image/png","image/jpg"];


    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only .jpeg, .png and .jpg formats are allowed"),false)
    }
}

const upload = multer(storage,fileFilter)

module.exports = upload