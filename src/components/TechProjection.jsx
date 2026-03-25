import React from 'react';
import { motion } from 'framer-motion';
import projectorRoom from '../assets/projector-room.jpg';

import imgCanvaOfChaos from '../assets/projection-room-events/canva of choas.jpeg';
import imgDictionaryDeception from '../assets/projection-room-events/dictionary-deception.jpeg';
import imgError404Resume from '../assets/projection-room-events/error-404-resume.jpeg';
import imgEscapeClassroom from '../assets/projection-room-events/escape-classroom.jpeg';
import imgIplAuction from '../assets/projection-room-events/ipl-auction.jpeg';
import imgLaserTag from '../assets/projection-room-events/laser-tag.jpeg';
import imgMaathiYosi from '../assets/projection-room-events/maathi-yosi.jpeg';
import imgMusicalChairs from '../assets/projection-room-events/musical-chairs.jpeg';
import imgProductPitchHell from '../assets/projection-room-events/product-pitch-hell.jpeg';
import imgPropORama from '../assets/projection-room-events/prop-o-rama.jpeg';
import imgReverseCharades from '../assets/projection-room-events/reverse-charades.jpeg';
import imgSellOrKill from '../assets/projection-room-events/sell-or-kill.jpeg';
import imgShipWreck from '../assets/projection-room-events/ship-wreck.jpeg';
import imgTrasionShow from '../assets/projection-room-events/trasion-show.jpeg';
import imgTreasureHunt from '../assets/projection-room-events/treasure-hunt.jpeg';
import imgWhisper from '../assets/projection-room-events/whispher.jpeg';

const techEvents = [
    { id: 1, name: 'canva-of-chaos', title: 'CANVA OF CHAOS', description: 'Unleash your chaotic creativity.', category: 'Design', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600', img: imgCanvaOfChaos, isDark: true },
    { id: 2, name: 'dictionary-deception', title: 'DICTIONARY DECEPTION', description: 'Outsmart your opponents with words.', category: 'Literary', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600', img: imgDictionaryDeception, isDark: true },
    { id: 3, name: 'error-404-resume', title: 'ERROR 404 RESUME', description: 'Prepare your worst resume to win.', category: 'Fun', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600', img: imgError404Resume, isDark: true },
    { id: 4, name: 'escape-classroom', title: 'ESCAPE CLASSROOM', description: 'Solve mind-bending clues to escape.', category: 'Mystery', color: 'text-red-500', bg: 'bg-[#27272a]', border: 'border-red-700', img: imgEscapeClassroom, isDark: true },
    { id: 5, name: 'ipl-auction', title: 'IPL AUCTION', description: 'Bid, strategize, and conquer.', category: 'Strategy', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600', img: imgIplAuction, isDark: true },
    { id: 6, name: 'laser-tag', title: 'LASER TAG', description: 'High-octane battles.', category: 'Action', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600', img: imgLaserTag, isDark: true },
    { id: 7, name: 'maathi-yosi', title: 'MAATHI YOSI', description: 'Think differently to claim victory.', category: 'Fun', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600', img: imgMaathiYosi, isDark: true },
    { id: 8, name: 'musical-chairs', title: 'MUSICAL CHAIRS', description: 'Survival of the quickest.', category: 'Fun', color: 'text-red-500', bg: 'bg-[#27272a]', border: 'border-red-700', img: imgMusicalChairs, isDark: true },
    { id: 9, name: 'product-pitch-hell', title: 'PRODUCT PITCH HELL', description: 'Survive the ultimate pitch challenge.', category: 'Business', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600', img: imgProductPitchHell, isDark: true },
    { id: 10, name: 'prop-o-rama', title: 'PROP-O-RAMA', description: 'Creative prop-based improv.', category: 'Theatre', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600', img: imgPropORama, isDark: true },
    { id: 11, name: 'reverse-charades', title: 'REVERSE CHARADES', description: 'Teams act, one person guesses.', category: 'Fun', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600', img: imgReverseCharades, isDark: true },
    { id: 12, name: 'sell-or-kill', title: 'SELL OR KILL', description: 'High-stakes marketing showdown.', category: 'Business', color: 'text-red-500', bg: 'bg-[#27272a]', border: 'border-red-700', img: imgSellOrKill, isDark: true },
    { id: 13, name: 'ship-wreck', title: 'SHIP WRECK', description: 'Debate your way onto the life raft.', category: 'Debate', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600', img: imgShipWreck, isDark: true },
    { id: 14, name: 'trasion-show', title: 'TRASHION SHOW', description: 'Trash meets fashion.', category: 'Fashion', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600', img: imgTrasionShow, isDark: true },
    { id: 15, name: 'treasure-hunt', title: 'TREASURE HUNT', description: 'Follow clues to find the hidden treasure.', category: 'Adventure', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600', img: imgTreasureHunt, isDark: true },
    { id: 16, name: 'whisper', title: 'WHISPER', description: 'The Chinese whispers challenge.', category: 'Fun', color: 'text-red-500', bg: 'bg-[#27272a]', border: 'border-red-700', img: imgWhisper, isDark: true }
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {techEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, rotateY: 5 }}
                            className={`p-4 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.15)] relative cursor-pointer border-2 group transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] ${event.bg} ${event.border}`}
                            style={{ height: '550px' }}
                        >
                            {/* Inner Poster Border */}
                            <div className={`relative h-full border rounded-md p-3 flex flex-col justify-between overflow-hidden ${event.isDark ? 'text-white' : 'text-black'}`} style={{ height: '100%' }}>
                                
                                {/* Production Company Banner */}
                                <div className="text-center mb-2 border-b border-current/50 pb-1.5">
                                    <p className="text-[9px] font-cinema tracking-[0.05em] uppercase opacity-80 text-rasrang-cyan">A Rasrang Tech Production</p>
                                </div>

                                {/* Poster Image */}
                                <div className="relative flex-1 overflow-hidden border border-current/30 rounded shadow-inner mb-3 bg-black/40">
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="w-full h-full object-contain filter grayscale-[0.3] brightness-110 contrast-120 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] mix-blend-overlay"></div>
                                </div>

                                {/* Typography */}
                                <div className="space-y-1 text-center mb-3">
                                    <h3 className={`text-xl md:text-2xl font-marquee uppercase leading-tight opacity-95 ${event.color}`}>
                                        {event.title}
                                    </h3>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.05em] opacity-75">{event.description}</h4>
                                </div>

                                {/* Footer */}
                                <div className="text-center border-t border-current/50 pt-2 pb-1.5 relative">
                                    <p className="font-typewriter text-[8px] leading-tight opacity-70 mb-2">
                                        PROGRAMMED BY THE BEST MINDS<br/>COMPILED BY CREATORS<br/>EXECUTED BY RASRANG
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-left">
                                            <p className="text-sm md:text-base font-bold font-cinema leading-tight truncate max-w-[120px]">{event.category}</p>
                                            <p className="text-[8px] uppercase tracking-[0.15em] opacity-70">U/A Certified</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onBookTicket(event); }}
                                            className={`px-3 py-1.5 bg-gradient-to-r ${event.color === 'text-green-500' ? 'from-green-500 to-emerald-500' : event.color === 'text-orange-500' ? 'from-orange-500 to-yellow-500' : event.color === 'text-blue-500' ? 'from-blue-500 to-indigo-500' : 'from-red-500 to-pink-500'} text-white font-bold text-[10px] uppercase tracking-wide hover:scale-105 shadow-lg rounded-md transition-all whitespace-nowrap`}
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

