import React from 'react';
import { motion } from 'framer-motion';
import theatreEntrance from '../assets/theatre-entrance.jpg';

const HeroTheatre = ({ onBook, onProShow, userType }) => {
    return (
        <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-rasrang-black gap-6 sm:gap-8 md:gap-12">
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
                className="relative z-10 text-center w-full max-w-4xl scale-90 sm:scale-95 md:scale-100"
            >
                <div className="border-4 sm:border-6 md:border-8 border-rasrang-pink p-4 sm:p-6 md:p-8 lg:p-10 bg-rasrang-black shadow-[0_0_30px_rgba(255,0,127,0.3)] sm:shadow-[0_0_40px_rgba(255,0,127,0.3)] md:shadow-[0_0_50px_rgba(255,0,127,0.3)] mx-2 sm:mx-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-marquee text-rasrang-yellow neon-glow-pink tracking-tighter leading-tight">
                        rasrang '26
                    </h1>
                    <p className="text-rasrang-cyan font-cinema text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-4 tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase leading-tight">
                        The Cinema of Fest
                    </p>
                </div>

                {/* Marquee Lights Animation */}
                <div className="absolute -top-2 sm:-top-3 md:-top-4 -left-2 sm:-left-3 md:-left-4 w-[105%] sm:w-[102%] md:w-full h-auto sm:h-full aspect-video border-1 sm:border-2 border-white/20 pointer-events-none scale-90 sm:scale-100 origin-center">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-rasrang-yellow rounded-full shadow-[0_0_8px_#FFD700] sm:shadow-[0_0_10px_#FFD700]"
                            style={{
                                top: i < 3 ? '-3px' : i < 6 ? `${(i - 2) * 33}%` : i < 9 ? '100%' : `${(i - 8) * 33}%`,
                                left: i < 3 ? `${i * 50}%` : i < 6 ? '100%' : i < 9 ? `${(8 - i) * 50}%` : '-3px',
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
                className="z-10 glass-morphic p-6 sm:p-8 rounded-lg w-11/12 sm:max-w-sm md:w-full mx-auto max-w-md border-2 border-rasrang-cyan/30 flex flex-col items-center"
            >
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                    <div className="text-rasrang-yellow font-marquee text-xl sm:text-2xl">BOX OFFICE</div>
                    <div className="text-rasrang-pink font-typewriter text-xs sm:text-sm">NO: #0001</div>
                </div>

                <div className="text-center mb-6 sm:mb-8 w-full">
                    <p className="text-rasrang-cyan text-xs sm:text-sm mb-1 uppercase tracking-widest font-cinema">Admit One</p>
                    <div className="h-px bg-gradient-to-r from-transparent via-rasrang-cyan to-transparent mb-2 sm:mb-4"></div>
                    <p className="text-white font-typewriter text-lg sm:text-xl md:text-2xl leading-tight">GRANDE FINALE</p>
                </div>

                {userType !== 'student' && (
                    <button
                        onClick={onBook}
                        className="w-full min-h-12 py-3 sm:py-4 bg-rasrang-pink text-white font-marquee text-lg sm:text-2xl hover:bg-rasrang-yellow hover:text-rasrang-black transition-colors duration-300 shadow-[0_0_15px_#FF007F] sm:shadow-[0_0_20px_#FF007F] hover:shadow-[0_0_20px_#FFD700] rounded-md"
                    >
                        GET FACULTY PASS
                    </button>
                )}

                <button
                    onClick={onProShow}
                    className="w-full mt-3 sm:mt-4 relative group overflow-hidden min-h-14"
                    style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FFD700 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'shimmerBg 3s ease infinite',
                        padding: '0',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    {/* Pulsing outer glow ring */}
                    <span className="absolute inset-0 rounded-md animate-ping bg-rasrang-yellow opacity-20 pointer-events-none" style={{ animationDuration: '2s' }}></span>

                    {/* Shadow offset panel */}
                    <span className="absolute inset-0 bg-rasrang-pink translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 rounded-md"></span>

                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 bg-white/30 pointer-events-none"></span>

                    {/* Button content */}
                    <span className="relative z-10 flex flex-col items-center justify-center py-3 sm:py-4 px-4 sm:px-6 gap-0.5 sm:gap-1">
                        <span className="flex items-center gap-1 sm:gap-2 font-marquee text-rasrang-black text-lg sm:text-2xl leading-none tracking-wider">
                            <span className="text-base sm:text-xl">✦</span>
                            BOOK PRO SHOW
                            <span className="text-base sm:text-xl">✦</span>
                        </span>
                        <span className="font-typewriter text-[8px] sm:text-[10px] text-black/60 uppercase tracking-[0.2em] sm:tracking-[0.4em]">2 NIGHTS · GRAND FINALE</span>
                    </span>
                </button>

            </motion.div>


        </section>
    );
};


export default HeroTheatre;
