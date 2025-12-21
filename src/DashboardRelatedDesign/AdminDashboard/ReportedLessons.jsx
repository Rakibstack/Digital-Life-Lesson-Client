import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DynamicLoading from "../../Component/Loading/Loading";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const modalRef = useRef();

  /* ---------------- Reported Lessons ---------------- */
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/dashboard/admin/reported-lessons"
      );
      return res.data;
    },
  });

  /* ---------------- Report Reasons ---------------- */
  const { data: reports = [] } = useQuery({
    queryKey: ["lessonReports", selectedLesson?._id],
    enabled: !!selectedLesson,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/admin/lesson-reports/${selectedLesson._id}`
      );
      return res.data;
    },
  });

  /* ---------------- Delete Lesson ---------------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `/dashboard/admin/reported-lessons/delete-lesson/${id}`
          )
          .then((res) => {
            if (res.data.success) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Reported lesson has been removed.",
                "success"
              );
            }
          });
      }
    });
  };

  /* ---------------- Ignore Report ---------------- */
  const handleIgnore = (id) => {
    axiosSecure
      .delete(`/dashboard/admin/reported-lessons/ignore/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          refetch();
          Swal.fire(
            "Ignored!",
            "Report has been ignored successfully.",
            "success"
          );
        }
      });
  };

  if (isLoading) return <DynamicLoading />;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <title>Manage-Report</title>
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
           Reported Lessons
        </h2>
        <p className="text-gray-500 mt-1">
          Review flagged lessons and take action
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Lesson Title</th>
              <th>Reports</th>
              <th>Details</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400"
                >
                   No reported lessons found
                </td>
              </tr>
            )}

            {lessons.map((lesson) => (
              <motion.tr
                key={lesson._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="font-medium">{lesson.title}</td>

                <td>
                  <span className="px-3 py-1 text-sm rounded-full 
                                   bg-red-100 text-red-600 font-semibold">
                    {lesson.reportCount}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-xs btn-outline btn-info"
                    onClick={() => {
                      setSelectedLesson(lesson);
                      modalRef.current.showModal();
                    }}
                  >
                    View Reasons
                  </button>
                </td>

                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleIgnore(lesson._id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-4">
             Report Reasons
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {reports.length === 0 && (
              <p className="text-gray-400 text-sm">
                No report details available
              </p>
            )}

            {reports.map((r, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gray-100 text-sm"
              >
                {r.reason}
              </div>
            ))}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReportedLessons;
