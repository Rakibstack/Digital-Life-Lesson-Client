import { motion } from "framer-motion";
import useUser from "../Hooks/useUser";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { ArrowLeft, ArrowRight, } from "lucide-react";

const BrowsePublicLessons = () => {

    const { isPremium, } = useUser();
    const axiosInstance = useAxios()

    const [lessons, setLessons] = useState([])
    const [totalLesson, setTotalLesson] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    // New states for search / filter / sort
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [tone, setTone] = useState("");
    const [sort, setSort] = useState("newest");

    const limit = 6;

    useEffect(() => {

        axiosInstance.get(`/lessons/public?limit=${limit}&skip=${currentPage * limit}&search=${search}&category=${category}&tone=${tone}&sort=${sort}`)
            .then(res => {
                setLessons(res.data.result)
                setTotalLesson(res.data.total)

                const page = Math.ceil(res.data.total / limit)
                setTotalPage(page)
            })
    }, [currentPage, axiosInstance, search, category, tone, sort])


    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <title>Public-Lesson</title>
            <h1 className="text-4xl font-bold text-center mb-3 
                     bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Browse Public Life Lessons 
            </h1>
            <p className="text-center mb-10 text-base-content/70">
                Explore real experiences, stories and wisdom shared by the community.
            </p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-base-100/60 backdrop-blur-xl shadow-lg border border-base-300 
               rounded-2xl p-6 mb-10 flex flex-wrap items-center justify-center gap-5"
            >
                {/* Search Box */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder=" Search wisdom..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                        className="px-4 py-2 pr-10 w-60 rounded-xl bg-base-100 text-base-content border border-base-300 
                       focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
                    />
                </div>

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setCurrentPage(0); }}
                    className="px-4 py-2 w-48 rounded-xl bg-base-100 text-base-content border border-base-300 shadow-sm 
                   focus:ring-2 focus:ring-purple-500 outline-none"
                >
                    <option value=""> All Categories</option>
                    <option value="mindset">Mindset</option>
                    <option value="productivity">Productivity</option>
                    <option value="relationship">Relationships</option>
                    <option value="mistakes">Mistakes Learned</option>
                </select>

                {/* Tone */}
                <select
                    value={tone}
                    onChange={(e) => { setTone(e.target.value); setCurrentPage(0); }}
                    className="px-4 py-2 w-48 rounded-xl bg-base-100 text-base-content border border-base-300 shadow-sm 
                   focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value=""> All Tones</option>
                    <option value="motivational">Motivational</option>
                    <option value="realization">Realization</option>
                    <option value="sad">Sad</option>
                    <option value="gratitude">Gratitude</option>
                </select>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setCurrentPage(0); }}
                    className="px-4 py-2 w-48 rounded-xl bg-base-100 text-base-content border border-base-300 shadow-sm 
                   focus:ring-2 focus:ring-green-500 outline-none"
                >
                    <option value="newest"> Newest First</option>
                    <option value="oldest"> Oldest First</option>
                    <option value="mostSaved"> Most Saved</option>
                </select>
            </motion.div>
                <div className="my-5 ">
                    <h2 className="font-extrabold ml-4  bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{`(${totalLesson}) Lesson Found`}</h2>
                </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => {
                    const locked =
                        lesson.accessLevel === "premium" && !isPremium;

                    return (
                        <motion.div
                            key={lesson._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-base-100 rounded-xl shadow-xl p-5 border border-base-300 overflow-hidden"
                        >
                            {locked && (
                                <div className="absolute inset-0 bg-base-100/70 backdrop-blur-md flex flex-col justify-center items-center">
                                    <span className="text-4xl mb-2">🔒</span>
                                    <p className="font-medium">
                                        Premium Lesson – Upgrade to View
                                    </p>
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                            <p className="text-base-content/70 text-sm">
                                {lesson.description.slice(0, 100)}...
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded">
                                    {lesson.category}
                                </span>
                                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                                    {lesson.tone}
                                </span>
                                <span className="bg-neutral text-neutral-content px-2 py-1 rounded">
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
                                    <p className="text-xs text-base-content/60">
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

           <div className="mt-14 flex flex-wrap justify-center">
  <div className="flex items-center gap-2 px-5 py-3 rounded-2xl 
                  bg-base-100/70 backdrop-blur-xl border border-base-300 shadow-lg">

    {/* Prev */}
    {currentPage > 0 && (
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="flex items-center gap-1 px-4 py-2 rounded-xl
                   font-medium
                   hover:bg-base-200 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Prev
      </button>
    )}

    {/* Page Numbers */}
    {[...Array(totalPage).keys()].map((i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`w-10 h-10 rounded-xl font-semibold transition
          ${
            i === currentPage
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
              : "hover:bg-base-200"
          }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next */}
    {currentPage < totalPage - 1 && (
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="flex items-center gap-1 px-4 py-2 rounded-xl
                   font-medium
                   hover:bg-base-200 transition"
      >
        Next
        <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
</div>

        </div>
    );
};

export default BrowsePublicLessons;
