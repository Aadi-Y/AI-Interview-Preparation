import React, { useContext } from "react";
import UserProfile from "../UserProfile/UserProfile";
import Modals from "../Modal/Modals";
import { UserContext } from "../Context/UserProvider";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 
                   shadow-sm z-20"
      >
        <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between py-3">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
            AI Interview Prep
          </h1>

          <div>{user ? <UserProfile /> : <Modals />}</div>
        </div>
      </nav>

      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
