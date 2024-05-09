import React, { useState } from 'react';
import Logo from "../../../assets/logo.png";
import croisant from "../../../assets/croisant.jpg";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../../api/forgot_password/forgot_password_query";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false); 
  const mutation = useMutation(forgotPassword);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true); 
    try {
      const response = await mutation.mutateAsync(data);
      if (response.success) {
        toast.success("Kami telah mengirimkan 6 digit OTP ke email Anda!");
        console.log(data.email);
        navigate("/verify-otp", { state: { email: data.email } });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="md:w-1/2 w-full flex justify-center items-center">
        <div className="card w-80 mx-auto">
          <div>
            <img src={Logo} alt="logo" className="w-40 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-center mb-4 mt-1">Forgot Password</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Email</span>
              </div>
              <input
                type="text"
                placeholder="Type your email here"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
            </label>
            <div className="mt-5">
              <button className="btn btn-primary w-full text-white relative" type="submit" disabled={isLoading}>
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center">
                  </div>
                )}
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:w-1/2 md:inline-flex md:relative -z-10">
        <img src={croisant} alt="croissant" className="w-full h-full object-cover" />
        <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-white to-transparent w-full"></div>
        <div className="absolute top-0 right-0 h-full bg-gradient-to-r from-white to-transparent w-full"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
