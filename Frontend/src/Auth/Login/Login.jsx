import React from "react";
import Input from "../../Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";
import { isValidEmail } from "../../Helper/validate";
import {axiosInstance} from "../../Utility/axiosInstance";
import { API_PATHS } from "../../Utility/apiPath";

function Login({handleModalClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setIsError(true);
      setError("Please Enter Email");
      return;
    }

    if(!isValidEmail(email)){
      setIsError(true);
      setError("Please Enter Valid Email");
      return;
    }

    if (!password) {
      setIsError(true);
      setError("Please Enter Password");
      return;
    }

    try {
      const loginCredentials = {
        email,
        password,
      };

      console.log(loginCredentials);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,loginCredentials);

      console.log(response);

      const {token} = response.data;
      
      if(token){
        localStorage.setItem("token",token);
        navigate("/");
      }
      
      if(response && response.data){
        alert(response.data.message);
        handleModalClose();
        navigate("/dashboard");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      if(error.response && error.response.data.message){
        setIsError(true);
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong please try again");
      }
    }
  }

  function handleToggleEye() {
    setToggleEye((prev) => !prev);
  }

  const navigate = useNavigate();
  return (
    <>
      {/* <section className="h-auto w-auto flex"> */}
      <section className="w-full flex justify-center items-center flex-col">
        <section className="w-full h-auto py-2">
          <div className="text-sky-600 text-2xl font-bold text-center mb-2">
            <h1>Login</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Input
                text="text"
                placeholder="Enter Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </div>

            <div className="relative items-center">
              <Input
                text={toggleEye ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
              <div
                onClick={handleToggleEye}
                className="absolute top-[40%] right-2"
              >
                {toggleEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
              </div>
            </div>
          </div>
          <div className="text-red-500">{isError && error}</div>
          <div>
            <button
              onClick={handleSubmit}
              className="border w-full py-3 rounded my-2 bg-sky-500 text-white cursor-pointer hover:bg-sky-600 transition-all duration-200"
            >
              {isLoading ? "LogingIn" : "Login"}
            </button>
          </div>
          <div className="text-center py-3">
            <p>OR</p>
          </div>
          <div className="pb-2">
            <button className="flex items-center justify-center gap-2 border py-3 w-full rounded bg-gray-200 border-none text-gray-500 cursor-pointer">
              <IoLogoGoogle className="text-xl" /> Continue with Google
            </button>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
                SignUp
              </Link>
            </p>
          </div>
        </section>
      </section>
      {/* </section> */}
    </>
  );
}

export default Login;
