import React, { useState } from "react";
import Input from "../../Input/Input";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";
import { isValidEmail } from "../../Helper/validate";
import { axiosInstance } from "../../Utility/axiosInstance";
import { API_PATHS } from "../../Utility/apiPath";
import { useContext } from "react";
import { UserContext } from "../../Context/UserProvider";
import Spinner from "../../Spinner/SpinnerLoader";
import toast from "react-hot-toast";

function Login({ handleModalClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
  const { setIsLogin } = useContext(UserContext);

  const navigate = useNavigate();

  // toggle show/hide password
  function handleToggleEye() {
    setToggleEye((prev) => !prev);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // validation
    if (!email) {
      setIsError(true);
      setError("Please enter email");
      return;
    }

    if (!isValidEmail(email)) {
      setIsError(true);
      setError("Please enter valid email");
      return;
    }

    if (!password) {
      setIsError(true);
      setError("Please enter password");
      return;
    }

    try {
      setIsLoading(true);

      const loginCredentials = { email, password };
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        loginCredentials
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (response && response.data) {
        toast.success(response.data.message);
        handleModalClose();
        setIsLoading(false);
        navigate("/dashboard");
      }

      // reset fields
      setEmail("");
      setPassword("");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data.message) {
        setIsError(true);
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignup() {
    setIsLogin(false);
  }

  return (
    <>
      <section className="w-full flex justify-center items-center flex-col">
        <section className="w-full h-auto py-2">
          <div className="text-blue-500 text-2xl font-bold text-center mb-5">
            <h1>Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              text="text"
              placeholder="Enter Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />

            <div className="relative items-center">
              <Input
                text={toggleEye ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <div
                onClick={handleToggleEye}
                className="absolute top-[35%] right-2 cursor-pointer"
              >
                {toggleEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
              </div>
            </div>

            {/* error message */}
            {isError && <div className="text-red-500">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="border w-full py-3 rounded-xl my-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center py-3">
            <p>OR</p>
          </div>

          <div className="pb-2">
            <button className="flex items-center justify-center gap-2 border py-3 w-full rounded-xl bg-gray-200 border-none text-gray-500 cursor-pointer">
              <IoLogoGoogle className="text-xl" /> Continue with Google
            </button>
          </div>

          <div>
            <p>
              Don&apos;t have an account?{" "}
              <button
                className="decoration-2 underline decoration-blue-500 cursor-pointer"
                onClick={handleSignup}
              >
                Signup
              </button>
            </p>
          </div>
        </section>
      </section>
    </>
  );
}

export default Login;
