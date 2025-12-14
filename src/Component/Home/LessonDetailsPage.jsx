import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';
import useAuth from '../../Hooks/useAuth';

const LessonDetailsPage = () => {

    const { id } = useParams();
    const [lesson, setLesson] = useState({});
    const [author, setAuthor] = useState({});
    const[totalLesson,setTotalLesson] = useState(0)
    const [locked, setLocked] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    // console.log({lesson,author});
    
    useEffect(() => {
        fetchLesson();
    }, [id]);    

    const fetchLesson = async () => {

        setLoading(true);
        try {
            const res = await axiosSecure.get(`/lessons/${id}`);
            console.log(res.data);
            
            setLesson(res.data.lesson);
            setAuthor(res.data.author);
            setTotalLesson(res.data.totalLesson)

        } catch (error) {
            // Handle Premium Locked
            if (error.response?.status === 403 && error.response.data.error === "premium_locked") {
                setLocked(true);
            }

        } finally {
            setLoading(false);
        }
    };
        // small helpers
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : '-';
  const short = (s, n = 120) => (s && s.length > n ? s.slice(0, n).trim() + '...' : s);
   const views = Math.floor(Math.random() * 10000);


  if(loading){
    return <Loading></Loading>
  }

    return (
              <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header: Title */}
      <header className="relative rounded-2xl overflow-hidden shadow-md bg-white">
         {locked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl text-center shadow">
                  <h3 className="text-lg font-semibold">Premium Lesson</h3>
                  <p className="text-sm mt-1 mb-3">Upgrade to view full content</p>
                  <Link to='/upgrade' className="px-4 py-2 rounded-md border font-medium">Upgrade</Link>
                </div>
              </div>
            )}
         
          <div className={`h-48 md:h-56 flex items-center justify-center bg-gradient-to-r from-slate-50 to-white ${locked ? 'filter blur-sm' : ''}`}>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
              <p className="text-sm text-slate-500 mt-2">{lesson.category} • {lesson.tone}</p>
            </div>
          </div>
    
      </header>

      {/* Meta bar + Author + Stats */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Left: Content column */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 relative">

          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">
              <div>Created: <span className="font-medium text-slate-700">{formatDate(author.createAt)}</span></div>
              {/* <div>Updated: <span className="font-medium text-slate-700">{formatDate(updatedAt)}</span></div> */}
              <div>Visibility: Public</div>
            </div>
            <div className="text-sm text-slate-500 text-right">
              
              <div>Views: <span className="font-medium">{Number(views).toLocaleString()}</span></div>
            </div>
          </div>

          {/* Content
          <article className={`prose max-w-none ${locked ? 'blur-sm pointer-events-none select-none' : ''}`} aria-hidden={locked}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article> */}

          {/* Interaction Buttons
          <div className="mt-6 flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onLike}
              className={`px-3 py-2 rounded-md flex items-center gap-2 border ${likedByMe ? 'bg-red-50 border-red-200' : 'bg-white'}`}
              aria-pressed={likedByMe}
              aria-label="Like lesson"
            >
              <span aria-hidden>{likedByMe ? '❤️' : '🤍'}</span>
              <span className="text-sm font-medium">{Number(likesCount).toLocaleString()}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onFavorite}
              className={`px-3 py-2 rounded-md flex items-center gap-2 border ${favoritedByMe ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`}
              aria-pressed={favoritedByMe}
              aria-label="Save to favorites"
            >
              <span aria-hidden>{favoritedByMe ? '🔖' : '📄'}</span>
              <span className="text-sm font-medium">{Number(favoritesCount).toLocaleString()}</span>
            </motion.button>

            <motion.button whileTap={{ scale: 0.95 }} onClick={onShare} className="px-3 py-2 rounded-md border bg-white" aria-label="Share lesson">Share</motion.button>

            <motion.button whileTap={{ scale: 0.95 }} onClick={onReport} className="ml-auto px-3 py-2 rounded-md text-sm border bg-white text-rose-600" aria-label="Report lesson">Report</motion.button>
          </div> */}

          {/* Comments placeholder */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-3 space-y-3">
              <div className="flex items-start space-x-3">
                <img src={user?.avatarUrl || '/avatar-placeholder.png'} alt="you" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <textarea className="w-full p-3 rounded-md border" placeholder={user ? 'Write a comment...' : 'Please log in to comment'} disabled={!user} />
                  <div className="text-right mt-2">
                    <button  className="px-4 py-2 rounded-md bg-slate-800 text-white text-sm" disabled={!user}>Post Comment</button>
                  </div>
                </div>
              </div>

              {/* sample comments (static) */}
              <div className="space-y-2">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Amina</div>
                  <div className="text-sm text-slate-700">Loved the insight about being honest with yourself — this hit home.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Rafi</div>
                  <div className="text-sm text-slate-700">Powerful lesson — thank you for sharing.</div>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Right: Author card + stats + recommendations */}
        <aside className="w-full md:w-80 mt-6 md:mt-0">
          <div className="sticky top-6 space-y-4">
            {/* Author card */}
            <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
              <img src={author.photo}  className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{author.name}</div>
                <div className="text-sm text-slate-500">{totalLesson} lessons</div>
                <button className="mt-2 text-sm underline">View all lessons</button>
              </div>
            </div>

            {/* Quick Stats
            <div className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2"><span>Likes</span><span className="font-medium">{Number(likesCount).toLocaleString()}</span></div>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2"><span>Favorites</span><span className="font-medium">{Number(favoritesCount).toLocaleString()}</span></div>
              <div className="flex items-center justify-between text-sm text-slate-600"><span>Views</span><span className="font-medium">{Number(views).toLocaleString()}</span></div>
            </div> */}

            {/* Recommendations (static placeholders) */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h4 className="font-semibold mb-3">Related Lessons</h4>
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-md flex-none" />
                    <div>
                      <div className="text-sm font-medium">{short(lesson.title + ' — related ' + i, 48)}</div>
                      <div className="text-xs text-slate-500">{lesson.category} • {lesson.tone}</div>
                    </div>
                  </div>
                ))}
                <button className="mt-3 w-full text-sm py-2 rounded-md border">Show more</button>
              </div>
            </div>

          </div>
        </aside>

      </div>

    </div>
    );
};

export default LessonDetailsPage;