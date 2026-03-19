import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithGoogle } from '../firebase';
import googleBg from '../assets/google-bg.png';

export default function GoogleSignIn({ onSignIn }) {
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        setError('');
        try {
            const result = await signInWithGoogle();
            onSignIn(result.user);

        } catch {
            setError('Sign-in failed. Please try again.');
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 scale-105">
                <img 
                    src={googleBg} 
                    alt="Cinema Backdrop" 
                    className="w-full h-full object-cover filter brightness-[0.35] saturate-[0.7] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                {/* Film grain effect hint */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-7xl md:text-9xl font-marquee text-rasrang-yellow tracking-[0.15em] mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] uppercase select-none">
                        rasrang '26
                    </h1>
                    <div className="h-1.5 w-full bg-rasrang-pink mx-auto mb-6 shadow-[0_0_15px_#FF007F]"></div>
                    <p className="font-cinema text-rasrang-cyan uppercase text-lg md:text-xl tracking-[0.5em] mb-16 drop-shadow-md brightness-125">
                        The Grand Cultural Fest
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.button
                        onClick={handleSignIn}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-5 bg-white text-black font-marquee text-2xl px-12 py-5 rounded-sm shadow-[10px_10px_0_#FFD700] hover:shadow-[5px_5px_0_#FFD700] hover:translate-x-[5px] hover:translate-y-[5px] transition-all group relative border-2 border-transparent hover:border-rasrang-cyan"
                    >
                        <div className="bg-white p-1 rounded-full border border-gray-200 group-hover:border-black transition-colors scale-125">
                            <svg width="24" height="24" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                        </div>
                        <span className="ml-2 uppercase tracking-widest">ADMIT ONE</span>
                    </motion.button>
                </motion.div>

                {error && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-rasrang-pink font-typewriter text-base uppercase tracking-widest animate-pulse"
                    >
                        * ERROR: {error} *
                    </motion.p>
                )}
            </div>

            {/* Vintage UI Decor */}
            <div className="absolute top-10 left-10 border border-white/10 p-4 font-typewriter text-[10px] text-white/20 uppercase tracking-[0.3em] pointer-events-none hidden md:block">
                <p>System Status: ONLINE</p>
                <p>Projector: ACTIVE</p>
                <p>Roll: #2026-X</p>
            </div>
            <div className="absolute bottom-10 right-10 border border-white/10 p-4 font-typewriter text-[10px] text-white/20 uppercase tracking-[0.3em] pointer-events-none hidden md:block">
                <p>Location: SRM TRICHY</p>
                <p>Auth Mode: GOOGLE_OAUTH</p>
                <p>Certified UA</p>
            </div>
        </motion.div>
    );
}
