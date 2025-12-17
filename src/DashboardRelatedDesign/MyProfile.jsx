import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("newest");
  const modalRef = useRef()

  // profile stats
  const { data: stats = {} } = useQuery({
    queryKey: ["profile-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile/stats");
      return res.data;
    }
  });

  // user public lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ["profile-lessons", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/my-lessons?sort=${sort}`);
      return res.data;
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const HandleUpdate = async (data) => {

    const updateImg = data.photo[0]

    const fromData = new FormData()
    fromData.append('image', updateImg)

    await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`, fromData)
      .then(res => {

        const updateProfile = {
          displayName: data.name,
          photoURL: res.data.data.url
        }
        updateUserProfile(updateProfile)
          .then(
            modalRef.current.close(),

            reset(),
            Swal.fire({
              title: "successful!",
              text: "Your Profile updated successfully.",
              icon: "success"
            })

          )
          .catch()
      })

  }
  return (
    <div className="p-6 bg-white min-h-screen">
      <title>My Profile.</title>
      <motion.div
        key={user.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, }}
        className="p-6 rounded-xl shadow-md max-w-md mx-auto bg-white hover:shadow-xl transition transform hover:-translate-y-2 text-center border"
      >
        <motion.img
          src={user?.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full mx-auto border-4 border-[#632EE3]/50 object-cover"
          whileHover={{ scale: 1.1 }}
        />
        <div className="flex gap-5 mt-4 justify-center items-center">
          <h3 className="text-xl font-semibold mt-1">{user?.displayName}</h3>
          {stats.isPremium && (
            <span className="ml-3 font-semibold text-yellow-600">
              ⭐ Premium
            </span>
          )}
        </div>
        <div className="flex gap-6 justify-center mb-8">
          <p>
            Lessons Created: <b>{stats.lessonsCreated}</b>
          </p>
          <p>
            Lessons Saved: <b>{stats.lessonsSaved}</b>
          </p>
        </div>

        <motion.button
          onClick={() => modalRef.current.showModal()}
          whileTap={{ scale: 0.95 }}
          className="mt-3 w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition"
        >
          Update Profile
        </motion.button>
      </motion.div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit(HandleUpdate)}>
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .35 }}
              className="flex flex-col gap-2 mb-5"
            >
              <label className="text-sm font-medium">Name</label>
              <input type="text"
                {...register('name', { required: true })}
                placeholder="Type Your Name"
                className="border rounded-lg px-4 py-2 outline-none 
                                      focus:ring-2 focus:ring-black duration-300"
              />
            </motion.div>
            {errors.name?.type === 'required' && <p className="text-red-500 mb-2">Name is Required</p>}

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .45 }}
              className="flex flex-col gap-2 mb-5"
            >
              <label className="text-sm font-medium">Photo</label>
              <input type="file"
                {...register('photo', { required: true })}
                className="border rounded-lg px-4 py-2 outline-none 
                                      focus:ring-2 focus:ring-black duration-300"
              />
            </motion.div>
            {errors.photo?.type === 'required' && <p className="text-red-500 mb-2">Photo is Required</p>}
            <div className="flex justify-end gap-5 ">
              <button type="button" onClick={() => modalRef.current.close()} className="btn  mt-2 font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition">Close</button>
              <button className="btn mt-2 font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition">Update</button>

            </div>
          </form>
          <div className="modal-action">

          </div>
        </div>
      </dialog>

      {/* User Public Lessons */}
      <div className="flex gap-5 pt-10 mb-3 items-center">
        <h2 className="text-2xl  font-bold mb-3">
          My Public Lessons
        </h2>
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); }}
          className="px-4 h-14 w-48 rounded-xl bg-gray-50 border shadow-sm 
                   focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option value="newest">🆕 Newest First</option>
          <option value="mostPopular">⭐ Most Popular</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 py-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {


          return (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-xl shadow-xl p-5 border overflow-hidden"
            >
              <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
              <p className="text-gray-600 text-sm">
                {lesson.description.slice(0, 100)}...
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {lesson.category}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {lesson.tone}
                </span>
                <span className="bg-black text-white px-2 py-1 rounded">
                  {lesson.accessLevel.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src={lesson.authorPhoto || "/default.jpg"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{lesson.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {lesson.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              <Link to={`/lessons/${lesson._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-5 w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                >
                  See Details
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
