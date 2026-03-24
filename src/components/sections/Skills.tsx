"use client";

import { motion, Variants } from "framer-motion";
import { Server, Layout, Brain } from "lucide-react";

export const Skills = () => {
    const categories = [
        {
            title: "AI/ML",
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            skills: [
                { name: "TensorFlow", val: 90 },
                { name: "Scikit-learn", val: 85 },
                { name: "HuggingFace", val: 80 },
                { name: "PyTorch", val: 75 },
            ]
        },
        {
            title: "Programming & Data",
            icon: <Server className="w-6 h-6 text-blue-400" />,
            skills: [
                { name: "Python", val: 95 },
                { name: "SQL", val: 88 },
                { name: "JavaScript/TypeScript", val: 85 },
                { name: "C++", val: 80 },
            ]
        },
        {
            title: "Web Development",
            icon: <Layout className="w-6 h-6 text-teal-400" />,
            skills: [
                { name: "React / Next.js", val: 90 },
                { name: "Node.js (REST APIs)", val: 85 },
                { name: "Tailwind CSS", val: 92 },
                { name: "MongoDB / PostgreSQL", val: 82 },
            ]
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section id="skills" className="py-24 relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Technical <span className="text-gradient">Skills</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {categories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent border-t border-l border-black/5 dark:border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/5 dark:border-white/10">
                                <div className="p-3 glass rounded-xl">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                            </div>

                            <div className="space-y-6 flex-grow">
                                {category.skills.map((skill, sIdx) => (
                                    <div key={sIdx} className="group cursor-pointer">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {skill.val}%
                                            </span>
                                        </div>
                                        {/* Progress bar background */}
                                        <div className="w-full bg-slate-200 dark:bg-slate-800/50 rounded-full h-2 overflow-hidden shadow-inner">
                                            {/* Animated progress bar fill */}
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.val}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1), ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full relative"
                                            >
                                                <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-[2px]" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
