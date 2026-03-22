import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, LogOut, User, Ticket } from 'lucide-react';
import rasrangLogo from '../assets/rasrang-logo.png';
import AudioDirector from './AudioDirector';
import { useClapperSnap } from '../hooks/useClapperSnap';

const GlobalElements = ({ cart, removeFromCart, onCheckout, user, userData, onLogout, onViewTickets }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { clapProps } = useClapperSnap();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleCheckout = () => {
        const finalName = userData?.name || user?.displayName || 'GUEST';
        onCheckout(finalName.toUpperCase());
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
                    {/* User Avatar Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(p => !p)}
                            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-rasrang-cyan transition-colors"
                        >
                            {user?.photoURL
                                ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                                : <div className="w-full h-full glass-morphic flex items-center justify-center text-white"><User size={20} /></div>
                            }
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-64 bg-[#111] border border-white/10 rounded-md shadow-2xl overflow-hidden z-[200]"
                                >
                                    {/* Profile Info */}
                                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                        {user?.photoURL
                                            ? <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
                                            : <div className="w-10 h-10 rounded-full bg-rasrang-pink/20 flex items-center justify-center"><User size={18} className="text-rasrang-pink" /></div>
                                        }
                                        <div className="overflow-hidden">
                                            <p className="text-white font-typewriter text-sm truncate">{user?.displayName || 'User'}</p>
                                            <p className="text-white/40 font-typewriter text-[10px] truncate">{user?.email}</p>
                                        </div>
                                    </div>

                                    {/* My Tickets */}
                                    <button
                                        onClick={() => { setIsProfileOpen(false); onViewTickets(); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-rasrang-cyan font-typewriter text-sm hover:bg-white/5 transition-colors border-b border-white/5"
                                    >
                                        <Ticket size={16} />
                                        My Tickets
                                    </button>

                                    {/* Logout */}
                                    <button
                                        onClick={() => { setIsProfileOpen(false); onLogout(); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-rasrang-pink font-typewriter text-sm hover:bg-white/5 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                                        <div className="w-full bg-black/40 border border-white/10 p-4 font-typewriter text-white transition-colors cursor-not-allowed text-white/50">
                                            {userData?.name ? userData.name.toUpperCase() : (user?.displayName?.toUpperCase() || 'GUEST')}
                                        </div>
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
