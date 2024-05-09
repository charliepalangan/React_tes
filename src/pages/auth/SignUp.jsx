import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useMutation } from "react-query";
import { registerCustomer } from "../../api/auth/auth_query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation(registerCustomer, {
    onSuccess: (res) => {
      console.log("data : ", res?.data);
      if (res.data == undefined) {
        console.log("error : ", res.response);
        toast.error(res.response.data.message); 
      } else {
        toast.success("Register Berhasil");
        navigate("/auth/signin");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    if (data.Password != data.Password_confirm) {
      toast.error("Password tidak sama");
      return;
    }
    const dataSend = {
      Nama: data.Nama,
      Email: data.Email,
      Password: data.Password,
    };

    mutation.mutate(dataSend);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 w-96 mx-auto">
        <div className="text-center">
          <img src={Logo} alt="logo" className="w-40 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-center mb-4">Sign Up</div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Nama</span>
          </div>
          <input
            type="text"
            placeholder="Type your name here"
            className="input input-bordered w-full"
            required
            {...register("Nama", { required: true })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="type your email here"
            placeholder="Type your email here"
            className="input input-bordered w-full"
            required
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="text"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            required
            {...register("Password", { required: true })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold"> Confirm Password</span>
          </div>
          <input
            type="text"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            required
            {...register("Password_confirm", { required: true })}
          />
        </label>

        <div className="mt-4">
          <button className="btn btn-primary w-full text-white">Sign Up</button>
        </div>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" relative="path" className="text-primary">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
