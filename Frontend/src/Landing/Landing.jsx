import React, { useContext } from "react";
import Modals from "../Modal/Modals";
import UserProfile from "../UserProfile/UserProfile";
import {API_PATHS} from "../Utility/apiPath"
import {BASE_URL} from "../Utility/apiPath"
import { UserContext } from "../Context/UserProvider";
import Navbar from "../Layouts/Navbar";

function Landing() {
  const {user} = useContext(UserContext);
  console.log(BASE_URL);
  return (
    <>
    <Navbar/>
    </>
  );
}

export default Landing;
