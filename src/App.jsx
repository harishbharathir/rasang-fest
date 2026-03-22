import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import TicketModal from './components/TicketModal';
import BookTicketModal from './components/BookTicketModal';
import CensorCertificate from './components/CensorCertificate';
import HeroTheatre from './components/HeroTheatre';
import CulturalWall from './components/CulturalWall';
import TechProjection from './components/TechProjection';
import ProShowStage from './components/ProShowStage';
import GlobalElements from './components/GlobalElements';
import FacultyPassModal from './components/FacultyPassModal';
import RegistrationScreen from './components/RegistrationScreen';
import { createBooking, getTicketsByUser, getFacultyPassByUser } from './services/api';

function App() {
    const [appUser, setAppUser] = useState(undefined); // { type, data }
    const [showRegistration, setShowRegistration] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isTicketOpen, setIsTicketOpen] = useState(false);
    const [ticketData, setTicketData] = useState([]);
    const [cart, setCart] = useState([]);
    const [isFacultyPassOpen, setIsFacultyPassOpen] = useState(false);
    const [isBookTicketOpen, setIsBookTicketOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        // Load user from localStorage on init
        const savedUser = localStorage.getItem('rasrang_user');
        if (savedUser) {
            try {
                setAppUser(JSON.parse(savedUser));
            } catch (e) {
                setAppUser(null);
            }
        } else {
            setAppUser(null);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 4500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = (user) => {
        setAppUser(user);
        localStorage.setItem('rasrang_user', JSON.stringify(user));
    };

    const handleLogout = () => {
        setAppUser(null);
        localStorage.removeItem('rasrang_user');
    };

    const addToCart = (event) => {
        setCart((prev) => {
            if (prev.find(item => item.id === event.id)) return prev;
            return [...prev, event];
        });
    };

    const removeFromCart = (eventId) => {
        setCart((prev) => prev.filter(item => item.id !== eventId));
    };

    const handleCheckout = async (userName) => {
        try {
            const bookingData = {
                userName,
                email: appUser?.data?.email,
                events: cart.map(item => item.name)
            };
            const result = await createBooking(bookingData);
            if (result && result.tickets) {
                setTicketData(result.tickets);
                setIsTicketOpen(true);
                setCart([]);
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert(error.message || "Booking failed. Please check if the server is running.");
        }
    };

    const handleViewTickets = async () => {
        if (!appUser?.data?.email) return;
        try {
            const [tickets, facultyPass] = await Promise.all([
                getTicketsByUser(appUser.data.email),
                getFacultyPassByUser(appUser.data.email)
            ]);

            const allTickets = [...(Array.isArray(tickets) ? tickets : [])];
            
            if (facultyPass) {
                allTickets.push({
                    userName: facultyPass.name,
                    eventName: "FACULTY PASS",
                    ticketId: facultyPass.passCode,
                    qrCode: facultyPass.qrCode,
                    venue: `${facultyPass.institution} | ${facultyPass.department}`,
                    date: "MARCH 15-16, 2026",
                    time: "ALL FEST SESSIONS"
                });
            }

            if (allTickets.length === 0) {
                alert("No tickets found for your email.");
                return;
            }

            setTicketData(allTickets);
            setIsTicketOpen(true);
        } catch (error) {
            console.error("Error fetching tickets:", error);
            alert("Failed to fetch your tickets. Please try again.");
        }
    };

    if (appUser === undefined) return null;
    
    if (!appUser) {
        if (showRegistration) {
            return (
                <RegistrationScreen 
                    onRegistered={(data) => {
                        handleLogin(data);
                        setShowRegistration(false);
                    }} 
                    onBack={() => setShowRegistration(false)}
                />
            );
        }
        return <LoginScreen onLogin={handleLogin} onShowRegister={() => setShowRegistration(true)} />;
    }

    const userData = appUser.data;
    const userType = appUser.type;

    return (
        <main className="relative bg-rasrang-black selection:bg-rasrang-pink selection:text-white">
            <AnimatePresence mode="wait">
                {loading && <CensorCertificate key="loader" onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            <div className={`${loading ? 'hidden' : 'block'}`}>
                <GlobalElements
                    cart={cart}
                    removeFromCart={removeFromCart}
                    onCheckout={handleCheckout}
                    onViewTickets={handleViewTickets}
                    user={userData} // Passing userData as 'user' for compatibility
                    userData={userData}
                    onLogout={handleLogout}
                />

                <div className="relative">
                    <ActWrapper id="act1"><HeroTheatre onBook={() => setIsFacultyPassOpen(true)} userType={userType} /></ActWrapper>
                    <ActWrapper id="act2"><CulturalWall onAddToCart={addToCart} user={userData} userData={userData} /></ActWrapper>
                    <ActWrapper id="act3"><TechProjection onBookTicket={(event) => { setCurrentEvent(event); setIsBookTicketOpen(true); }} /></ActWrapper>
                    <ActWrapper id="act4"><ProShowStage onAddToCart={addToCart} /></ActWrapper>
                </div>

                <FacultyPassModal isOpen={isFacultyPassOpen} onClose={() => setIsFacultyPassOpen(false)} user={userData} />
                <BookTicketModal 
                    isOpen={isBookTicketOpen} 
                    onClose={() => setIsBookTicketOpen(false)} 
                    event={currentEvent} 
                    user={userData}
                    userData={userData}
                />
                <TicketModal
                    isOpen={isTicketOpen}
                    onClose={() => setIsTicketOpen(false)}
                    tickets={Array.isArray(ticketData) ? ticketData : [ticketData]}
                />

                <footer className="py-20 bg-rasrang-charcoal text-center border-t border-white/10">
                    <h2 className="text-4xl md:text-6xl font-marquee text-rasrang-yellow mb-8 tracking-widest">rasrang '26</h2>
                    <div className="flex justify-center gap-12 font-cinema text-rasrang-cyan mb-12 uppercase text-sm">
                        <a href="#" className="hover:text-rasrang-pink transition-colors underline-offset-8 hover:underline">Support</a>
                        <a href="#" className="hover:text-rasrang-pink transition-colors underline-offset-8 hover:underline">Cast</a>
                        <a href="#" className="hover:text-rasrang-pink transition-colors underline-offset-8 hover:underline">Legacy</a>
                    </div>
                    <p className="font-typewriter text-white/40 text-xs">MADE BY THE DREAMERS & DIRECTORS OF rasrang</p>
                    <p className="font-typewriter text-white/20 text-[10px] mt-2">© 2026. ALL RIGHTS RESERVED. UA CERTIFIED.</p>
                </footer>
            </div>
        </main>
    );
}

const ActWrapper = ({ children, id }) => (
    <section id={id} className="relative w-full">
        {children}
    </section>
);

export default App;
