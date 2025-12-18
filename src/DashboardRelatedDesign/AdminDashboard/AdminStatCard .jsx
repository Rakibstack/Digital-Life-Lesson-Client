import { motion } from "framer-motion";

const AdminStatCard = ({ title, value }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white p-6 rounded-2xl shadow-md 
                 hover:shadow-xl transition border overflow-hidden"
        >
            {/* soft gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br 
                      from-purple-100/40 to-transparent opacity-0 
                      hover:opacity-100 transition" />

            <p className="text-sm font-medium text-gray-500 tracking-wide">
                {title}
            </p>

            <h3 className="text-4xl font-bold mt-3 text-gray-800">
                {value || 0}
            </h3>

            {/* subtle bottom accent */}
            <span className="absolute bottom-0 left-0 h-1 w-full 
                       bg-gradient-to-r from-purpe-600 to-blue-500" />
        </motion.div>
    );
};

export default AdminStatCard;
