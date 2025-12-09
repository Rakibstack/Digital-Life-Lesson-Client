import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUser from "../Hooks/useUser";
import Swal from "sweetalert2";

const AddLesson = () => {

    const { isPremium, name, email } = useUser()
    console.log(isPremium, name, email);

    const axiosInstance = useAxiosSecure()
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
            };

            const res = await axiosInstance.post("/lessons", lessonInfo);

            if (res.data.success) {

                Swal.fire({
                    title: "Success",
                    text: "Your Lesson has been Created!",
                    icon: "success"
                });
                reset();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl my-10">
            <h2 className="text-2xl font-bold mb-5 text-center">Add New Lesson</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <input {...register("title", { required: true })} placeholder="Lesson Title"
                    className="w-full p-2 border rounded" />

                <textarea {...register("description", { required: true })} rows={5}
                    placeholder="Full Story or Life Lesson"
                    className="w-full p-2 border rounded"></textarea>

                <select {...register("category")} className="w-full p-2 border rounded">
                    <option value="personal-growth">Personal Growth</option>
                    <option value="career">Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistake-learned">Mistakes Learned</option>
                </select>

                <select {...register("tone")} className="w-full p-2 border rounded">
                    <option value="motivational">Motivational</option>
                    <option value="sad">Sad</option>
                    <option value="realization">Realization</option>
                    <option value="gratitude">Gratitude</option>
                </select>


                <select {...register("privacy")} className="w-full p-2 border rounded">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                <select {...register("accessLevel")} disabled={!isPremium}
                    className="w-full p-2 border rounded cursor-pointer">
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </select>

                {!isPremium && (
                    <p className="text-red-500 text-sm">Upgrade to Premium to create premium lessons</p>
                )}

                <button className="w-full p-2 bg-black text-white rounded">Add Lesson</button>
            </form>
        </div>
    );
};

export default AddLesson;
