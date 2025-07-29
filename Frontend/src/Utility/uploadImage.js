import axios from "axios"

export const uploadImage = async(data) =>{
    const response = await axios.post(data,
        {
            "Content-Type":"multipart/image"
        }
    )

    if(response && response.data){
        console.log(response.data.message);
    }
}