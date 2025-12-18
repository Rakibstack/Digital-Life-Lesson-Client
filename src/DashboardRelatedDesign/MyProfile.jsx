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
  const modalRef = useRef();

  const { data: stats = {} } = useQuery({
    queryKey: ["profile-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile/stats");
      return res.data;
    },
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["profile-lessons", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/profile/my-lessons?sort=${sort}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const HandleUpdate = async (data) => {
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
      formData
    );

    const updateProfile = {
      displayName: data.name,
      photoURL: res.data.data.url,
    };

    updateUserProfile(updateProfile).then(() => {
      modalRef.current.close();
      reset();
      Swal.fire("Success!", "Profile updated successfully", "success");
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <title>My Profile</title>

      {/* ================= PROFILE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br 
        from-indigo-600 to-purple-600 text-white shadow-xl text-center"
      >
        <motion.img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-24 h-24 rounded-full mx-auto border-4 border-white/50 object-cover"
          whileHover={{ scale: 1.1 }}
        />

        <div className="mt-4 flex items-center justify-center gap-3">
          <h3 className="text-2xl font-bold">{user?.displayName}</h3>
          {stats.isPremium && (
            <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-full">
              ⭐ Premium
            </span>
          )}
        </div>

        <div className="flex justify-center gap-8 mt-4 text-sm">
          <p>
            Lessons <br />
            <b className="text-lg">{stats.lessonsCreated || 0}</b>
          </p>
          <p>
            Saved <br />
            <b className="text-lg">{stats.lessonsSaved || 0}</b>
          </p>
        </div>

        <motion.button
          onClick={() => modalRef.current.showModal()}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-2 rounded-xl font-semibold 
          bg-white text-indigo-600 hover:bg-gray-100 transition"
        >
           Update Profile
        </motion.button>
      </motion.div>

      {/* ================= MODAL ================= */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-2xl">
          <h3 className="text-2xl font-bold text-center mb-4">
            Update Profile
          </h3>

          <form onSubmit={handleSubmit(HandleUpdate)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  Photo is required
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-outline w-full"
              >
                Close
              </button>
              <button className="btn btn-primary w-full">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* ================= LESSONS HEADER ================= */}
      <div className="flex flex-wrap gap-4 pt-12 items-center">
        <h2 className="text-3xl font-bold"> My Public Lessons</h2>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered rounded-xl"
        >
          <option value="newest">🆕 Newest First</option>
          <option value="mostPopular">⭐ Most Popular</option>
        </select>
      </div>

      {/* ================= LESSON GRID ================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-5 border"
          >
            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
            <p className="text-gray-600 text-sm">
              {lesson.description.slice(0, 100)}...
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className="badge badge-secondary">
                {lesson.category}
              </span>
              <span className="badge badge-info">{lesson.tone}</span>
              <span className="badge badge-neutral">
                {lesson.accessLevel.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={lesson.authorPhoto}
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
                className="mt-5 w-full py-2 rounded-xl 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white font-medium"
              >
                See Details →
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
