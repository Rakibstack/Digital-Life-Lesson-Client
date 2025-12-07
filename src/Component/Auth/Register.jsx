import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const Register = () => {

    const { register, handleSubmit, formState:{errors} } = useForm()

    const handleRegister = (data) => {
        console.log(data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-4 pt-8">

            {/* 🔥 Main Card with Smooth Motion */}
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

                {/* 🔥 Gradient Background (unchanged) */}
                <div className="absolute inset-0 rounded-2xl
                    bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-30 blur-[60px] -z-10">
                </div>

                <form onSubmit={handleSubmit(handleRegister)}>

                    {/* Header Motion */}
                    <motion.div
                        initial={{opacity:0, y:-15}}
                        animate={{opacity:1, y:0}}
                        transition={{delay:.3}}
                        className="flex justify-between items-center mb-6"
                    >
                        <h2 className="text-2xl font-semibold">Sign up</h2>
                        <p className="text-sm ml-1">
                            Already have an account?
                            <Link to='/auth/login' className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
                            bg-clip-text text-transparent font-medium hover:underline ml-1">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>

                    {/* Name Input */}
                    <motion.div
                        initial={{opacity:0, x:-25}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:.35}}
                        className="flex flex-col gap-2 mb-5"
                    >
                        <label className="text-sm font-medium">Name</label>
                        <input type="text"
                            {...register('name',{required:true})}
                            placeholder="Type Your Name"
                            className="border rounded-lg px-4 py-2 outline-none 
                            focus:ring-2 focus:ring-black duration-300"
                        />
                    </motion.div>
                    {errors.name && <p className="text-red-500 mb-2">Name is Required</p>}

                    {/* Photo */}
                    <motion.div
                        initial={{opacity:0, x:25}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:.45}}
                        className="flex flex-col gap-2 mb-5"
                    >
                        <label className="text-sm font-medium">Photo</label>
                        <input type="file"
                            {...register('photo',{required:true})}
                            className="border rounded-lg px-4 py-2 outline-none 
                            focus:ring-2 focus:ring-black duration-300"
                        />
                    </motion.div>
                    {errors.photo && <p className="text-red-500 mb-2">Photo is Required</p>}

                    {/* Email */}
                    <motion.div
                        initial={{opacity:0, x:-25}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:.55}}
                        className="flex flex-col gap-2 mb-5"
                    >
                        <label className="text-sm font-medium">Email</label>
                        <input type="email"
                            {...register('email',{required:true})}
                            placeholder="Email address"
                            className="border rounded-lg px-4 py-2 outline-none 
                            focus:ring-2 focus:ring-black duration-300"
                        />
                    </motion.div>
                    {errors.email && <p className="text-red-500 mb-2">Email is Required</p>}

                    {/* Password */}
                    <motion.div
                        initial={{opacity:0, x:25}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:.65}}
                        className="flex flex-col gap-2 mb-4"
                    >
                        <label className="text-sm font-medium">Password</label>
                        <input type="password"
                            {...register('password',{required:true})}
                            placeholder="Password (min. 6 character)"
                            className="border rounded-lg px-4 py-2 outline-none 
                            focus:ring-2 focus:ring-black duration-300"
                        />
                    </motion.div>
                    {errors.password && <p className="text-red-500 mb-2">Password is Required</p>}

                    {/* Submit Button */}
                    <motion.button
                        whileTap={{scale:.95}}
                        className="w-full py-2 bg-black text-white rounded-lg 
                        text-sm font-medium"
                    >
                        Sign up
                    </motion.button>

                    {/* Divider */}
                    <div className="my-5 border-b w-full opacity-30"></div>

                    {/* Google Login */}
                    <motion.button
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:.75}}
                        className="w-full py-2 border rounded-lg flex items-center 
                        justify-center gap-2 text-sm font-medium hover:bg-gray-100 duration-200"
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5"/>
                        Sign in with Google
                    </motion.button>

                </form>

            </motion.div>
        </div>
    );
};

export default Register;
