import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Database, Terminal } from 'lucide-react';
import projectorRoom from '../assets/projector-room.jpg';

const techEvents = [
    { id: 1, title: 'SYNTAX ERROR', subtitle: 'A BUG IN THE MATRIX', category: 'Hackathon', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop', isDark: true },
    { id: 2, title: 'BOT WARS', subtitle: 'RISE OF THE MACHINES', category: 'Robotics', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', isDark: true },
    { id: 3, title: 'DATA HEIST', subtitle: 'THE PERFECT SCORE', category: 'Analytics', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop', isDark: true },
    { id: 4, title: 'TERMINAL X', subtitle: 'NO WAY OUT', category: 'Coding', color: 'text-red-500', bg: 'bg-[#27272a]', border: 'border-red-700', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', isDark: true },
];

const TechProjection = ({ onAddToCart }) => {
    return (
        <section className="relative min-h-screen bg-black flex flex-col justify-center py-20 overflow-hidden">
            {/* Projector Beam Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[conic-gradient(from_180deg_at_50%_0%,_rgba(0,255,255,0.1)_0deg,_transparent_20deg,_transparent_340deg,_rgba(0,255,255,0.1)_360deg)] pointer-events-none z-0"></div>

            {/* Grid Background Overlay */}
            <div
                className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-screen pointer-events-none"
                style={{ backgroundImage: `url(${projectorRoom})` }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-marquee text-rasrang-cyan neon-glow-cyan mb-2">PROJECTION ROOM</h2>
                    <p className="font-typewriter text-white/60 tracking-widest text-sm uppercase">Vintage Sci-Fi Features</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {techEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                            className={`p-3 lg:p-4 rounded-sm shadow-[0_0_30px_rgba(0,255,255,0.1)] relative cursor-pointer border-4 md:col-span-1 group transition-transform text-left ${event.bg} ${event.border}`}
                        >
                            {/* Inner Poster Border */}
                            <div className={`relative h-full border-2 ${event.border} p-3 flex flex-col justify-between overflow-hidden ${event.isDark ? 'text-white' : 'text-black'}`}>
                                
                                {/* Production Company Banner */}
                                <div className="text-center mb-3 border-b-2 border-current pb-2">
                                    <p className="text-[10px] font-cinema tracking-widest uppercase opacity-80 text-rasrang-cyan">A Rasrang Tech Production</p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 fill-current opacity-70" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    </div>
                                </div>

                                {/* Poster Image */}
                                <div className="relative aspect-[4/5] overflow-hidden border border-current shadow-inner mb-4">
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 contrast-125 sepia-[.30] transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    {/* Film grain overlay */}
                                    <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] mix-blend-overlay"></div>
                                </div>

                                {/* Typography / Title Section */}
                                <div className="flex-grow flex flex-col justify-center text-center mb-2">
                                    <h3 className={`text-4xl lg:text-5xl font-marquee uppercase leading-none mb-1 opacity-90 transition-colors duration-300 ${event.color}`}>
                                        {event.title}
                                    </h3>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">{event.subtitle}</h4>
                                </div>

                                {/* Credits / Footer */}
                                <div className="mt-auto text-center border-t-2 border-current pt-2 pb-1 relative">
                                    <p className="font-typewriter text-[9px] uppercase leading-tight opacity-70 text-balance">
                                        PROGRAMMED BY THE BEST MINDS OF THE GENERATION<br/>
                                        COMPILED BY THE CREATORS<br/>
                                        EXECUTED BY RASRANG
                                    </p>
                                    
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="text-left">
                                            <p className="text-[16px] font-bold font-cinema">{event.category}</p>
                                            <p className="text-[10px] uppercase tracking-wider opacity-60">U/A Certified</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAddToCart({ id: `tech-${event.id}`, name: event.title }); }}
                                            className="px-4 py-2 bg-current text-black font-cinema text-[12px] hover:scale-110 transition-transform mix-blend-difference"
                                            style={{ filter: "invert(1)" }}
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

            {/* Sci-fi Overlay Elements */}
            <div className="absolute bottom-4 left-4 text-[10px] font-typewriter text-rasrang-cyan/30 flex flex-col gap-1 pointer-events-none">
                <p>COORDS: 12.09N, 80.27E</p>
                <p>VOLTAGE_STABLE: 230V</p>
                <p>UPTIME: 100%</p>
            </div>
        </section>
    );
};

export default TechProjection;
