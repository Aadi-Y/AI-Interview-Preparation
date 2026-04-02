import {createContext,useEffect,useState} from "react";
import {axiosInstance} from "../Utility/axiosInstance";
import { API_PATHS } from "../Utility/apiPath"; 

export const UserContext = createContext(null);

function UserProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isLogin,setIsLogin] = useState(false);

    useEffect(()=>{
        if(user) return;

        const accessToken = localStorage.getItem("token");

        if(!accessToken){
            setLoading(false);
            return; 
        }

        const fetchUser = async () => {
            try{
                setLoading(true);
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data.user.name);
                console.log(response); 
            }catch(error){
                console.error("User not authenticated",error);
                setUser("Guest")
            }finally{
                setLoading(false);
            }
        }

        fetchUser();
    },[])

    function updateUser(userData){
        setUser(userData.name);
        localStorage.setItem("token",userData.token);
        setLoading(false);
        return;
    }

    function clearUser(){
        setUser(null);
        localStorage.removeItem("token")
        return;
    }

    return(
        <UserContext.Provider value={{user,loading,clearUser,updateUser,isLogin,setIsLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;