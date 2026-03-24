"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface Project {
    id: number;
    title: string;
    summary: string;
    description: string;
    tags: string[];
    demoUrl: string;
    githubUrl: string;
    imageColor: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "SoulChat AI",
        summary: "AI Chatbot with Sentiment Analysis capabilities.",
        description: "An incredibly advanced AI chatbot designed with comprehensive sentiment analysis features achieving over 90% accuracy. The system dynamically adjusts its persona based on the detected emotion of the user.",
        tags: ["Next.js", "Python", "TensorFlow", "Tailwind", "REST APIs"],
        demoUrl: "https://soulchat-ai.vercel.app/",
        githubUrl: "https://github.com/Vikash-Anan-d/-SoulChat-AI-Chatbot-with-Emotional-Intelligence",
        imageColor: "from-purple-500 to-indigo-600"
    },
    {
        id: 2,
        title: "PromptHub",
        summary: "AI Prompt Management & Execution System.",
        description: "A centralized hub to store, discover, and execute cutting-edge LLM prompts. Features rich syntax highlighting, variable injection, and automated API testing integrations.",
        tags: ["React", "Node.js", "MongoDB", "OpenAI API"],
        demoUrl: "#",
        githubUrl: "https://github.com/Vikash-Anan-d/prompthub",
        imageColor: "from-teal-400 to-emerald-600"
    },
    {
        id: 3,
        title: "SkillSwap",
        summary: "A peer-to-peer knowledge sharing and learning platform.",
        description: "Connects individuals who want to trade their skills. Features a real-time matching algorithm, scheduling system, and integrated video calls for seamless learning architecture.",
        tags: ["Next.js", "PostgreSQL", "Socket.io", "WebRTC"],
        demoUrl: "https://coder-sphere-link.vercel.app/",
        githubUrl: "https://github.com/Vikash-Anan-d/Coder-sphere-link",
        imageColor: "from-blue-500 to-cyan-600"
    }
];

export const Projects = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="projects" className="py-24 relative w-full bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Featured <span className="text-gradient">Projects</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            layoutId={`project-container-${project.id}`}
                            onClick={() => setSelectedId(project.id)}
                            key={project.id}
                            className="group glass-card overflow-hidden cursor-pointer relative hover:shadow-[0_0_2rem_-0.5rem_#2dd4bf] hover:border-teal-500/30 transition-all duration-500"
                            whileHover={{ y: -10 }}
                        >
                            {/* Card Image Area (Mockup colored gradient) */}
                            <motion.div
                                layoutId={`project-image-${project.id}`}
                                className={`w-full h-48 bg-gradient-to-br ${project.imageColor} relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            </motion.div>

                            <motion.div className="p-6" layoutId={`project-content-${project.id}`}>
                                <motion.h3 layoutId={`project-title-${project.id}`} className="text-2xl font-bold mb-2">
                                    {project.title}
                                </motion.h3>
                                <motion.p layoutId={`project-summary-${project.id}`} className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {project.summary}
                                </motion.p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-xs font-semibold px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-teal-600 dark:text-teal-300">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && <span className="text-xs font-semibold px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400">+{project.tags.length - 3}</span>}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal / Expanded View */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Modal Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        {projects.filter(p => p.id === selectedId).map(project => (
                            <motion.div
                                layoutId={`project-container-${project.id}`}
                                key={project.id}
                                className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col"
                            >
                                <motion.div
                                    layoutId={`project-image-${project.id}`}
                                    className={`w-full h-64 bg-gradient-to-br ${project.imageColor} relative`}
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </motion.div>

                                <motion.div layoutId={`project-content-${project.id}`} className="p-8 pb-10 flex-grow">
                                    <motion.h3 layoutId={`project-title-${project.id}`} className="text-3xl font-extrabold mb-4">
                                        {project.title}
                                    </motion.h3>

                                    <motion.p layoutId={`project-summary-${project.id}`} className="text-lg text-teal-600 dark:text-teal-400 font-medium mb-6">
                                        {project.summary}
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                        className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                                    >
                                        {project.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                        className="mb-8"
                                    >
                                        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-sm px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white shadow-inner">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                        className="flex gap-4"
                                    >
                                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex-1">
                                            <button className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                                <ExternalLink className="w-5 h-5" /> Live Demo
                                            </button>
                                        </a>
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1">
                                            <button className="w-full py-3 glass hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                                <GithubIcon className="w-5 h-5" /> Code
                                            </button>
                                        </a>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
