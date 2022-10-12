import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AUTH_LOGIN, HOME } from "../apis";
import userAuth from "../context/Authcontext";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    repeat_password: yup.string().oneOf([yup.ref("password"), null]),
  })
  .required();

const Signup = () => {
  const { user, signUp } = userAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const passwordInputIcon = passwordVisible ? <BsEyeSlash /> : <BsEye />;
  const inputType = passwordVisible ? "text" : "password";

  const handleSignUp = async ({ email, password }) => {
    console.log("handle signup");
    setIsSubmitting(true);
    try {
      await signUp(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate(HOME, { replace: true });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="  bg-gray-200 h-screen flex items-center">
      <div className="container mx-auto w-[500px] shadow-lg p-8 bg-white">
        <h1 className="text-3xl font-semibold text-center uppercase text-slate-700">
          Sign up
        </h1>
        <p className="text-darkGray font-medium text-2xl text-center mt-6 text-slate-500">
          Fill Your Account Details
        </p>
        {errorMessage && (
          <div
            className="w-full bg-red-100 text-red-700 border border-red-400 rounded py-3 px-4 mt-4"
            role="alert"
          >
            <span className="font-bold">Faild! </span>
            <span>{errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(handleSignUp)}>
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
                type="email"
                placeholder="Enter your email"
                className=" w-full rounded-[10px] border border-gray focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:bg-gray-100 placeholder:text-darkGray px-3 py-2"
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
            <div className="mt-3 flex justify-between w-full rounded-[10px] border border-gray  focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300 focus-within:bg-gray-100 px-3 py-2 items-center">
              <input
                name="password"
                {...register("password")}
                id="password"
                type={inputType}
                placeholder="At least 8 characters"
                className="  placeholder:text-darkGray w-full focus:outline-none focus:bg-gray-100"
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
          <div className="mt-6">
            <label
              htmlFor="confirm password"
              className="after:content-['*'] after:ml-0.5 after:text-red-500 flexblock font-medium"
            >
              Confirm Password
            </label>
            <div className="mt-3 flex justify-between w-full rounded-[10px] border border-gray  focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300 focus-within:bg-gray-100 px-3 py-2 items-center">
              <input
                name="repeat_password"
                {...register("repeat_password")}
                id="confirm password"
                type={inputType}
                placeholder="At least 8 characters"
                className="  placeholder:text-darkGray w-full focus:outline-none focus:bg-gray-100"
              />
              <span
                className="cursor-pointer"
                onClick={() => setPasswordVisibility(!passwordVisible)}
              >
                {passwordInputIcon}
              </span>
            </div>
            {errors.repeat_password && (
              <p className="text-red-700">Passwords do not match</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-[10px] bg-indigo-500 text-white text-xl w-full py-3 mt-6"
          >
            {isSubmitting ? "Submitting..." : "Sign up"}
          </button>
          <p className="text-lg mt-6">
            Already have an account ?
            <span className="text-indigo-500 hover:underline">
              <Link to={AUTH_LOGIN}> Sign in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
