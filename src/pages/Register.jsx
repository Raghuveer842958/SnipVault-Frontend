import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "sonner";

import { useRegisterMutation } from "../api/authApi";

import { setCredentials } from "../features/authSlice";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [registerUser, { isLoading }] =
    useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(
        formData
      ).unwrap();

      dispatch(
        setCredentials(response.user)
      );

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card bg-base-100 shadow-xl w-full max-w-md">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center mb-6">
            Register
          </h2>

          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={changeHandler}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={changeHandler}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={changeHandler}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading
                ? "Creating Account..."
                : "Register"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary"
            >
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;