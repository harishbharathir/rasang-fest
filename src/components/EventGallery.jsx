import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RegistrationModal from './RegistrationModal';

// Import all event posters
import dictionaryDeception from '../assets/events/Dictionary deception.jpeg';
import error404Resume from '../assets/events/ERROR 404 RESUME.jpeg';
import escapeTheClassroom from '../assets/events/Escape the classroom.jpeg';
import iplAuction from '../assets/events/IPL  AUCTION.jpeg';
import musicalChairs from '../assets/events/Musical chairs.jpeg';
import canvasOfChaos from '../assets/events/canvas of chaos.jpeg';
import laserTag from '../assets/events/laser tag water ballon combat.jpeg';
import mathiYosi from '../assets/events/mathi yosi.jpeg';
import productPitch from '../assets/events/product pitch from hell.jpeg';
import propORama from '../assets/events/prop o rama.jpeg';
import reverseCharades from '../assets/events/reverse charades.jpeg';
import sellOrKill from '../assets/events/sell or kill.jpeg';
import shipwreck from '../assets/events/shipwreck.jpeg';
import whisperChallenge from '../assets/events/the whisper challenge.jpeg';
import trashionShow from '../assets/events/trashion show.jpeg';
import treasureHunt from '../assets/events/treasure hunt.jpeg';

const events = [
    { id: 1, title: 'DICTIONARY DECEPTION', img: dictionaryDeception, category: 'Fun & Games', color: 'text-yellow-500', bg: 'bg-[#1a1a1a]', border: 'border-yellow-600' },
    { id: 2, title: 'ERROR 404 RESUME', img: error404Resume, category: 'Tech', color: 'text-cyan-500', bg: 'bg-[#0a0a0a]', border: 'border-cyan-600' },
    { id: 3, title: 'ESCAPE THE CLASSROOM', img: escapeTheClassroom, category: 'Adventure', color: 'text-red-500', bg: 'bg-[#1c1917]', border: 'border-red-600' },
    { id: 4, title: 'IPL AUCTION', img: iplAuction, category: 'Sports', color: 'text-blue-500', bg: 'bg-[#0f172a]', border: 'border-blue-600' },
    { id: 5, title: 'MUSICAL CHAIRS', img: musicalChairs, category: 'Fun & Games', color: 'text-pink-500', bg: 'bg-[#1a1a1a]', border: 'border-pink-600' },
    { id: 6, title: 'CANVAS OF CHAOS', img: canvasOfChaos, category: 'Art', color: 'text-purple-500', bg: 'bg-[#1c1917]', border: 'border-purple-600' },
    { id: 7, title: 'WATER BALLOON COMBAT', img: laserTag, category: 'Action', color: 'text-green-500', bg: 'bg-[#0a0a0a]', border: 'border-green-600' },
    { id: 8, title: 'MATHI YOSI', img: mathiYosi, category: 'Brain Teaser', color: 'text-orange-500', bg: 'bg-[#1c1917]', border: 'border-orange-600' },
    { id: 9, title: 'PRODUCT PITCH FROM HELL', img: productPitch, category: 'Marketing', color: 'text-yellow-400', bg: 'bg-[#0f172a]', border: 'border-yellow-500' },
    { id: 10, title: 'PROP O RAMA', img: propORama, category: 'Drama', color: 'text-red-400', bg: 'bg-[#1a1a1a]', border: 'border-red-500' },
    { id: 11, title: 'REVERSE CHARADES', img: reverseCharades, category: 'Fun & Games', color: 'text-cyan-400', bg: 'bg-[#0a0a0a]', border: 'border-cyan-500' },
    { id: 12, title: 'SELL OR KILL', img: sellOrKill, category: 'Marketing', color: 'text-green-400', bg: 'bg-[#1c1917]', border: 'border-green-500' },
    { id: 13, title: 'SHIPWRECK', img: shipwreck, category: 'Drama', color: 'text-blue-400', bg: 'bg-[#0f172a]', border: 'border-blue-500' },
    { id: 14, title: 'WHISPER CHALLENGE', img: whisperChallenge, category: 'Fun & Games', color: 'text-pink-400', bg: 'bg-[#1a1a1a]', border: 'border-pink-500' },
    { id: 15, title: 'TRASHION SHOW', img: trashionShow, category: 'Fashion', color: 'text-purple-400', bg: 'bg-[#1c1917]', border: 'border-purple-500' },
    { id: 16, title: 'TREASURE HUNT', img: treasureHunt, category: 'Adventure', color: 'text-orange-400', bg: 'bg-[#0a0a0a]', border: 'border-orange-500' },
];

const EventGallery = ({ onAddToCart, user, userData, onBookTicket }) => {
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [selectedEventName, setSelectedEventName] = useState("");

    const handleRegisterClick = (e, name) => {
        e.stopPropagation();
        setSelectedEventName(name);
        setIsRegModalOpen(true);
    };

    return (
        <section className="relative min-h-screen py-20 bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#00ffff_0%,_transparent_70%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-marquee text-rasrang-yellow mb-2 tracking-[0.2em] neon-glow-yellow">FESTIVAL EVENTS</h2>
                    <p className="font-cinema text-rasrang-cyan mt-4 tracking-[0.5em] uppercase text-sm md:text-lg">Experience the Extraordinary</p>
                    <div className="w-48 h-1 bg-rasrang-pink mx-auto mt-6"></div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className={`group relative overflow-hidden rounded-lg border-2 ${event.border} ${event.bg} p-2 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]`}
                        >
                            {/* Poster Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 border border-white/10">
                                <img
                                    src={event.img}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                
                                {/* Hover Info */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="font-typewriter text-[10px] text-white/70 uppercase mb-1">A Rasrang Presentation</p>
                                    <h4 className="font-cinema text-white text-lg leading-tight">{event.title}</h4>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 px-2 pb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-cinema tracking-widest text-white/40 uppercase">CERTIFIED U/A</span>
                                    <span className={`text-[12px] font-bold ${event.color} tracking-wider`}>{event.category}</span>
                                </div>
                                <h3 className={`text-xl font-marquee uppercase leading-none truncate ${event.color}`}>
                                    {event.title}
                                </h3>

                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        onClick={(e) => handleRegisterClick(e, event.title)}
                                        className="w-full py-2 border border-current bg-transparent text-white font-cinema text-[11px] transition-all rounded hover:bg-white hover:text-black hover:border-black hover:rounded-[20px]"
                                    >
                                        REGISTER NOW
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Edge */}
                            <div className="absolute top-0 right-0 p-1 opacity-20 pointer-events-none">
                                <div className="flex gap-1 h-3 items-start">
                                    <div className="w-[1px] h-full bg-white"></div>
                                    <div className="w-[2px] h-full bg-white"></div>
                                    <div className="w-[1px] h-full bg-white"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Registration Modal Overlay */}
            <RegistrationModal 
                isOpen={isRegModalOpen} 
                onClose={() => setIsRegModalOpen(false)} 
                eventName={selectedEventName} 
                user={user}
                userData={userData}
            />
        </section>
    );
};

export default EventGallery;
