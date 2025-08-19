const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config();
const connectDatabase = require("./config/Database.js")

//Routes
const authRoutes = require("./routes/userRoute");
const sessionRoutes = require("./routes/sessionRoute");
const questionRoutes = require("./routes/questionRoute");
const aiRoutes = require("./routes/aiRoute.js");

const app = express();
const Port = process.env.PORT || 8000;

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","UPDATE","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
)

app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))


app.use("/api/auth",authRoutes);
app.use("/api/session",sessionRoutes);
app.use("/api/question",questionRoutes);
app.use("/api/ai",aiRoutes);

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to AI Interview Preparations"
    })
})

connectDatabase();
module.exports = app;

// app.listen(Port,()=>{
//     console.log("Server is running at the port : ",Port);
//     connectDatabase();
// })

