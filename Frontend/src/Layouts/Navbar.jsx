import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import Modals from "../Modal/Modals";
import { UserContext } from "../Context/UserProvider";
import { useContext } from "react";

function Navbar() {
    const {user} = useContext(UserContext);
  return (
    <>
      <section className="border border-gray-400 bg-white py-2">
        <section>
          <section className="flex items-center justify-between w-[80%] m-auto pt-5">
            <div>
              <h1 className="text-2xl">AI Interview Prep.</h1>
            </div>

            <div>{user ? <UserProfile /> : <Modals />}</div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Navbar;
