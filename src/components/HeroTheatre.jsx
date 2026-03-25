import React from 'react';
import { motion } from 'framer-motion';
import theatreEntrance from '../assets/theatre-entrance.jpg';

const HeroTheatre = ({ onBook, onProShow, userType }) => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-rasrang-black">
            {/* Background Texture Placeholder */}
            <img
                src={theatreEntrance}
                alt="Vintage Theatre Entrance"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />

            {/* Neon Marquee Header */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10 text-center mb-12"
            >
                <div className="border-8 border-rasrang-pink p-6 md:p-10 bg-rasrang-black shadow-[0_0_50px_rgba(255,0,127,0.3)]">
                    <h1 className="text-7xl md:text-9xl font-marquee text-rasrang-yellow neon-glow-pink tracking-tighter">
                        rasrang '26
                    </h1>
                    <p className="text-rasrang-cyan font-cinema text-xl md:text-2xl mt-4 tracking-[0.5em] uppercase">
                        The Cinema of Fest
                    </p>
                </div>

                {/* Marquee Lights Animation */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-white/20 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            className="absolute w-2 h-2 bg-rasrang-yellow rounded-full shadow-[0_0_10px_#FFD700]"
                            style={{
                                top: i < 3 ? '-4px' : i < 6 ? `${(i - 2) * 33}%` : i < 9 ? '100%' : `${(i - 8) * 33}%`,
                                left: i < 3 ? `${i * 50}%` : i < 6 ? '100%' : i < 9 ? `${(8 - i) * 50}%` : '-4px',
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Ticket Booth Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="z-10 glass-morphic p-8 rounded-lg max-w-sm w-full mx-4 border-2 border-rasrang-cyan/30 flex flex-col items-center"
            >
                <div className="w-full flex justify-between items-center mb-6">
                    <div className="text-rasrang-yellow font-marquee text-2xl">BOX OFFICE</div>
                    <div className="text-rasrang-pink font-typewriter text-sm">NO: #0001</div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-rasrang-cyan text-sm mb-1 uppercase tracking-widest font-cinema">Admit One</p>
                    <div className="h-px bg-gradient-to-r from-transparent via-rasrang-cyan to-transparent mb-4"></div>
                    <p className="text-white font-typewriter text-xl">GRANDE FINALE</p>
                </div>

                {userType !== 'student' && (
                    <button
                        onClick={onBook}
                        className="w-full py-4 bg-rasrang-pink text-white font-marquee text-2xl hover:bg-rasrang-yellow hover:text-rasrang-black transition-colors duration-300 shadow-[0_0_20px_#FF007F] hover:shadow-[0_0_20px_#FFD700]"
                    >
                        GET FACULTY PASS
                    </button>
                )}

                <button
                    onClick={onProShow}
                    className="w-full mt-4 relative group overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FFD700 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'shimmerBg 3s ease infinite',
                        padding: '0',
                        border: 'none',
                        borderRadius: '2px',
                    }}
                >
                    {/* Pulsing outer glow ring */}
                    <span className="absolute inset-0 rounded-sm animate-ping bg-rasrang-yellow opacity-20 pointer-events-none" style={{ animationDuration: '2s' }}></span>

                    {/* Shadow offset panel */}
                    <span className="absolute inset-0 bg-rasrang-pink translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 rounded-sm"></span>

                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 bg-white/30 pointer-events-none"></span>

                    {/* Button content */}
                    <span className="relative z-10 flex flex-col items-center justify-center py-4 px-6 gap-1">
                        <span className="flex items-center gap-2 font-marquee text-rasrang-black text-2xl leading-none tracking-wider">
                            <span className="text-xl">✦</span>
                            BOOK PRO SHOW
                            <span className="text-xl">✦</span>
                        </span>
                        <span className="font-typewriter text-[10px] text-black/60 uppercase tracking-[0.4em]">2 NIGHTS · GRAND FINALE</span>
                    </span>
                </button>

            </motion.div>


        </section>
    );
};

export default HeroTheatre;
