import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import useAuth from '../../Hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import DynamicLoading from '../Loading/Loading';

const Login = () => {

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { loginUser, logInWithGoogle, setLoading, loading } = useAuth();

  // ---------------- NORMAL LOGIN ----------------
  const handleLogin = async (data) => {
    setError('');
    try {
      await loginUser(data.email, data.password);
      reset();
      navigate(location.state || '/');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // ---------------- DEMO LOGIN ----------------
  const handleDemoLogin = async (role) => {
    setError('');
    setLoading(true);

    const demoCredentials =
      role === 'admin'
        ? {
            email: 'asif1@gmail.com',
            password: 'Asif1!',
          }
        : {
            email: 'Rakib25@gmail.com',
            password: 'Rakib1',
          };

    try {
      await loginUser(
        demoCredentials.email,
        demoCredentials.password
      );
      navigate('/');
    } catch (err) {
      setError("Demo login failed");
      setLoading(false);
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const HandleGoogle = async () => {
    await logInWithGoogle();
    navigate(location.state?.from?.pathname || '/');
  };

  if (loading) {
    return <DynamicLoading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: .95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .7, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="
          w-full max-w-md bg-white rounded-2xl p-8 
          shadow-[0_0_70px_-10px_rgba(255,0,150,0.4),0_0_70px_-10px_rgba(0,120,255,0.4)]
          relative
        "
      >

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl
          bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 
          opacity-30 blur-[60px] -z-10">
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .3 }}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="text-sm">
              Dont have an account?
              <Link
                to='/auth/register'
                state={location.state}
                className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
                bg-clip-text text-transparent font-medium hover:underline ml-1"
              >
                Join now
              </Link>
            </p>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .5 }}
            className="flex flex-col gap-2 mb-5"
          >
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Email address"
              className="border rounded-lg px-4 py-2 outline-none 
              focus:ring-2 focus:ring-black duration-300"
            />
          </motion.div>
          {errors.email && <p className="text-red-500 mb-2">Email is required</p>}

          {/* PASSWORD */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .6 }}
            className="flex relative flex-col gap-2 mb-4"
          >
            <div className="flex justify-between text-sm font-medium">
              <label>Password</label>
              <Link to='/auth/forgotpassword' className="hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type={show ? 'text' : 'password'}
              {...register('password', { required: true })}
              placeholder="Password"
              className="border rounded-lg px-4 py-2 outline-none 
              focus:ring-2 focus:ring-black duration-300"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-9 right-4"
            >
              {show ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </motion.div>
          {errors.password && <p className="text-red-500 mb-2">Password is required</p>}

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm font-semibold mb-3">
              {error}
            </p>
          )}

          {/* SIGN IN */}
          <motion.button
            whileTap={{ scale: .95 }}
            className="w-full py-2 bg-black text-white rounded-lg 
            text-sm font-medium"
          >
            Sign in
          </motion.button>

          {/* DIVIDER */}
          <div className="my-5 border-b w-full opacity-30"></div>

          {/* DEMO LOGIN BUTTONS */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="w-1/2 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:opacity-90"
            >
              Demo User
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="w-1/2 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:opacity-90"
            >
              Demo Admin
            </button>
          </div>

          {/* GOOGLE LOGIN */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .7 }}
            type="button"
            onClick={HandleGoogle}
            className="w-full py-2 border rounded-lg flex items-center 
            justify-center gap-2 text-sm font-medium hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5"
            />
            Sign in with Google
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;
