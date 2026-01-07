const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Groq = require("groq-sdk");
const { questionAnswerPrompt,
    conceptExplainPrompt } = require("../utils/prompt");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const groq = new Groq({ apiKey: process.env.GEMINI_A });


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

        // 1. Initialize the model (Standard SDK setup)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            // OPTIONAL: Force JSON output directly from the model (Best Practice)
            generationConfig: { responseMimeType: "application/json" }
        });

        // 2. Generate Content
        const result = await model.generateContent(prompt);

        // 3. Extract text (Note: it is a function call .text(), not a property)
        const rawText = result.response.text();

        // 4. Clean the response (Your regex logic is excellent here)
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove starting ```json
            .replace(/```$/, "")        // Remove ending ```
            .trim();                    // Remove extra white space

        // 5. Parse
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

        // 1. Initialize the model (Standard SDK setup)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            // OPTIONAL: Force JSON output directly from the model (Best Practice)
            generationConfig: { responseMimeType: "application/json" }
        });

        // 2. Generate Content
        const result = await model.generateContent(prompt);

        // 3. Extract text (Note: it is a function call .text(), not a property)
        const rawText = result.response.text();

        // 4. Clean the response (Your regex logic is excellent here)
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove starting ```json
            .replace(/```$/, "")        // Remove ending ```
            .trim();                    // Remove extra white space

        // 5. Parse
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
