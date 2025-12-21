import React from "react";
import { Bookmark } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import DynamicLoading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";



const MostSavedLessons = () => {

    const axiosInstance = useAxios()

  const { data: lessons = [], isLoading } = useQuery({
  queryKey: ["mostSavedLessons"],
  queryFn: async () => {
    const res = await axiosInstance.get("/most-saved-lessons");
    return res.data;
  }
});

  // const mostSavedLessons = [
  //   {
  //     title: "How to Deal With Failure",
  //     author: "John Doe",
  //     saves: 320,
  //     thumbnail: "https://i.ibb.co/JCjYnB7/life1.jpg"
  //   },
  //   {
  //     title: "The Art of Living Peacefully",
  //     author: "Sophia Mia",
  //     saves: 280,
  //     thumbnail: "https://i.ibb.co/bdPWsR6/life2.jpg"
  //   },
  //   {
  //     title: "Why Gratitude Changes Your Life",
  //     author: "Rahim Uddin",
  //     saves: 250,
  //     thumbnail: "https://i.ibb.co/cy9cXJ4/life3.jpg"
  //   },
  //   {
  //     title: "Overcoming Self-Doubt",
  //     author: "Ayesha Khaled",
  //     saves: 230,
  //     thumbnail: "https://i.ibb.co/6tdfwcq/life4.jpg"
  //   }
  // ];

  if(isLoading){
    return <DynamicLoading></DynamicLoading>
  }

  return (
    <section className="my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        ⭐ Most Saved Lessons
      </h2>
      <p className="text-center text-gray-600 mt-2 mb-10">
        These lessons inspired thousands — most saved by users
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={lesson.thumbnail}
              alt={lesson.title}
              className="h-44 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-600">By {lesson.author}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-gray-700">
                  {lesson.saves} Saves
                </span>
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostSavedLessons;
