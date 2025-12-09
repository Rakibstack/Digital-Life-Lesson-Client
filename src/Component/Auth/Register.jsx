import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import useAuth from '../../Hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
const Register = () => {

    const {createUser,logInWithGoogle,updateUserProfile} = useAuth();
    const [show, setShow] = useState(false)
    const axiosInstance = useAxios()
    const location = useLocation()
    const navigate = useNavigate()   
    


    const { register, handleSubmit, formState:{errors} } = useForm()

    const handleRegister = (data) => {

        const profileImage = data.photo[0]

        createUser(data.email,data.password)
        .then(() => {

            const formData = new FormData()
            formData.append('image',profileImage)

            axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,formData)
            .then(res => {

                const updateProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                const userInfo = {
                    name:data.name,
                    email:data.email,
                    photo:res.data.data.url,
                }
                updateUserProfile(updateProfile)
                .then(

                axiosInstance.post('/users',userInfo)
                .then(res => {
                    console.log(res.data);
                    
                })

                )
                .catch(error => console.log(error)
                )             
            })

            navigate(location.state || '/')      
        })
        .catch(error => {
            console.log(error);         
        })
    }

    const HandleGoogle = () => {

        logInWithGoogle()
        .then(result => {

            const user = result.user
              const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };

            axiosInstance.post('/users',userInfo)
            .then()
        })
     navigate(location.state || '/')   
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-4 pt-8">

            {/* Main Card with Smooth Motion */}
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

                {/*  Gradient Background (unchanged) */}
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
                    {errors.name?.type === 'required' && <p className="text-red-500 mb-2">Name is Required</p>}

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
                    {errors.photo?.type === 'required' && <p className="text-red-500 mb-2">Photo is Required</p>}

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
                    {errors.email?.type === 'required' && <p className="text-red-500 mb-2">Email is Required</p>}

                    {/* Password */}
                    <motion.div
                        initial={{opacity:0, x:25}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:.65}}
                        className="flex flex-col relative gap-2 mb-4"
                    >
                        <label className="text-sm font-medium">Password</label>
                        <input type={show ? 'text' : 'password'}
                            {...register('password',{
                                required:true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z]).+$/

                            })}
                            
                            placeholder="Password (min. 6 character)"
                            className="border rounded-lg px-4 py-2 outline-none 
                            focus:ring-2 focus:ring-black duration-300"
                        />
                        <button type='button' onClick={() => setShow(!show)} className=' absolute top-9 right-4'>{show ? <EyeOff size={22} /> : <Eye size={22} />}</button>
                    </motion.div>
                    {errors.password?.type === 'required' && <p className="text-red-500 mb-2">Password is Required</p>}
                    {errors.password?.type === "minLength" && <p className="text-red-500 mb-2">Password must be 6 characters or longer</p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-500 mb-2">Password must contain uppercase and lowercase letters.</p>}

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
                        onClick={HandleGoogle}
                        
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
