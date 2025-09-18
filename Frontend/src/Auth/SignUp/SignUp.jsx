import Input from "../../Input/Input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";
import Preview from "../../PhotoPreview/Preview";
import { isValidEmail } from "../../Helper/validate";
import { axiosInstance } from "../../Utility/axiosInstance";
import { API_PATHS } from "../../Utility/apiPath";
import { UserContext } from "../../Context/UserProvider";
import { useContext } from "react";
import Spinner from "../../Spinner/SpinnerLoader";
import toast from "react-hot-toast";

function SignUp({ handleModalClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [passwordToggleEye, setPasswordToggleEye] = useState(false);
  const [conPasswordToggleEye, setConPasswordToggleEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLogin } = useContext(UserContext);

  const navigate = useNavigate();

  // toggle show/hide password
  function handlePasswordToggleChange() {
    setPasswordToggleEye((prev) => !prev);
  }
  function handleConPasswordToggleChange() {
    setConPasswordToggleEye((prev) => !prev);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // basic validation
    if (!name) {
      setError("Please provide name");
      setIsError(true);
      return;
    }

    if (!email) {
      setError("Please provide email");
      setIsError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please provide a valid email");
      setIsError(true);
      return;
    }

    if (!password) {
      setError("Please provide password");
      setIsError(true);
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm password");
      setIsError(true);
      return;
    }

    if (confirmPassword !== password) {
      setError("Both passwords should be equal");
      setIsError(true);
      return;
    }

    try {
      setIsLoading(true);
      const signUpCredentials = { name, email, password };

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        signUpCredentials
      );

      const { token } = response.data;

      if (token && response && response.data) {
        localStorage.setItem("token", token);
        
        handleModalClose();
        toast.success(response.data.message);
        navigate("/dashboard");
      }

      setIsLoading(false);

      // reset fields
      setName("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data.message) {
        setIsError(true);
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin() {
    setIsLogin(true);
  }

  return (
    <>
      <section className="h-auto w-auto flex">
        <section className="flex items-center justify-center w-full">
          <section className="w-full">
            <div className="text-center mb-2 font-bold text-2xl">
              <h1 className="text-blue-600">Sign Up</h1>
            </div>

            <div className="my-4 flex items-center justify-center">
              <Preview />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
              autoComplete="off"
            >
              <Input
                text="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <Input
                text="text"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <div className="relative flex items-center">
                <Input
                  text={passwordToggleEye ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div
                  onClick={handlePasswordToggleChange}
                  className="absolute right-2 cursor-pointer"
                >
                  {passwordToggleEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </div>
              </div>

              <div className="relative flex items-center">
                <Input
                  text={conPasswordToggleEye ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <div
                  onClick={handleConPasswordToggleChange}
                  className="absolute right-2 cursor-pointer"
                >
                  {conPasswordToggleEye ? (
                    <HiOutlineEye />
                  ) : (
                    <HiOutlineEyeOff />
                  )}
                </div>
              </div>

              {/* error message */}
              {isError && <div className="text-red-500">{error}</div>}

              <button
                type="submit"
                disabled={isLoading}
                className="border w-full py-3 rounded-xl bg-blue-500 text-white mt-2 hover:bg-blue-600 cursor-pointer transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span>Signing up...</span>
                  </div>
                ) : (
                  "Signup"
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
                Already have an account?{" "}
                <button
                  className="decoration-2 decoration-blue-500 underline cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </p>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default SignUp;
