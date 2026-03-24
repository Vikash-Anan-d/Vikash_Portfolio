"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Smartphone } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isFocused, setIsFocused] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! (Mock)");
    };

    return (
        <section id="contact" className="py-24 relative w-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Get In <span className="text-gradient">Touch</span></h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                    <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl text-center">Feel free to reach out if you&apos;re looking to build something amazing together, or simply want to connect.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-6 p-6 glass-card hover:bg-white/10 transition-colors">
                            <div className="p-4 bg-teal-500/10 rounded-full text-teal-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-black dark:text-white mb-1">Email</h4>
                                <a href="mailto:vikashanandmail@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm md:text-base">
                                    vikashanandmail@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 glass-card hover:bg-white/10 transition-colors">
                            <div className="p-4 bg-purple-500/10 rounded-full text-purple-400">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-black dark:text-white mb-1">Phone</h4>
                                <a href="tel:+916205370416" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm md:text-base">
                                    +91-6205370416
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 glass-card hover:bg-white/10 transition-colors">
                            <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-black dark:text-white mb-1">Location</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                    India
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit}
                        className="glass-card p-8 md:p-10 space-y-6"
                    >
                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused === 'name' || formState.name ? '-top-2.5 text-xs bg-white dark:bg-[#09090b] px-1 text-teal-600 dark:text-teal-400 rounded' : 'top-3.5 text-gray-500'}`}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                onFocus={() => setIsFocused('name')}
                                onBlur={() => setIsFocused(null)}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-black dark:text-white focus:outline-none focus:border-teal-500/50 dark:focus:border-teal-400/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused === 'email' || formState.email ? '-top-2.5 text-xs bg-white dark:bg-[#09090b] px-1 text-teal-600 dark:text-teal-400 rounded' : 'top-3.5 text-gray-500'}`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                onFocus={() => setIsFocused('email')}
                                onBlur={() => setIsFocused(null)}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-black dark:text-white focus:outline-none focus:border-teal-500/50 dark:focus:border-teal-400/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused === 'message' || formState.message ? '-top-2.5 text-xs bg-white dark:bg-[#09090b] px-1 text-teal-600 dark:text-teal-400 rounded' : 'top-3.5 text-gray-500'}`}>
                                Your Message
                            </label>
                            <textarea
                                rows={5}
                                onFocus={() => setIsFocused('message')}
                                onBlur={() => setIsFocused(null)}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-black dark:text-white focus:outline-none focus:border-teal-500/50 dark:focus:border-teal-400/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 to-teal-400 hover:from-purple-400 hover:to-teal-300 text-white font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};
