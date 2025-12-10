const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt,
    conceptExplainPrompt } = require("../utils/prompt");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access Private
const generateQuestions = async (req, res) => {
    try {
        const { role,
            experience,
            topicToFocus,
            numberOfQuestions
        } = req.body

        if (!role || !experience || !topicToFocus || !numberOfQuestions) {
            return res.status(400).json(
                {
                    error: true,
                    message: "All field required"
                }
            )
        }

        const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);
        console.log(prompt);

        const response = await ai.models.generateText({
            model: "gemma-3-4b-it",
            prompt: prompt
        });

        const rawText = response.text;


        //Clean the response before use
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting of json
            .replace(/```$/, "") //remove ending of json
            .trim(); //remove extra spaces

        const data = JSON.parse(cleanedText);

        res.status(200).json({
            error: false,
            data
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc Generate concept explanation using Gemini
// @route POST /api/ai/generate-explanation
// @access Private
const generateExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(404).json({
                error: true,
                message: "Question is missing please pass question"
            })
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemma-3-4b",
            contents: prompt
        })

        let rawText = response.text;

        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting of json
            .replace(/```$/, "") //remove ending of json
            .trim(); //remove extra spaces

        const data = JSON.parse(cleanedText);

        res.status(201).json({
            error: false,
            data
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    generateQuestions,
    generateExplanation
}
