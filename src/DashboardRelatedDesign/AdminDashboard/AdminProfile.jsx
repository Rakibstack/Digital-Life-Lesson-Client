import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const modalRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleUpdate = async (data) => {
    setIsUpdating(true);
    try {
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

      await updateUserProfile(updateProfile);
      modalRef.current.close();
      reset();
      Swal.fire("Success!", "Profile updated successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Failed to update profile", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <title>Admin Profile</title>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left: Image */}
        <div className="md:w-1/2 relative">
          <motion.img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center gap-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {user?.displayName}
          </h2>
          <p className="text-gray-500">{user?.email}</p>

          <span className="inline-block mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold text-sm shadow-md">
            ADMIN
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => modalRef.current.showModal()}
            className="mt-6 py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all w-40"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Update Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="modal-box rounded-3xl relative p-6"
        >
          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Update Profile
          </h3>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                defaultValue={user?.displayName}
                {...register("name", { required: true })}
                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Profile Photo</label>
              <input
                type="file"
                {...register("photo")}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-xl transition"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </motion.div>
      </dialog>
    </div>
  );
};

export default AdminProfile;

