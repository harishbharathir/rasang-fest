import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Megaphone, MegaphoneOff, Menu, X, ShoppingCart } from 'lucide-react';
import rasrangLogo from '../assets/rasrang-logo.png';
import AudioDirector from './AudioDirector';
import { useClapperSnap } from '../hooks/useClapperSnap';

const GlobalElements = ({ cart, removeFromCart, onCheckout }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const { clapProps } = useClapperSnap();

    const handleCheckout = () => {
        if (!userName.trim()) {
            alert("Please enter your name for the ticket!");
            return;
        }
        onCheckout(userName.toUpperCase());
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Header / Director Toggle */}
            <header className="fixed top-0 left-0 w-full z-[80] p-6 flex justify-between items-center pointer-events-none">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="pointer-events-auto flex items-center gap-4 bg-rasrang-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full"
                >
                    <img src={rasrangLogo} alt="Rasang Logo" className="w-40 h-20 object-cover rounded-full" />
                </motion.div>

                <div className="flex gap-4 pointer-events-auto">
                    <AudioDirector />
                    <button className="w-12 h-12 glass-morphic rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            {/* Floating Cart (Golden Ticket) */}
            <motion.div
                className="fixed bottom-8 right-8 z-[90] cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                {...clapProps}
                onClick={() => setIsCartOpen(true)}
            >
                <div className="relative group">
                    <div className="bg-rasrang-yellow w-16 h-10 flex items-center justify-center rounded-sm shadow-[0_0_20px_#FFD700] rotate-[-15deg] group-hover:rotate-0 transition-transform">
                        <ShoppingCart size={24} className="text-rasrang-black" />
                        <AnimatePresence>
                            {cart.length > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-rasrang-pink text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                >
                                    {cart.length}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-rasrang-black rounded-full"></div>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-rasrang-black rounded-full"></div>
                </div>
            </motion.div>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-rasrang-charcoal border-l border-white/10 z-[160] p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="font-marquee text-3xl text-rasrang-yellow tracking-widest uppercase">YOUR SELECTIONS</h3>
                                <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-rasrang-pink transition-colors">
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 mb-8 custom-scrollbar">
                                {cart.length === 0 ? (
                                    <p className="font-typewriter text-white/40 text-center mt-20">NO EVENTS SELECTED YET...</p>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="bg-black/40 border border-white/5 p-4 flex justify-between items-center group">
                                            <div>
                                                <h4 className="text-rasrang-cyan font-marquee text-xl tracking-wider">{item.name}</h4>
                                                <p className="text-[10px] font-typewriter text-white/30 uppercase tracking-widest">ADMIT ONE • FREE ENTRY</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-white/20 hover:text-rasrang-pink transition-colors p-2"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <label className="block font-typewriter text-rasrang-cyan text-[10px] uppercase mb-2 tracking-widest opacity-60">
                                            Ticket Holder Name
                                        </label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value.toUpperCase())}
                                            placeholder="ENTER NAME..."
                                            className="w-full bg-black/40 border border-white/10 p-4 font-typewriter text-white placeholder:text-white/10 focus:border-rasrang-pink focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-rasrang-yellow text-black font-marquee text-2xl hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                                    >
                                        DOWNLOAD TICKETS
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Cinematic Borders Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] md:border-[40px] border-black opacity-10"></div>
        </>
    );
};

export default GlobalElements;
