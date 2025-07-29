const Questions = require("../modals/questionModal");
const Session = require("../modals/sessionModal");

// @desc add updated questions to session
// @route api/question/add
// @access private
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if(!sessionId || !questions){
            return res.status(400).json({
                error:false,
                message:"Missing required Field"
            })
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({
                error: true,
                message: "Session not found"
            })
        }

        const createdQuestions = await Questions.insertMany(
            questions.map((q) => (
                {
                    session: sessionId,
                    question: q.question,
                    answer: q.answer
                }

            ))
        )

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save()

        res.status(201).json({
            error: false,
            message:"New Questions Updated",
            createdQuestions

        })
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to pin or unpin the questions
// @route api/question/:id/pin
// @access private

exports.togglePinnedQuestion = async(req,res) => {
    try{    
        const question = await Questions.findById(req.params.id);

        if(!question){
            return res.status(404).json(
                {
                    error:true,
                    message:"Question not found"
                }
            )
        }

        question.isPinned = !question.isPinned;
        await question.save()

        res.status(201).json({
            error:false,
            message:"Question is pinned or unpinned successfully",
            question
        })

    }catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

//  @desc Update the note to the question
//  @route api/question/:id/note
//  @access private
exports.updateQuestionNote = async(req,res) => {
    try{
        const {note} = req.body
        const question = await Questions.findById(req.params.id);

        if(!question){
            return res.status(404).json({
                error:true,
                message:"Question not found"
            })
        }

        question.note = note || "";
        await question.save();

        res.status(201).json({
            error:false,
            message:"Note is added to the question",
            question
        })
    }
    catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}