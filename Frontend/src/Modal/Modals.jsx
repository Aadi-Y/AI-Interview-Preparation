import React, { useState } from 'react';
import Modal from "react-modal";
import SignUp from '../Auth/SignUp/SignUp';
import { IoClose } from "react-icons/io5";
import Login from "../Auth/Login/Login"

Modal.setAppElement('#root');

function Modals() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [login,setLogin] = useState(false);

  function handleModalClose() {
    setModalIsOpen(prev => !prev);
  }

  function handleModalLogin(){
    setLogin(true);
    setModalIsOpen(true);
  }

  function handleModalSignUp(){
    setLogin(false);
    setModalIsOpen(true);
  }

  return (
    <>
      {/* <button onClick={() => setModalIsOpen(true)}>Open Modal</button> */}
      <button onClick={handleModalLogin} className="border bg-sky-500 text-white p-2 cursor-pointer rounded">Login</button>
      <button onClick={handleModalSignUp} className="border bg-sky-500 text-white p-2 cursor-pointer rounded">SignUp</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          content: {
            width: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            height: "auto", 
            maxHeight: "90vh", 
            overflowY: "auto", 
            position: "relative"
          }
        }}
      >
        {
          login ? <Login handleModalClose={handleModalClose}/> : <SignUp handleModalClose={handleModalClose}/>
        }
        <IoClose
          className="absolute top-5 right-4 text-2xl text-gray-500 cursor-pointer"
          onClick={handleModalClose}
        />
      </Modal>
    </>
  );
}

export default Modals;
