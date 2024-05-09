import React, { useState } from 'react';
import Logo from "../../../assets/logo.png";
import croisant from "../../../assets/croisant.jpg";
import { useForm } from 'react-hook-form';
import { verifyOTP } from '../../../api/forgot_password/verify_pin_query';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOTP = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation(verifyOTP);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {

      const email = location.state.email;
      const token = Object.values(data).join(''); 
     
      console.log(token);

      const formData = { email, token };
      const response = await mutation.mutateAsync( formData );
      if (response.success) {
        toast.success("OTP Valid, Anda bisa mereset password!");
        navigate("/reset-password", { state: { email: email } });
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
          <div className="text-2xl font-bold text-center mb-4 mt-1">Verify OTP</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center space-x-2 mt-2">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="input input-bordered text-center w-12"
                  required
                  {...register(`digit${index}`, { required: true, pattern: /^\d+$/ })}
                />
              ))}
            </div>
            <div className="mt-5">
              <button className="btn btn-primary w-full text-white relative" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Verify'}
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

export default VerifyOTP;
