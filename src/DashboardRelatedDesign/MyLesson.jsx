import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUser from "../Hooks/useUser";
import DynamicLoading from "../Component/Loading/Loading";

const MyLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useUser();

  const modalRef = useRef();
  const [lessonId, setLessonId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const {
    data: myLesson = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mylesson", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
      return res.data;
    },
  });

  const handleVisibilityChange = (id, visibility) => {
    axiosSecure
      .patch(`/mylessons/visibility/${id}`, { visibility })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire("Success!", "Visibility updated", "success");
          refetch();
        }
      });
  };

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/mylessons/delete/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Lesson deleted", "success");
            refetch();
          }
        });
      }
    });
  };

  const HandleModal = (id) => {
    setLessonId(id);
    modalRef.current.showModal();
  };

  const HandleClose = () => {
    modalRef.current.close();
  };

  const onSubmitForm = (data) => {
    axiosSecure
      .patch(`/mylesson/update/${lessonId}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire("Success!", "Lesson updated", "success");
          reset();
          refetch();
          modalRef.current.close();
        }
      });
  };

  if (isLoading) return <DynamicLoading />;

  return (
    <div className="p-6 space-y-8">
      <title>My Lessons</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
      >
        <h2 className="text-3xl font-bold"> My Lessons</h2>
        <p className="text-indigo-100">
          Manage, update & control your lessons
        </p>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl bg-white/80 backdrop-blur shadow-xl border">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th>Title</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Created</th>
              <th>❤️</th>
              <th>⭐</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myLesson.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-16 text-gray-400">
                  😔 No lessons yet. Create your first one!
                </td>
              </tr>
            )}

            {myLesson.map((lesson) => (
              <motion.tr
                key={lesson._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-indigo-50/40"
              >
                <td className="font-medium">{lesson.title}</td>

                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={lesson.visibility}
                    onChange={(e) =>
                      handleVisibilityChange(lesson._id, e.target.value)
                    }
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      lesson.accessLevel === "premium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </td>

                <td>
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td>{lesson.likes || 0}</td>
                <td>{lesson.favoritesCount || 0}</td>

                <td className="flex gap-2">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:scale-110 transition"
                  >
                    <Eye size={16} />
                  </Link>

                  <button
                    onClick={() => HandleModal(lesson._id)}
                    className="p-2 rounded-lg bg-sky-100 text-sky-600 hover:scale-110 transition"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => HandleDelete(lesson._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:scale-110 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update Lesson
            </h2>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <input
                {...register("title", { required: true })}
                placeholder="Lesson Title"
                className="input input-bordered w-full"
              />

              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Lesson Description"
                className="textarea textarea-bordered w-full"
              />

              <select {...register("category")} className="select select-bordered w-full">
                <option value="personal-growth">Personal Growth</option>
                <option value="career">Career</option>
                <option value="relationships">Relationships</option>
                <option value="mindset">Mindset</option>
              </select>

              <select {...register("tone")} className="select select-bordered w-full">
                <option value="motivational">Motivational</option>
                <option value="sad">Sad</option>
                <option value="realization">Realization</option>
              </select>

              <select {...register("privacy")} className="select select-bordered w-full">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <select
                {...register("accessLevel")}
                disabled={!isPremium}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>

              {!isPremium && (
                <p className="text-sm text-red-500">
                  Upgrade to premium to use premium access
                </p>
              )}

              <div className="flex gap-4 ">
                <button className="btn flex-1 btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={HandleClose}
                  className="btn flex-1 btn-outline "
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </dialog>
    </div>
  );
};

export default MyLesson;
