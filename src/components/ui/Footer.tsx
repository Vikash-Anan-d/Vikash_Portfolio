"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";

export const Footer = () => {
    return (
        <footer className="w-full py-8 mt-20 border-t border-black/10 dark:border-white/10 relative z-10 glass">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-600 dark:text-gray-500 mb-4 md:mb-0"
                >
                    © {new Date().getFullYear()} Vikash Anand. All rights reserved.
                </motion.div>

                <div className="flex space-x-6">
                    <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://github.com/Vikash-Anan-d"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                        <GithubIcon className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://www.linkedin.com/in/vikash-anan-d/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                        <LinkedinIcon className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://www.instagram.com/vikash_anan.d/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    >
                        <InstagramIcon className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="mailto:vikashanandmail@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </motion.a>
                </div>
            </div>
        </footer>
    );
};
