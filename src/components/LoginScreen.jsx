import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import googleBg from '../assets/google-bg.png';

export default function LoginScreen({ onLogin, onShowRegister }) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await loginUser({ identifier, password });
            onLogin(result);
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background Image with Overlay (Reusing same aesthetic) */}
            <div className="absolute inset-0 z-0 scale-105">
                <img 
                    src={googleBg} 
                    alt="Cinema Backdrop" 
                    className="w-full h-full object-cover filter brightness-[0.35] saturate-[0.7] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-md">
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-marquee text-rasrang-yellow tracking-[0.15em] mb-2 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] uppercase select-none">
                        rasrang '26
                    </h1>
                    <div className="h-1 w-32 bg-rasrang-pink mx-auto mb-4 shadow-[0_0_15px_#FF007F]"></div>
                    <p className="font-cinema text-rasrang-cyan uppercase text-sm md:text-base tracking-[0.3em] mb-10 drop-shadow-md brightness-125">
                        ADMIT ONE
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="w-full bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="text-left space-y-2">
                            <label className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-typewriter">Roll No / Employee ID</label>
                            <input 
                                required
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 focus:border-rasrang-yellow p-4 text-white font-mono text-sm outline-none transition-all rounded-sm"
                                placeholder="URK20XXX / EMP123"
                            />
                        </div>

                        <div className="text-left space-y-2">
                            <label className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-typewriter">Password (Mobile Number)</label>
                            <input 
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 focus:border-rasrang-yellow p-4 text-white font-mono text-sm outline-none transition-all rounded-sm"
                                placeholder="••••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-rasrang-pink font-typewriter text-xs uppercase tracking-widest animate-pulse">
                                * {error} *
                            </p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-rasrang-yellow text-black font-marquee text-2xl py-4 rounded-sm shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all uppercase tracking-widest disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Sign In'}
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <button 
                            onClick={onShowRegister}
                            className="text-white/40 hover:text-rasrang-cyan font-typewriter text-xs uppercase tracking-[0.2em] transition-colors"
                        >
                            New here? <span className="underline underline-offset-4">Register Now</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Vintage UI Decor */}
            <div className="absolute top-10 left-10 border border-white/10 p-4 font-typewriter text-[10px] text-white/20 uppercase tracking-[0.3em] pointer-events-none hidden md:block">
                <p>System Status: ONLINE</p>
                <p>Projector: ACTIVE</p>
                <p>Roll: #2026-AUTH</p>
            </div>
            <div className="absolute bottom-10 right-10 border border-white/10 p-4 font-typewriter text-[10px] text-white/20 uppercase tracking-[0.3em] pointer-events-none hidden md:block">
                <p>Location: SRM TRICHY</p>
                <p>Auth Mode: CUSTOM_DB</p>
                <p>Certified UA</p>
            </div>
        </motion.div>
    );
}
