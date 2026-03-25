import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, LogOut, User, Ticket, RefreshCw, ChevronRight } from 'lucide-react';
import rasrangLogo from '../assets/rasrang-logo.png';
import AudioDirector from './AudioDirector';
import { useClapperSnap } from '../hooks/useClapperSnap';
import { getTicketsByUser, getFacultyPassByUser } from '../services/api';

const GlobalElements = ({ cart, removeFromCart, onCheckout, user, userData, onLogout, onViewTickets }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('cart'); // 'cart' | 'tickets'
    const [myTickets, setMyTickets] = useState([]);
    const [isLoadingTickets, setIsLoadingTickets] = useState(false);
    const { clapProps } = useClapperSnap();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const fetchMyTickets = useCallback(async () => {
        const email = user?.email || userData?.email;
        if (!email) return;
        setIsLoadingTickets(true);
        try {
            const [tickets, facultyPass] = await Promise.all([
                getTicketsByUser(email),
                getFacultyPassByUser(email)
            ]);
            const all = [...(Array.isArray(tickets) ? tickets : [])];
            if (facultyPass) {
                all.push({
                    ticketId: facultyPass.passCode,
                    eventName: 'FACULTY PASS',
                    userName: facultyPass.name,
                    date: 'MARCH 15-16, 2026',
                    venue: `${facultyPass.institution} | ${facultyPass.department}`,
                });
            }
            setMyTickets(all);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoadingTickets(false);
        }
    }, [user, userData]);

    // When cart opens, reset tab and fetch tickets
    useEffect(() => {
        if (isCartOpen) {
            setActiveTab('cart');
            fetchMyTickets();
        }
    }, [isCartOpen]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'tickets') fetchMyTickets();
    };

    const handleCheckout = () => {
        const finalName = userData?.name || user?.displayName || 'GUEST';
        onCheckout(finalName.toUpperCase());
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Header */}
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
                                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                        {user?.photoURL
                                            ? <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
                                            : <div className="w-10 h-10 rounded-full bg-rasrang-pink/20 flex items-center justify-center"><User size={18} className="text-rasrang-pink" /></div>
                                        }
                                        <div className="overflow-hidden">
                                            <p className="text-white font-typewriter text-sm truncate">{userData?.name || user?.displayName || 'User'}</p>
                                            <p className="text-white/40 font-typewriter text-[10px] truncate">{user?.email || userData?.email}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setIsProfileOpen(false); onViewTickets(); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-rasrang-cyan font-typewriter text-sm hover:bg-white/5 transition-colors border-b border-white/5"
                                    >
                                        <Ticket size={16} />
                                        My Tickets
                                    </button>

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

            {/* Floating Cart Button */}
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
                            {(cart.length + myTickets.length) > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-rasrang-pink text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                >
                                    {cart.length + myTickets.length}
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
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-rasrang-charcoal border-l border-white/10 z-[160] flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                                <h3 className="font-marquee text-2xl text-rasrang-yellow tracking-widest uppercase">MY FEST</h3>
                                <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-rasrang-pink transition-colors">
                                    <X size={28} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10 shrink-0">
                                <button
                                    onClick={() => handleTabChange('cart')}
                                    className={`flex-1 py-3 font-cinema text-sm tracking-widest transition-colors ${activeTab === 'cart' ? 'text-rasrang-yellow border-b-2 border-rasrang-yellow' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    CART ({cart.length})
                                </button>
                                <button
                                    onClick={() => handleTabChange('tickets')}
                                    className={`flex-1 py-3 font-cinema text-sm tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'tickets' ? 'text-rasrang-cyan border-b-2 border-rasrang-cyan' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    MY TICKETS ({myTickets.length})
                                    {isLoadingTickets && <RefreshCw size={12} className="animate-spin" />}
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {activeTab === 'cart' ? (
                                    <div className="p-6 space-y-4">
                                        {cart.length === 0 ? (
                                            <p className="font-typewriter text-white/40 text-center mt-20">NO EVENTS SELECTED YET...</p>
                                        ) : (
                                            cart.map((item) => (
                                                <div key={item.id} className="bg-black/40 border border-white/5 p-4 flex justify-between items-center group rounded-md">
                                                    <div>
                                                        <h4 className="text-rasrang-cyan font-marquee text-lg tracking-wider">{item.name}</h4>
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
                                ) : (
                                    <div className="p-6 space-y-3">
                                        {isLoadingTickets ? (
                                            <div className="flex flex-col items-center justify-center mt-20 gap-3">
                                                <RefreshCw size={28} className="text-rasrang-cyan animate-spin" />
                                                <p className="font-typewriter text-white/40 text-sm">LOADING TICKETS...</p>
                                            </div>
                                        ) : myTickets.length === 0 ? (
                                            <p className="font-typewriter text-white/40 text-center mt-20">NO TICKETS GENERATED YET.</p>
                                        ) : (
                                            myTickets.map((ticket, i) => (
                                                <motion.div
                                                    key={ticket.ticketId || i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="bg-black/50 border border-rasrang-cyan/20 rounded-lg p-4 hover:border-rasrang-cyan/50 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-marquee text-rasrang-yellow text-base leading-tight truncate">{ticket.eventName}</p>
                                                            <p className="font-typewriter text-white/50 text-[10px] mt-1 uppercase tracking-widest">{ticket.userName}</p>
                                                            <div className="flex items-center gap-3 mt-2">
                                                                <span className="font-mono text-rasrang-cyan text-[11px] bg-rasrang-cyan/10 px-2 py-0.5 rounded">
                                                                    {ticket.ticketId}
                                                                </span>
                                                                {ticket.date && (
                                                                    <span className="font-typewriter text-white/30 text-[10px]">{ticket.date}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Ticket size={18} className="text-rasrang-cyan/40 shrink-0 mt-1" />
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Cart Footer */}
                            {activeTab === 'cart' && cart.length > 0 && (
                                <div className="p-6 border-t border-white/10 space-y-4 shrink-0">
                                    <div className="w-full bg-black/40 border border-white/10 p-3 font-typewriter text-white/50 text-sm rounded">
                                        {userData?.name ? userData.name.toUpperCase() : (user?.displayName?.toUpperCase() || 'GUEST')}
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-rasrang-yellow text-black font-marquee text-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 rounded"
                                    >
                                        BOOK {cart.length} TICKET{cart.length > 1 ? 'S' : ''}
                                    </button>
                                </div>
                            )}

                            {/* Tickets Footer */}
                            {activeTab === 'tickets' && myTickets.length > 0 && (
                                <div className="p-6 border-t border-white/10 shrink-0">
                                    <button
                                        onClick={() => { setIsCartOpen(false); onViewTickets(); }}
                                        className="w-full py-3 border border-rasrang-cyan/30 text-rasrang-cyan font-cinema text-sm hover:bg-rasrang-cyan/10 transition-colors rounded flex items-center justify-center gap-2"
                                    >
                                        VIEW FULL TICKET DISPLAY <ChevronRight size={16} />
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
