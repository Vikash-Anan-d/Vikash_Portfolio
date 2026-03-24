"use client";

import { motion } from "framer-motion";
import { GraduationCap, BrainCircuit, Code, Cpu } from "lucide-react";

const interests = [
    { icon: <BrainCircuit className="w-5 h-5 text-purple-400" />, label: "Artificial Intelligence" },
    { icon: <Code className="w-5 h-5 text-teal-400" />, label: "Web Development" },
    { icon: <Cpu className="w-5 h-5 text-blue-400" />, label: "Systems Architecture" },
];

export const About = () => {
    return (
        <section id="about" className="py-24 relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">About <span className="text-gradient">Me</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg text-gray-600 dark:text-gray-300"
                    >
                        <p className="leading-relaxed">
                            I am a passionate AI/ML Engineer and Full Stack Developer. I thrive at the intersection
                            of building complex artificial intelligence models and creating beautiful, intuitive user interfaces.
                        </p>
                        <p className="leading-relaxed">
                            My journey involves diving deep into system architectures, optimizing algorithms, and turning
                            visions into highly optimized digital products. I believe in writing code that is as clean as the UI it powers.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {interests.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
                                    {item.icon} {item.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Timeline / Highlight Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-teal-500/10 rounded-3xl blur-2xl transform rotate-3" />
                        <div className="glass-card p-8 relative overflow-hidden backdrop-blur-xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <GraduationCap className="w-32 h-32" />
                            </div>

                            <h3 className="text-2xl font-bold mb-6 text-foreground">Education</h3>

                            <div className="space-y-6 relative border-l-2 border-slate-700/50 dark:border-slate-300/20 ml-3 pl-6">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-400 ring-4 ring-teal-400/20" />
                                    <h4 className="text-xl font-bold text-foreground">B.Tech in Computer Science</h4>
                                    <p className="text-teal-600 dark:text-teal-500 font-medium mb-2">Specialization in AI & ML</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-500 mb-4">2021 - Present</p>

                                    <div className="inline-block glass px-4 py-2 rounded-lg">
                                        <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Academic Excellence</span>
                                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                            8.0 CGPA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
