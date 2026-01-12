import React from 'react';
import useUser from '../../Hooks/useUser';
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Upgrade = () => {

    const {email } = useUser()
    const axiosSecure = useAxiosSecure();

    const HandlePayment = async () => {

        const paymentInfo = {
            price:1500,
            currency: 'bdt',
            email:email,
        }

      const res =  await axiosSecure.post('/create-checkout-session',paymentInfo)
      
       window.location.href = res.data.url
        
    }

    const features = [
        {
            feature: "Create Life Lessons",
            free: "Up to 20 lessons",
            premium: "Unlimited lessons",
        },
        {
            feature: "Access Premium Lessons",
            free: "Restricted",
            premium: "Full access",
        },
        {
            feature: "Ad‑free Experience",
            free: "No",
            premium: "Yes",
        },
        {
            feature: "Priority Listing",
            free: "No",
            premium: "High priority",
        },
        {
            feature: "Weekly Insights & Stats",
            free: "Basic",
            premium: "Advanced",
        },
        {
            feature: "Save Unlimited Lessons",
            free: "Up to 30 saves",
            premium: "Unlimited saves",
        },
        {
            feature: "Early Access to New Features",
            free: "No",
            premium: "Yes",
        },
        {
            feature: "Lifetime Access",
            free: "No",
            premium: "Yes",
        },
    ];

    return (
        <div className="min-h-screen bg-base-200 py-16 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full mx-auto"
            >
                <h1 className="text-5xl font-bold text-center  bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">Pricing</h1>
                <p className="text-center text-base-content/70 mb-10">
                    Choose the plan that fits your learning journey.
                </p>


                <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="text-left p-4 text-lg">Features</th>
                                <th className="text-center p-4 text-lg">Free</th>
                                <th className="text-center p-4 text-lg">Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-base-300 ${index % 2 === 0 ? "bg-base-100" : "bg-base-200"
                                        }`}
                                >
                                    <td className="p-4 font-medium">{item.feature}</td>
                                    <td className="p-4 text-center text-base-content/70">{item.free}</td>
                                    <td className="p-4 text-center font-semibold text-green-600 flex items-center justify-center gap-2">
                                        <Check size={18} /> {item.premium}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="text-center mt-10">
                    <p className="text-xl font-semibold mb-3">
                        Premium – ৳1500 (One‑time Payment, Lifetime Access)
                    </p>


                    <button
                        
                        className="px-10 py-6 text-lg rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white
                        "
                        onClick={HandlePayment}
                    >
                        Upgrade to Premium
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Upgrade;