"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight, Mail } from "lucide-react";

export const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center w-full pt-20 overflow-hidden">
            {/* Background Animated Gradient / Glow elements */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-float opacity-30"></div>
            <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-float opacity-30" style={{ animationDelay: "2s" }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-teal-400 font-medium tracking-wider uppercase text-sm md:text-base"
                    >
                        Welcome to my universe
                    </motion.h2>

                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter text-foreground leading-tight">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-orange-500 animate-gradient-x">Vikash Anand</span>
                    </h1>

                    <div className="text-xl md:text-3xl text-gray-500 dark:text-gray-400 font-medium h-12 flex justify-center items-center">
                        <Typewriter
                            options={{
                                strings: ["AI/ML Engineer", "Full Stack Developer", "Systems Enthusiast"],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 30,
                            }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 mt-6"
                    >
                        I architect intelligent solutions and build pixel-perfect digital experiences. Code is my canvas, and logic is my brush.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 p-2"
                    >
                        <a href="https://github.com/Vikash-Anan-d" target="_blank" rel="noopener noreferrer">
                            <button className="group relative px-8 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                                <span className="relative z-10 hidden dark:block text-black">View Projects</span>
                                <span className="relative z-10 block dark:hidden text-white">View Projects</span>
                                <ArrowRight className="w-4 h-4 relative z-10 dark:text-black text-white group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>

                        <a href="mailto:vikashanandmail@gmail.com">
                            <button className="px-8 py-4 glass-card font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 hover:scale-105 duration-300">
                                Contact Me <Mail className="w-4 h-4" />
                            </button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-teal-400 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
};
