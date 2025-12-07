import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const ForgotPass = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { forgotPassword } = useAuth();

    const HandleReset = (data) => {
        forgotPassword(data.email)
            .then(() => {
                // console.log('send');
                
                Swal.fire({
                    title: "Success",
                    text: "Reset link sent to your email!",
                    icon: "success"
                });
            })
            .catch((err) => {
                 Swal.fire({
                title: "Failed",
                text: err.message || "Something went wrong, try again.",
                icon: "error",
            });
            })
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#eef1ff] p-6 relative overflow-hidden">

            {/* Soft Gradient Halo Background */}
            <div className="absolute w-[450px] h-[450px] rounded-full blur-[170px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-40 top-10 left-10"></div>
            <div className="absolute w-[350px] h-[350px] rounded-full blur-[150px] bg-gradient-to-tl from-blue-500 via-cyan-400 to-purple-500 opacity-30 bottom-10 right-10"></div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: .95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .7 }}
                className="w-full max-w-md p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_0_80px_-10px_rgba(125,95,255,0.5)] relative"
            >

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-gray-800 text-center"
                >
                    Reset Your Password 🔐
                </motion.h2>

                <p className="text-sm text-gray-500 text-center mt-1 mb-6">
                    Enter your email — We’ll send reset instructions
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(HandleReset)}>

                    {/* Input */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: .3 }}
                        className="flex flex-col gap-2 mb-4"
                    >
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="example@email.com"
                            className="border rounded-lg px-4 py-2 outline-none 
                            duration-300 focus:ring-2 focus:ring-violet-500"
                        />
                    </motion.div>

                    {errors.email && <p className="text-xs text-red-500 -mt-2 mb-3">Email is required</p>}

                    {/* Submit Button */}
                    <motion.button
                        whileTap={{ scale: .94 }}
                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg hover:opacity-90 duration-300"
                    >
                        Send Reset Link
                    </motion.button>

                    {/* Back to Login */}
                    <div className="text-center mt-4">
                        <a href="/auth/login" className="text-sm text-violet-600 hover:underline">
                            ← Back to Sign in
                        </a>
                    </div>
                </form>

            </motion.div>
        </div>
    );
};

export default ForgotPass;
