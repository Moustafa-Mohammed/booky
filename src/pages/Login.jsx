import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { AUTH_SIGNUP, HOME } from "../apis";
import userAuth from "../context/Authcontext";
import Button from "../components/Button";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();

  const { login, signInWithGoogle, user } = userAuth();

  // react hook form helpers
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // states
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const passwordInputIcon = passwordVisible ? <BsEyeSlash /> : <BsEye />;
  const inputType = passwordVisible ? "text" : "password";

  const handleLogin = async ({ email, password }) => {
    setIsLogging(true);
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
    setIsLogging(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(HOME);
    }
  }, [user]);

  return (
    <>
      <div className=" h-screen flex items-center p-2">
        <div className=" mx-auto w-[500px] shadow-lg p-3 sm:p-6 md:p-8 bg-white">
          <h1 className="text-3xl font-semibold text-center uppercase text-slate-700">
            Log in
          </h1>
          <p className="text-slate-500 font-medium text-2xl text-center mt-6">
            Login Into Your Account
          </p>
          {errorMessage && (
            <div
              className=" w-full bg-red-100 text-red-700 border border-red-400 py-3 px-4 my-4"
              role="alert"
            >
              <span className="font-bold">Faild! </span>
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mt-6">
              <label
                htmlFor="email"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium mt-6"
              >
                Email
              </label>
              <div className="mt-3">
                <input
                  name="email"
                  {...register("email")}
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  className=" w-full rounded-[10px] border border-gray-200 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700 focus:bg-gray-100 placeholder:text-gray-500 px-3 py-2"
                />
              </div>
              <p className="text-red-700">{errors.email?.message}</p>
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium"
              >
                Password
              </label>
              <div className="mt-3 flex justify-between w-full rounded-[10px] border border-gray  focus-within:border-primary-700 focus-within:ring-1 focus-within:ring-primary-700 focus-within:bg-gray-100 px-3 py-2 items-center">
                <input
                  name="password"
                  {...register("password")}
                  id="password"
                  type={inputType}
                  placeholder="At least 8 characters"
                  className="  placeholder:text-gray-500 w-full focus:outline-none focus:bg-gray-100"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => setPasswordVisibility(!passwordVisible)}
                >
                  {passwordInputIcon}
                </span>
              </div>
              <p className="text-red-700">{errors.password?.message}</p>
            </div>

            <div className="sm:grid sm:gap-1 sm:grid-cols-2 my-2">
              <Button
                type="submit"
                primary
                className="py-3 shadow-[rgba(0, 0, 0, 0.25) 0px 2px 4px 0px]"
              >
                {isLogging ? "Logging in..." : "Log in"}
              </Button>
              <Button type="button" onClick={handleGoogleSignIn}>
                <FcGoogle /> <span className="ml-2">Sign in with Google</span>
              </Button>
            </div>

            <p className="text-lg mt-10">
              Do not have an account?
              <span className="text-primary-500 hover:underline">
                <Link to={AUTH_SIGNUP} className="text-indigo-600  ml-1">
                  Sign up
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
