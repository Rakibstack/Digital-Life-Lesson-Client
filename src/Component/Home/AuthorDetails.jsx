import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { motion } from 'framer-motion'


const AuthorDetails = () => {
  const { email } = useParams()
  const [lessons, setLessons] = useState([])
  const axiosInstance = useAxiosSecure()
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get(`/lessons/author/${email}`)
      .then(res => setLessons(res.data))
  }, [email, axiosInstance])

  const short = (text, len = 100) =>
    text.length > len ? text.slice(0, len) + '...' : text

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6">
        Lessons by <span className="text-slate-600">{email}</span>
      </h2>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <motion.div
            key={lesson._id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
            onClick={() => navigate(`/lessons/${lesson._id}`)}
          >
            {/* Top accent */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

            <div className="p-5 flex flex-col h-full">
              <h3 className="font-semibold text-lg mb-2 leading-snug">
                {lesson.title}
              </h3>

              <p className="text-sm text-slate-600 mb-4 flex-grow">
                {short(lesson.description, 120)}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    {lesson.category}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    {lesson.tone}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>❤️ {lesson.likes || 0}</span>
                  <span>🔖 {lesson.favoritesCount || 0}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {lessons.length === 0 && (
        <div className="text-center text-slate-500 mt-12">
          No lessons found.
        </div>
      )}
    </div>
  )
}

export default AuthorDetails
