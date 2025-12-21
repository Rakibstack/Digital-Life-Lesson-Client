import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';
import useAuth from '../../Hooks/useAuth';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share'

const LessonDetailsPage = () => {

    const { id } = useParams();
    const [lesson, setLesson] = useState({});
    const [author, setAuthor] = useState({});
    const [totalLesson, setTotalLesson] = useState(0)
    const [locked, setLocked] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // like function State
    const [likedByMe, setLikedByMe] = useState(false)
    const [likesCount, setLikesCount] = useState(lesson.likes || 0)

    // favoriteby me state
    const [favoritedByMe, setFavoritedByMe] = useState(false)
    const [favoritesCount, setFavoritesCount] = useState(
        lesson.favoritesCount || 0
    )
         const shareUrl = window.location.href;

    // report state
    const [isOpen, setIsOpen] = useState(false)
    const [reason, setReason] = useState('Spam')
    const [loading, setLoading] = useState(false)
    const reasons = ['Spam', 'Offensive', 'Fake Info']

    // comment status
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])

    // releted lesson
    const [relatedLessons, setRelatedLessons] = useState([])
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const fetchRelated = async () => {
            const res = await axiosSecure.get(`/lessons/${lesson._id}/related`)
            setRelatedLessons(res.data)
        }
        fetchRelated()
    }, [lesson._id, axiosSecure])


    useEffect(() => {
        fetchLesson();
    }, [id]);

    // check like on load
    useEffect(() => {
        if (lesson?.likedBy && user?.email) {
            setLikedByMe(lesson.likedBy.includes(user.email))
        }
    }, [lesson, user])

    // check favorite on load
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/favorites/${lesson._id}`)
                .then(res => setFavoritedByMe(res.data.favorited))
        }
    }, [lesson._id, user, axiosSecure])


   
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

    const onLike = async () => {
        try {
            const res = await axiosSecure.patch(
                `/lessons/${lesson._id}/like`
            )

            setLikedByMe(res.data.liked)
            setLikesCount(prev => Math.max(0, prev + res.data.likesChange))

        } catch (error) {
            console.error(error)
        }
    }

    const onFavorite = async () => {
        try {
            const res = await axiosSecure.patch(
                `/lessons/${lesson._id}/favorite`
            )

            setFavoritedByMe(res.data.favorited)
            setFavoritesCount(prev => Math.max(0, prev + res.data.countChange))

        } catch (error) {
            console.error(error)
        }
    }

     const onReport = async () => {

        if (!reason) return
        setLoading(true)
        try {
            await axiosSecure.post('/reports', { lesson, reason })

            Swal.fire({
                title: "success!",
                text: "Report submitted successfully",
                icon: "success"
            });
            setIsOpen(false)
        } catch (err) {
            console.error(err)
            Swal.fire({
                title: "Report failed!",
                text: `${err.response?.data?.message || 'Report failed'}`,
                icon: "success"
            });
            setIsOpen(false)

        } finally {
            setLoading(false)
        }
    }

    const handlePostComment = async () => {

        if (!commentText.trim()) return

        try {
            await axiosSecure.post('/comments', {
                lessonId: lesson._id,
                text: commentText
            })

            setCommentText('')

            // refetch comments
            const res = await axiosSecure.get(`/comments/${lesson._id}`)
            setComments(res.data)

        } catch (err) {
            console.error(err)
        }
    }
    

    // small helpers
    const formatDate = (d) => d ? new Date(d).toLocaleDateString() : '-';
    const short = (s, n = 120) => (s && s.length > n ? s.slice(0, n).trim() + '...' : s);
    const views = Math.floor(Math.random() * 10000);


    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
                  <title>Life-Lesson-Details-Page</title>


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
                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent ">{lesson.title}</h1>
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
                            <div>Updated: <span className="font-medium text-slate-700">{formatDate(lesson.updatedAt)}</span></div>
                            <div>Visibility: Public</div>
                        </div>
                        <div className="text-sm text-slate-500 text-right">

                            <div>Views: <span className="font-medium">{Number(views).toLocaleString()}</span></div>
                        </div>
                    </div>


                    Interaction Buttons
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
                        <div className="flex items-center gap-2">
                            <FacebookShareButton url={shareUrl} quote={lesson.title}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>

                            <WhatsappShareButton url={shareUrl} title={lesson.title}>
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>

                            <LinkedinShareButton url={shareUrl} title={lesson.title}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                        </div>

        

                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => {
                            setIsOpen(true)
                            lesson._id
                        }} className="ml-auto px-3 py-2 rounded-md text-sm border bg-white text-rose-600" aria-label="Report lesson">Report</motion.button>
                    </div>
                    {/* Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <motion.div
                                className="bg-white p-4 rounded-md w-80"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                <h3 className="text-lg font-semibold mb-2">Report Lesson</h3>

                                <select
                                    className="w-full p-2 border rounded mb-4"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                >
                                    {reasons.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>

                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-3 py-1 rounded-md border"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-md bg-rose-600 text-white"
                                        onClick={onReport}
                                        disabled={loading}
                                    >
                                        {loading ? 'Reporting...' : 'Report'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    <section className="mt-8">
                        <h3 className="text-lg font-semibold">Comments</h3>

                        <div className="mt-3 space-y-3">

                            {/* Comment Box */}
                            <div className="flex items-start space-x-3">
                                <img
                                    src={user?.photoURL}
                                    alt="you"
                                    className="w-10 h-10 rounded-full"
                                />

                                <div className="flex-1">
                                    <textarea
                                        className="w-full p-3 rounded-md border"
                                        placeholder={user ? 'Write a comment...' : 'Please log in to comment'}
                                        disabled={!user}
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                    />

                                    <div className="text-right mt-2">
                                        <button
                                            onClick={handlePostComment}
                                            disabled={!user}
                                            className="px-4 py-2 rounded-md bg-slate-800 text-white text-sm"
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-2">
                                {comments.map(comment => (
                                    <div key={comment._id} className="bg-slate-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <img
                                                src={comment.userPhoto}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <div className="text-sm font-medium">
                                                {comment.userName}
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-700">
                                            {comment.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>


                </div>

                {/* Right: Author card + stats + recommendations */}
                <aside className="w-full md:w-80 mt-6 md:mt-0">
                    <div className="sticky top-6 space-y-4">
                        {/* Author card */}
                        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
                            <img src={author.photo} className="w-14 h-14 rounded-full object-cover" />
                            <div>
                                <div className="font-semibold">{author.name}</div>
                                <div className="text-sm text-slate-500">{totalLesson} lessons</div>
                                <Link to={`/author/${author.email}`} className="mt-2 text-sm underline">View all lessons</Link>
                            </div>
                        </div>

                        Quick Stats
                        <div className="bg-white rounded-2xl shadow p-4">
                            <div className="flex items-center justify-between text-sm text-slate-600 mb-2"><span>Likes</span><span className="font-medium">{Number(likesCount).toLocaleString()}</span></div>
                            <div className="flex items-center justify-between text-sm text-slate-600 mb-2"><span>Favorites</span><span className="font-medium">{Number(favoritesCount).toLocaleString()}</span></div>
                            <div className="flex items-center justify-between text-sm text-slate-600"><span>Views</span><span className="font-medium">{Number(views).toLocaleString()}</span></div>
                        </div>

                        {/* Recommendations (static placeholders) */}
                        <div className="bg-white rounded-2xl shadow p-4">
                            <h4 className="font-semibold mb-3">Related Lessons</h4>
                            <div className="space-y-3">
                                {(showAll ? relatedLessons : relatedLessons.slice(0, 3)).map((rel) => (
                                    <div key={rel._id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-100 rounded-md flex-none" />
                                        <div>
                                            <div className="text-sm font-medium">{short(rel.title, 48)}</div>
                                            <div className="text-xs text-slate-500">{rel.category} • {rel.tone}</div>
                                        </div>
                                    </div>
                                ))}
                                {relatedLessons.length > 3 && (
                                    <button
                                        className="mt-3 w-full text-sm py-2 rounded-md border"
                                        onClick={() => setShowAll(prev => !prev)}
                                    >
                                        {showAll ? 'Show less' : 'Show more'}
                                    </button>
                                )}
                            </div>
                        </div>


                    </div>
                </aside>

            </div>

        </div>
    );
};

export default LessonDetailsPage;