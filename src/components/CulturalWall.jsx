import React, { useState } from 'react';
import { motion } from 'framer-motion';
import brickWall from '../assets/brick-wall.jpg';
import dhvaniPoster from '../assets/dhvani_event_poster.png';
import natyaPoster from '../assets/natya_event_poster.png';
import RegistrationModal from './RegistrationModal';

const events = [
    { id: 1, title: 'NATYA', subtitle: 'THE DRAMA UNFOLDS', category: 'Drama', color: 'text-red-600', bg: 'bg-[#f4ebe1]', border: 'border-red-800', img: natyaPoster },
    { id: 2, title: 'DHVANI', subtitle: 'ECHOES OF ETERNITY', category: 'Music', color: 'text-amber-500', bg: 'bg-[#1a1a1a]', border: 'border-amber-500', img: dhvaniPoster, isDark: true },
    { id: 3, title: 'NRITYA', subtitle: 'RHYTHM DEFIED', category: 'Dance', color: 'text-cyan-800', bg: 'bg-[#e2e8f0]', border: 'border-cyan-900', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop' },
    { id: 4, title: 'CHALA', subtitle: 'FRAME BY FRAME', category: 'Short Film', color: 'text-zinc-800', bg: 'bg-[#fafafa]', border: 'border-zinc-900', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop' },
];

const CulturalWall = ({ onAddToCart, user, userData }) => {
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [selectedEventName, setSelectedEventName] = useState("");

    const handleRegisterClick = (e, name) => {
        e.stopPropagation();
        setSelectedEventName(name);
        setIsRegModalOpen(true);
    };

    return (
        <section className="relative min-h-screen py-20 bg-rasrang-black overflow-hidden">
            {/* Brick Background Layer */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center"
                style={{ backgroundImage: `url(${brickWall})` }}
            ></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_90%)]"></div>

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-marquee text-rasrang-yellow mb-2">CULTURAL ALLEY</h2>
                    <div className="w-24 h-2 bg-rasrang-pink"></div>
                    <p className="font-cinema text-rasrang-cyan mt-4 tracking-widest uppercase">Vintage Posters & Old School Vibes</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, zIndex: 20 }}
                            className={`p-3 lg:p-4 rounded-sm shadow-xl relative cursor-pointer border-4 group transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] ${event.bg} ${event.border}`}
                        >
                            {/* Inner Poster Border */}
                            <div className={`relative h-full border-2 ${event.border} p-3 flex flex-col justify-between overflow-hidden ${event.isDark ? 'text-white' : 'text-black'}`}>
                                
                                {/* Production Company Banner */}
                                <div className="text-center mb-3 border-b-2 border-current pb-2">
                                    <p className="text-[10px] font-cinema tracking-widest uppercase opacity-80">A Rasrang Production</p>
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
                                        STARRING THE BEST TALENTS OF THE GENERATION<br/>
                                        SCREENPLAY BY THE DREAMERS<br/>
                                        DIRECTED BY RASRANG
                                    </p>
                                    
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="text-left">
                                            <p className="text-[16px] font-bold font-cinema">{event.category}</p>
                                            <p className="text-[10px] uppercase tracking-wider opacity-60">U/A Certified</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end w-32">
                                            <button
                                                onClick={(e) => handleRegisterClick(e, event.title)}
                                                className="w-full px-4 py-1.5 border border-current bg-transparent text-current font-cinema text-[10px] sm:text-[11px] hover:bg-white hover:!text-black hover:border-white transition-all transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                                            >
                                                REGISTER NOW
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAddToCart({ id: `cult-${event.id}`, name: event.title }); }}
                                                className="w-full px-4 py-1.5 bg-current text-white font-cinema text-[10px] sm:text-[11px] hover:scale-105 transition-transform mix-blend-difference relative overflow-hidden group/btn2"
                                                style={{ filter: "invert(1)" }}
                                            >
                                                BOOK TICKET
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Attractive Cinema Barcode Below Items */}
                                    <div className="mt-4 pt-2 border-t border-current/20 flex justify-center items-center opacity-70">
                                       <div className="flex gap-[2px] h-5 items-end">
                                            <div className="w-0.5 h-full bg-current"></div>
                                            <div className="w-1.5 h-full bg-current"></div>
                                            <div className="w-0.5 h-full bg-current"></div>
                                            <div className="w-1 h-3 bg-current"></div>
                                            <div className="w-2.5 h-full bg-current"></div>
                                            <div className="w-0.5 h-full bg-current"></div>
                                            <div className="w-1.5 h-full bg-current"></div>
                                            <div className="w-1 h-4 bg-current"></div>
                                            <div className="w-0.5 h-full bg-current"></div>
                                            <div className="w-2 h-full bg-current"></div>
                                       </div>
                                       <span className="font-mono text-[9px] tracking-[0.3em] ml-3 mt-1 font-bold">ADMIT ONE</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Graffiti Decoration */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/4 right-0 text-rasrang-pink/20 font-marquee text-[15rem] -rotate-12 pointer-events-none select-none z-0"
                >
                    CULT-X
                </motion.div>

                {/* Registration Modal Overlay */}
                <RegistrationModal 
                    isOpen={isRegModalOpen} 
                    onClose={() => setIsRegModalOpen(false)} 
                    eventName={selectedEventName} 
                    user={user}
                    userData={userData}
                />
            </div>
        </section>
    );
};

export default CulturalWall;
