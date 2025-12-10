import { motion } from "framer-motion";
import useUser from "../Hooks/useUser";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";

const BrowsePublicLessons = () => {

    const { isPremium,  } = useUser();
    const axiosInstance = useAxios()
    const [lessons,setLessons] = useState([])
    const [totalLesson,setTotalLesson] = useState(0)
    const [totalPage,setTotalPage] = useState(0)
    const [currentPage,setCurrentPage] = useState(0)

    const limit = 6;

    useEffect(() => {

        axiosInstance.get(`/lessons/public?limit=${limit}&skip=${currentPage * limit}`)
        .then(res => {
            setLessons(res.data.result)
            setTotalLesson(res.data.total)

            const page = Math.ceil(res.data.total / limit)
            setTotalPage(page)
        })
    },[currentPage,axiosInstance])
   
    
    
        
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            
            <h1 className="text-4xl font-bold text-center mb-3 
                           bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Browse Public Life Lessons 🌍
            </h1>

            <p className="text-center mb-10 text-gray-600">
                Explore real experiences, stories and wisdom shared by the community.
            </p>
            <div className="py-5">
                <h2 className="font-bold">{`(${totalLesson}) Lesson Found`}</h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {lessons.map((lesson) => {

                    const locked = lesson.accessLevel === "premium" && !isPremium;

                    return (
                        <motion.div
                            key={lesson._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-white rounded-xl shadow-xl p-5 border overflow-hidden"
                        >
                            {/* Lock overlay if user not premium */}
                            {locked && (
                                <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex flex-col justify-center items-center">
                                    <span className="text-4xl mb-2">🔒</span>
                                    <p className="text-gray-700 font-medium">Premium Lesson – Upgrade to View</p>
                                </div>
                            )}

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
                                <img src={lesson.authorPhoto || "/default.jpg"} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold">{lesson.authorName}</p>
                                    <p className="text-xs text-gray-500">{lesson.createdAt?.split("T")[0]}</p>
                                </div>
                            </div>
                         
                                <Link to={`/lessons/${lesson._id}`}>
                                    <motion.button whileHover={{ scale: 1.05 }} className="mt-5 w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                                        See Details
                                    </motion.button>
                                </Link>
                        
                        </motion.div>
                    );
                })}
            </div>

            <div className=" flex justify-center items-center gap-5 mt-10">
                {
                    currentPage > 0 && <button onClick={() => setCurrentPage(currentPage -1)} className="btn"><ArrowLeft /> Prev</button>
                }
                {
                    [...Array(totalPage).keys()].map(i => <button onClick={() => setCurrentPage(i)} className={`btn ${i === currentPage && 'btn-primary'}`}>{i}</button>
                        
                    )
                }
                 {
                    currentPage < totalPage -1 && <button onClick={() => setCurrentPage(currentPage +1)} className="btn">Next<ArrowRight /></button>
                }
            </div>
        </div>
    );
};

export default BrowsePublicLessons;
