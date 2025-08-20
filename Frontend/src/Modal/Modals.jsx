import React, { useState } from "react";
import Modal from "react-modal";
import SignUp from "../Auth/SignUp/SignUp";
import { IoClose } from "react-icons/io5";
import Login from "../Auth/Login/Login";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

Modal.setAppElement("#root");

function Modals() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isLogin, setIsLogin } = useContext(UserContext);

  function handleModalClose() {
    setModalIsOpen((prev) => !prev);
  }

  function handleModalLogin() {
    setIsLogin(true);
    setModalIsOpen(true);
  }

  function handleModalSignUp() {
    setIsLogin(false);
    setModalIsOpen(true);
  }

  return (
    <>
      {/* <button onClick={() => setModalIsOpen(true)}>Open Modal</button> */}
      <div className="flex gap-1">
        <button
          onClick={handleModalLogin}
          className="border bg-blue-500 text-white p-2 cursor-pointer rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-1"
        >
          <CgLogIn className="text-xl" />
          <span className="text-[15px]">Login</span>
        </button>
        <button
          onClick={handleModalSignUp}
          className="border bg-blue-500 text-white p-2 cursor-pointer rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-1"
        >
          <FaRegUser />
          <span className="text-[15px]">Signup</span>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", 
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
            height: "auto",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            inset: "unset", 
          },
        }}
      >
        {isLogin ? (
          <Login handleModalClose={handleModalClose} />
        ) : (
          <SignUp handleModalClose={handleModalClose} />
        )}
        <IoClose
          className="absolute top-5 right-4 text-2xl text-gray-500 cursor-pointer"
          onClick={handleModalClose}
        />
      </Modal>
    </>
  );
}

export default Modals;
