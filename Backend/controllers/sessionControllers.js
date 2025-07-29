const Question = require("../modals/questionModal");
const Session = require("../modals/sessionModal");

//@desc Create a new session
//@route POST /api/session/createSession
//access Private
exports.createSession = async (req,res) => {
    try{
        const {
            role,
            description,
            experience,
            topicToFocus,
            questions
        } = req.body
        const userId = req.user._id;

        const session = await Session.create({
            role,
            experience,
            topicToFocus,
            description,
            user:userId
        })

        const questionDocs = await Promise.all(
            questions.map(async(q) => {
                const question = await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer,
                });

                return question._id;
            })
        )

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({
            error:false,
            message:"Session Successfully Created",
            session
        })
    }
    catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

//@desc Get my Session
//@route GET /api/session/getMySession
//access Private
exports.getMySession = async (req,res) => {
    try{
        const sessions = await Session.find({user:req.user._id})
        .sort({createdAt:-1})
        .populate("questions");

        if(!sessions){
            return res.status(404).json({
                error:false,
                message:"No session found"
            })
        }

        res.status(200).json({
            error:false,
            message:"Sessions are fetched Successfully",
            sessions
        })
    }
    catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

//@desc Get my session by id
//@route GET /api/session/getMySessionById/:id
//access Private
exports.getMySessionById = async (req,res) => {
    try{
        const session = await Session.findById(req.params.id)
        .populate({
            path:"questions",
            options:{sort:{isPinned:-1,createdAt:1}},
        })
        .exec();

        if(!session){
            return res.status(404).json({
                error:false,
                message:"Session not found"
            })
        }

        res.status(200).json({
            error:false,
            message:"Session Fetched successfully",
            session
        })
    }
    catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

//@desc Delete a particular session
//@route GET /api/session/deleteSession/:id
//access Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        error: true,
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: true,
        message: "Not authorized to delete the session",
      });
    }

    // Delete all questions associated with this session
    await Question.deleteMany({ session: session._id });

    // Delete the session
    await Session.deleteOne({ _id: session._id });

    res.status(200).json({
      error: false,
      message: "Session successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};


//@desc Update a particular session
//@route UPDATE /api/session/updateSession/:id
//access Private
exports.updateSession = async (req,res) => {
    
    try{
        
    }
    catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

