
import React from "react";
import { motion } from "framer-motion";

const TopContributors = () => {

    // Static Now → Replace Later With API Data (React Query / Axios)
    const contributors = [
        {
            id: 1,
            name: "Afsana Noor",
            image: "https://randomuser.me/api/portraits/women/11.jpg",
            lessons: 18,
            rank: "🥇"
        },
        {
            id: 2,
            name: "Rakib Hasan",
            image: "https://randomuser.me/api/portraits/men/12.jpg",
            lessons: 14,
            rank: "🥈"
        },
        {
            id: 3,
            name: "Mahadi Hasan",
            image: "https://randomuser.me/api/portraits/men/44.jpg",
            lessons: 12,
            rank: "🥉"
        },
        {
            id: 4,
            name: "Nusrat Jahan",
            image: "https://randomuser.me/api/portraits/women/19.jpg",
            lessons: 10,
            rank: "⭐"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto my-20 px-4">
            
            <h2 className="text-4xl font-extrabold text-center mb-4">
                Top <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Contributors</span> of the Week
            </h2>
            
            <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
                These amazing people shared inspiring life lessons for others to grow.  
                Learn from them, follow them — maybe you will be next on the leaderboard!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {contributors.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-2 text-center border"
                    >
                        <motion.img
                            src={user.image}
                            alt={user.name}
                            className="w-24 h-24 rounded-full mx-auto border-4 border-[#632EE3]/50 object-cover"
                            whileHover={{ scale: 1.1 }}
                        />
                        <div className="mt-4 text-2xl">{user.rank}</div>
                        <h3 className="text-xl font-semibold mt-1">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.lessons} Lessons Shared</p>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="mt-3 w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition"
                        >
                            View Profile
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TopContributors;
