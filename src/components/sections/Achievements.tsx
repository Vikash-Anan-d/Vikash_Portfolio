"use client";

import { motion, useInView } from "framer-motion";
import { Award, Code2, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Counter = ({ from, to, suffix = "", duration = 2 }: { from: number, to: number, suffix?: string, duration?: number }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let start = from;
            const end = to;
            const totalMiliseconds = duration * 1000;
            const stepTime = Math.abs(Math.floor(totalMiliseconds / (end - start)));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [inView, from, to, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export const Achievements = () => {
    return (
        <section id="achievements" className="py-24 relative w-full bg-slate-900/40">
            <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Milestones & <span className="text-gradient">Achievements</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="glass p-10 flex flex-col items-center justify-center rounded-3xl"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                            <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                            <Counter from={0} to={7} suffix=".5%" />
                        </h3>
                        <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Global Ranking</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -10 }}
                        className="glass p-10 flex flex-col items-center justify-center rounded-3xl"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                            <Code2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                            <Counter from={0} to={500} suffix="+" />
                        </h3>
                        <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">LeetCode Problems</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -10 }}
                        className="glass p-10 flex flex-col items-center justify-center rounded-3xl"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                            <Counter from={0} to={5} suffix=" Star" />
                        </h3>
                        <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">HackerRank Badge</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
