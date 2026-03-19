import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

export default async function ProfilePage({ params }: any) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white text-center"
            >

                {/* Avatar Icon */}
                <div className="flex justify-center mb-6">
                    <UserCircle size={80} className="text-white/80" />
                </div>

                {/* User ID */}
                <h1 className="text-3xl font-bold mb-2">
                    User Profile
                </h1>

                <p className="text-lg text-white/80 mb-6">
                    Viewing profile for:
                </p>

                <div className="bg-white/20 rounded-xl py-3 px-6 text-xl font-semibold tracking-wide">
                    {id}
                </div>

                <p className="mt-6 text-sm text-white/60">
                    This is the profile page for user with ID {id}.
                </p>

            </motion.div>
        </div>
    );
}