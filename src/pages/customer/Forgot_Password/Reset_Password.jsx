import React, { useState } from 'react';
import Logo from "../../../assets/logo.png";
import croisant from "../../../assets/croisant.jpg";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../api/forgot_password/reset_password_query";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false); 
  const mutation = useMutation(resetPassword);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {

      const email = location.state.email;

    
      const password = data.password;
      const password_confirmation = data.password_confirmed;
     
      console.log(email);
      console.log(password);
      console.log(password_confirmation);

      const formData = { email, password, password_confirmation };
      const response = await mutation.mutateAsync( formData );
      if (response.success) {
        toast.success("Anda berhasil mengubah password Anda!");
        navigate("/auth/signin");
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
          <div className="text-2xl font-bold text-center mb-4 mt-1">Change Password</div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text font-bold">Password</span>
              </div>
              <input
                type="password"
                placeholder="Type your password here"
                className="input input-bordered w-full"
                {...register("password", { required: true })} 
              />
           
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold mt-2">Confirmed Password</span>
              </div>
              <input
                type="password"
                placeholder="Type again your password here"
                className="input input-bordered w-full"
                {...register("password_confirmed", { required: true })} 
              />
            
            </label>
            <div className="mt-5">
              <button className="btn btn-primary w-full text-white relative mt-2" type="submit" disabled={isLoading}>
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="spinner-border h-5 w-5 text-white" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
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

export default ResetPassword;