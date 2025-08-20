// export const BASE_URL = "https://ai-interview-preparation-vkrz.vercel.app";
export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH:{
        REGISTER:"/api/auth/register", //This path is used to do Signup
        LOGIN:"/api/auth/login", //This path is used to do Login
        GET_PROFILE:"/api/auth/profile" //This path is used to get profile
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image" //This path is used to do upload image
    },
    AI:{
        GENERATE_QUESTIONS:"/api/ai/generateQuestion", //This path is used to generate a questions using ai
        GENERATE_EXPLANATION:"/api/ai/generateExplanation" //This path is used to generate a concept explanation using ai
    },
    SESSION:{
        CREATE:"/api/session/createSession", //This path is used to create a new session
        DELETE:(id)=>`/api/session/deleteSession/${id}`, //This path is used to delete a particular session
        GET_ALL:"/api/session/getMySession", //This path is used to 
        GET_ONE:(id)=>`/api/session/getMySessionById/${id}`, //This path is used to get a particular session
    },
    QUESTION:{
        ADD_TO_SESSION:"/api/question/add", //This path is used to add the question to session
        PIN:(id)=>`/api/question/${id}/pin`, //This path is used to pin or unpin the questions
        UPDATE_NOTE:(id)=>`/api/question/${id}/note` //This path is used to update the questions
    }
}