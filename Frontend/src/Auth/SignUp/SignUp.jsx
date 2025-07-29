import Input from "../../Input/Input";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";
import Preview from "../../PhotoPreview/Preview";
import {isValidEmail} from "../../Helper/validate";
import {axiosInstance} from "../../Utility/axiosInstance";
import { API_PATHS } from "../../Utility/apiPath";

function SignUp({handleModalClose}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");
  const [passwordToggleEye, setPasswordToggleEye] = useState(false);
  const [conPasswordToggleEye, setConPasswordToggleEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePasswordToggleChange() {
    setConPasswordToggleEye((prev) => !prev);
  }
  function handleConPasswordToggleChange() {
    setConPasswordToggleEye((prev) => !prev);
  }

  async function handleSubmit(event){
    event.preventDefault();

    if(!name){
      setError("Please give name");
      setIsError(true);
      return;
    }

    if(!email){
      setError("Please give email");
      setIsError(true);
      return;
    }

    if(!isValidEmail(email)){
      setError("Please give valid email");
      setIsError(true);
      return;
    }

    if(!password){
      setError("Please give password");
      setIsError(true);
      return;
    }

    if(!confirmPassword){
      setError("Please give confirm password");
      setIsError(true);
      return;
    }

    if(confirmPassword !== password){
      setError("Both password should be equal");
      setIsError(true);
      return;
    }

    try{
      setIsLoading(true);
      const signUpCredentials = {
        name,
        email,
        password
      }

      console.log(signUpCredentials);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,signUpCredentials);

      const {token} = response.data;

      if(token && response && response.data){
        localStorage.setItem("token",token);
        updateUser(response.data);
        handleModalClose();
        alert(response.data.message);
        navigate("/dashboard");

      }

      setIsLoading(false);

      setName("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    }
    catch(error){
      if(error.response && error.response.data.message){
        setIsError(true);
        setError(error.response.data.message);
        console.log(error);
      }
      else{
        setError("Something went wrong please try again later");
      }
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <section className="h-auto w-auto flex">
        <section className="flex items-center justify-center w-full">
          <section className="w-full">
            <div className="text-center mb-2 font-bold text-2xl">
              <h1 className="text-sky-600">SignUp</h1>
            </div>
            <div className="my-4 flex items-center justify-center">
              <Preview/>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Input
                  text="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  text="text"
                  placeholder="Enter email "
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="relative flex items-center">
                <Input
                  text={passwordToggleEye ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <div
                  onClick={handlePasswordToggleChange}
                  className="absolute right-2"
                >
                  {passwordToggleEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </div>
              </div>
              <div className="relative flex items-center">
                <Input
                  text={conPasswordToggleEye ? "text" : "password"}
                  placeholder="Enter Confirm password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
                <div
                  onClick={handleConPasswordToggleChange}
                  className="absolute right-2"
                >
                  {conPasswordToggleEye ? (
                    <HiOutlineEye />
                  ) : (
                    <HiOutlineEyeOff />
                  )}
                </div>
              </div>
            </div>
            <div className="text-red-500">{isError && error}</div>
            <div>
              <button
              onClick={handleSubmit}
              className="border w-full py-3 rounded bg-sky-500 text-white mt-2 hover:bg-sky-600 cursor-pointer transition-all duration-200"
              >{isLoading ? "SingingUp.." : "signup"}</button>
            </div>
            <div className="text-center py-3">
              <p>OR</p>
            </div>
            <div className="pb-2">
              <button className="flex items-center justify-center gap-2 border py-3 w-full rounded bg-gray-200 border-none text-gray-500 cursor-pointer"><IoLogoGoogle className="text-xl"/> Continue with Google</button>
            </div>
            <div>
              <p>
                Aldready have an account ? <Link to="/login" className="text-sky-600">login</Link>
              </p>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default SignUp;
