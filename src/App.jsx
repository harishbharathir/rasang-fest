import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from './firebase';
import GoogleSignIn from './components/GoogleSignIn';
import TicketModal from './components/TicketModal';
import CensorCertificate from './components/CensorCertificate';
import HeroTheatre from './components/HeroTheatre';
import CulturalWall from './components/CulturalWall';
import TechProjection from './components/TechProjection';
import ProShowStage from './components/ProShowStage';
import GlobalElements from './components/GlobalElements';
import FacultyPassModal from './components/FacultyPassModal';
import { createBooking } from './services/api';

function App() {
    const [user, setUser] = useState(undefined); // undefined = checking, null = not signed in
    const [loading, setLoading] = useState(true);
    const [isTicketOpen, setIsTicketOpen] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    const [cart, setCart] = useState([]);
    const [isFacultyPassOpen, setIsFacultyPassOpen] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
        return unsub;
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4500);
        return () => clearTimeout(timer);
    }, []);

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
                events: cart.map(item => item.name)
            };
            const result = await createBooking(bookingData);
            if (result && result.tickets) {
                setTicketData(result.tickets);
                setIsTicketOpen(true);
                setCart([]);
            }
        } catch {
            alert("Booking failed. Please check if the server is running.");
        }
    };

    if (user === undefined) return null;
    if (!user) return <GoogleSignIn onSignIn={setUser} />;

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
                    user={user}
                    onLogout={() => { signOutUser(); setUser(null); }}
                />

                <div className="relative">
                    <ActWrapper id="act1"><HeroTheatre onBook={() => setIsFacultyPassOpen(true)} /></ActWrapper>
                    <ActWrapper id="act2"><CulturalWall onAddToCart={addToCart} /></ActWrapper>
                    <ActWrapper id="act3"><TechProjection onAddToCart={addToCart} /></ActWrapper>
                    <ActWrapper id="act4"><ProShowStage onAddToCart={addToCart} /></ActWrapper>
                </div>

                <FacultyPassModal isOpen={isFacultyPassOpen} onClose={() => setIsFacultyPassOpen(false)} />

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
