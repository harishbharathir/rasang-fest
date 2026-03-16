import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TicketModal from './components/TicketModal';
import CensorCertificate from './components/CensorCertificate';
import HeroTheatre from './components/HeroTheatre';
import CulturalWall from './components/CulturalWall';
import TechProjection from './components/TechProjection';
import ProShowStage from './components/ProShowStage';
import GlobalElements from './components/GlobalElements';
import { createBooking } from './services/api';

function App() {
    const [loading, setLoading] = useState(true);
    const [isTicketOpen, setIsTicketOpen] = useState(false);
    const [ticketData, setTicketData] = useState(null); // Can be an array of tickets or a single ticket object
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Simulate loading/censor board duration
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4500); // Allow time for burn animation
        return () => clearTimeout(timer);
    }, []);

    const handleShowTicket = (data) => {
        setTicketData(data);
        setIsTicketOpen(true);
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
                events: cart.map(item => item.name)
            };
            const result = await createBooking(bookingData);
            if (result && result.tickets) {
                setTicketData(result.tickets);
                setIsTicketOpen(true);
                setCart([]); // Clear cart after success
            }
        } catch (error) {
            alert("Booking failed. Please check if the server is running.");
        }
    };

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
                />

                {/* Scroll Narrative Container */}
                <div className="relative">
                    {/* Each Act is a separate scroll target */}
                    <ActWrapper id="act1"><HeroTheatre onBook={() => addToCart({ id: 'pro', name: 'GRAND FINALE PRO SHOW' })} /></ActWrapper>
                    <ActWrapper id="act2"><CulturalWall onAddToCart={addToCart} /></ActWrapper>
                    <ActWrapper id="act3"><TechProjection onAddToCart={addToCart} /></ActWrapper>
                    <ActWrapper id="act4"><ProShowStage onAddToCart={addToCart} /></ActWrapper>
                </div>

                <TicketModal
                    isOpen={isTicketOpen}
                    onClose={() => setIsTicketOpen(false)}
                    tickets={Array.isArray(ticketData) ? ticketData : [ticketData]}
                />

                {/* Footer */}
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
