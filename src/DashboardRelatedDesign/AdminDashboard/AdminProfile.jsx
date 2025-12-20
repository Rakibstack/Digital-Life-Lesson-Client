
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
//   const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data) => {

    setIsUpdating(true)

   try{
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
   }catch (error) {
    console.log(error);
    
   }finally{
    setIsUpdating(false)
   }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <title>Admin Profile</title>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName}
        </h2>

        <p className="text-gray-500">{user?.email}</p>

        {/* Role Badge */}
        <span className="inline-block mt-3 px-4 py-1 rounded-full 
                         bg-red-100 text-red-600 font-semibold text-sm">
          ADMIN
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => modalRef.current.showModal()}
          className="mt-6 w-full py-3 rounded-xl font-semibold 
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white shadow-md"
        >
           Edit Profile
        </motion.button>
      </motion.div>

      {/* Update Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-2xl">
          <h3 className="text-xl font-bold mb-4 text-center">
            Update Admin Profile
          </h3>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                defaultValue={user?.displayName}
                {...register("name", { required: true })}
                className="w-full mt-1 p-3 border rounded-lg outline-none 
                           focus:ring-2 focus:ring-purple-500"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Photo */}
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
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button disabled={isUpdating} className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminProfile;
