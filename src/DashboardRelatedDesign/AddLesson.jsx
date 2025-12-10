import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUser from "../Hooks/useUser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddLesson = () => {

    const { isPremium, name, email ,photo} = useUser();
    const axiosInstance = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const lessonInfo = {
                title: data.title,
                description: data.description,
                category: data.category,
                tone: data.tone,
                privacy: data.privacy,
                accessLevel: data.accessLevel,
                authorName: name,
                authorEmail: email,
                authorPhoto: photo,
            };

            const res = await axiosInstance.post("/lessons", lessonInfo);

            if (res.data.success) {
                Swal.fire({
                    title: "Success",
                    text: "Your Lesson has been Created!",
                    icon: "success",
                });
                reset();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="max-w-xl mx-auto bg-white/80 backdrop-blur-md 
                       border border-gray-200 shadow-2xl rounded-2xl 
                       p-10 mt-10"
        >
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r 
                           from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Create New Lesson 🚀
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <motion.input
                    whileFocus={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    {...register("title", { required: true })}
                    placeholder="Lesson Title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                />

                <motion.textarea
                    whileFocus={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    {...register("description", { required: true })}
                    rows={5}
                    placeholder="Write your full life lesson or story..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 outline-none resize-none"
                ></motion.textarea>

                <motion.select
                    whileHover={{ scale: 1.02 }}
                    {...register("category")}
                    className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                >
                    <option value="personal-growth">Personal Growth</option>
                    <option value="career">Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistake-learned">Mistakes Learned</option>
                </motion.select>

                <motion.select
                    whileHover={{ scale: 1.02 }}
                    {...register("tone")}
                    className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                >
                    <option value="motivational">Motivational</option>
                    <option value="sad">Sad</option>
                    <option value="realization">Realization</option>
                    <option value="gratitude">Gratitude</option>
                </motion.select>

                <motion.select
                    whileHover={{ scale: 1.02 }}
                    {...register("privacy")}
                    className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </motion.select>

                <motion.select
                    whileHover={{ scale: 1.02 }}
                    {...register("accessLevel")}
                    disabled={!isPremium}
                    className="w-full p-3 border rounded-lg outline-none focus:border-purple-500 cursor-pointer"
                >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </motion.select>

                {!isPremium && (
                    <p className="text-red-500 text-sm">Upgrade to Premium to create premium lessons</p>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 text-lg font-semibold rounded-lg 
                               bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                               shadow-md hover:shadow-xl transition"
                >
                    Create Lesson ✍️
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddLesson;
