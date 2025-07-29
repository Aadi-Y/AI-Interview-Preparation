const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    }],
    role:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    topicToFocus:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Session",sessionSchema);