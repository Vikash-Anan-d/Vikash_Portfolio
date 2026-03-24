"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRightCircle } from "lucide-react";

export const Experience = () => {
    return (
        <section id="experience" className="py-24 relative w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Professional <span className="text-gradient">Experience</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                </motion.div>

                <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-4 md:ml-0 md:pl-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="relative pl-8 md:pl-0"
                    >
                        {/* Timeline dot */}
                        <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] top-6 w-4 h-4 rounded-full bg-teal-400 ring-4 ring-teal-400/20 z-10" />

                        {/* Experience Card */}
                        <div className="md:w-1/2 md:pr-12 md:ml-0 group perspective">
                            <div className="glass-card p-8 group-hover:bg-white/[0.07] transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Briefcase className="w-24 h-24" />
                                </div>

                                <span className="text-teal-600 dark:text-teal-400 font-semibold mb-2 block tracking-wider uppercase text-sm">2023 - 2024</span>
                                <h3 className="text-2xl font-bold text-black dark:text-white mb-1">AI/ML + Full Stack Developer Intern</h3>
                                <h4 className="text-purple-600 dark:text-purple-400 font-medium mb-6">Tech Innovators Inc.</h4>

                                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <ArrowRightCircle className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                                        <span>Designed and implemented scalable <strong className="text-black dark:text-white font-semibold">CRUD APIs</strong> using Node.js and Express.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ArrowRightCircle className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                                        <span>Performed deep <strong className="text-black dark:text-white font-semibold">SQL optimization</strong> for legacy database queries.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ArrowRightCircle className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                                        <span>Achieved a <strong className="text-teal-600 dark:text-teal-400 font-bold">30% performance improvement</strong> in critical data-fetching endpoints.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
