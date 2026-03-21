import React from 'react';
import { motion } from 'framer-motion';
import projectorRoom from '../assets/projector-room.jpg';

const techEvents = [
    { 
        id: 1, 
        name: 'syntax-error', 
        title: 'SYNTAX ERROR', 
        subtitle: 'A BUG IN THE MATRIX', 
        category: 'Hackathon', 
        color: 'text-green-500', 
        bg: 'bg-[#0a0a0a]', 
        border: 'border-green-600', 
        img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop', 
        isDark: true 
    },
    { 
        id: 2, 
        name: 'bot-wars', 
        title: 'BOT WARS', 
        subtitle: 'RISE OF THE MACHINES', 
        category: 'Robotics', 
        color: 'text-orange-500', 
        bg: 'bg-[#1c1917]', 
        border: 'border-orange-600', 
        img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', 
        isDark: true 
    },
    { 
        id: 3, 
        name: 'data-heist', 
        title: 'DATA HEIST', 
        subtitle: 'THE PERFECT SCORE', 
        category: 'Analytics', 
        color: 'text-blue-500', 
        bg: 'bg-[#0f172a]', 
        border: 'border-blue-600', 
        img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop', 
        isDark: true 
    },
    { 
        id: 4, 
        name: 'terminal-x', 
        title: 'TERMINAL X', 
        subtitle: 'NO WAY OUT', 
        category: 'Coding', 
        color: 'text-red-500', 
        bg: 'bg-[#27272a]', 
        border: 'border-red-700', 
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', 
        isDark: true 
    },
];

const TechProjection = ({ onBookTicket }) => {
    return (
        <section className="relative min-h-[80vh] bg-black flex flex-col justify-center py-16 md:py-20 overflow-hidden">
            {/* Projector Beam Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[conic-gradient(from_180deg_at_50%_0%,_rgba(0,255,255,0.08)_0deg,_transparent_20deg,_transparent_340deg,_rgba(0,255,255,0.08)_360deg)] pointer-events-none z-0"></div>

            {/* Grid Background Overlay */}
            <div
                className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-screen pointer-events-none"
                style={{ backgroundImage: `url(${projectorRoom})` }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-marquee text-rasrang-cyan neon-glow-cyan mb-2 leading-tight">PROJECTION ROOM</h2>
                    <p className="font-typewriter text-white/60 tracking-widest text-xs md:text-sm uppercase">Vintage Sci-Fi Features</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
                    {techEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, rotateY: 5 }}
                            className={`p-4 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.15)] relative cursor-pointer border-2 md:col-span-1 group transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] ${event.bg} ${event.border}`}
                            style={{ height: '380px' }}
                        >
                            {/* Inner Poster Border */}
                            <div className={`relative h-full border rounded-md p-3 flex flex-col justify-between overflow-hidden ${event.isDark ? 'text-white' : 'text-black'}`} style={{ height: '100%' }}>
                                
                                {/* Production Company Banner */}
                                <div className="text-center mb-2 border-b border-current/50 pb-1.5">
                                    <p className="text-[9px] font-cinema tracking-[0.05em] uppercase opacity-80 text-rasrang-cyan">A Rasrang Tech Production</p>
                                </div>

                                {/* Poster Image */}
                                <div className="relative flex-1 overflow-hidden border border-current/30 rounded shadow-inner mb-3">
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="w-full h-full object-cover filter grayscale-[0.3] brightness-110 contrast-120 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] mix-blend-overlay"></div>
                                </div>

                                {/* Typography */}
                                <div className="space-y-1 text-center mb-3">
                                    <h3 className={`text-2xl md:text-2.5xl font-marquee uppercase leading-tight opacity-95 ${event.color}`}>
                                        {event.title}
                                    </h3>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-75">{event.subtitle}</h4>
                                </div>

                                {/* Footer */}
                                <div className="text-center border-t border-current/50 pt-2 pb-1.5 relative">
                                    <p className="font-typewriter text-[8px] leading-tight opacity-70 mb-2">
                                        PROGRAMMED BY THE BEST MINDS<br/>COMPILED BY CREATORS<br/>EXECUTED BY RASRANG
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="text-lg font-bold font-cinema leading-tight">{event.category}</p>
                                            <p className="text-[8px] uppercase tracking-[0.15em] opacity-70">U/A Certified</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onBookTicket(event); }}
                                            className={`px-4 py-2 bg-gradient-to-r ${event.color === 'text-green-500' ? 'from-green-500 to-emerald-500' : event.color === 'text-orange-500' ? 'from-orange-500 to-yellow-500' : event.color === 'text-blue-500' ? 'from-blue-500 to-indigo-500' : 'from-red-500 to-pink-500'} text-white font-bold text-xs uppercase tracking-wide hover:scale-105 shadow-lg rounded-md transition-all absolute bottom-4 right-4`}
                                            style={{ zIndex: 10 }}
                                        >
                                            BOOK TICKET
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Status Display */}
            <div className="absolute bottom-4 left-4 text-[9px] font-typewriter text-rasrang-cyan/40 flex flex-col gap-0.5 pointer-events-none">
                <p>COORDS: 12.09°N 80.27°E</p>
                <p>VOLTAGE: 230V ✓</p>
                <p>UPTIME: 100%</p>
            </div>
        </section>
    );
};

export default TechProjection;

