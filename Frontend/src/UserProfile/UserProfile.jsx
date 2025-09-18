import { useContext } from "react"
import { UserContext } from "../Context/UserProvider"
import Gamer from "../assets/man.png";
import { useNavigate } from "react-router-dom";
function UserProfile(){

    const {user,clearUser} = useContext(UserContext)
    const navigate = useNavigate();

    function logout(){
        localStorage.clear();
        clearUser();
        navigate("/");
    }

    return(<>
        <section>
            <section className="flex items-center justify-between gap-3">
                <section>
                    <div>
                        <img src={Gamer} alt="" className="h-12 w-12 rounded-full"/>
                    </div>
                </section>
                <section>
                    <div>
                        <p>{user}</p>
                    </div>
                    <div>
                        <button className="cursor-pointer border rounded-xl px-2 text-white border-none bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-500 transition-all text-[15px] py-1" onClick={logout}>Logout</button>
                    </div>
                </section>
            </section>
        </section>
    </>)
}

export default UserProfile