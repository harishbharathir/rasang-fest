import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import EventTicket from './EventTicket';
import { createBooking, getTicketsByUser } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BookTicketModal = ({ isOpen, onClose, event, user }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        email: user?.email || '',
        mobile: ''
    });

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setSubmitted(false);
            setTicket(null);
            setFormData(prev => ({ ...prev, email: user?.email || '' }));

            // Pre-check if already booked
            if (user?.email && event?.title) {
                getTicketsByUser(user.email).then(tickets => {
                    const existing = (tickets || []).find(t => t.eventName === event.title);
                    if (existing) {
                        setTicket(existing);
                        setSubmitted(true);
                        setFormData(prev => ({ ...prev, name: existing.userName || prev.name }));
                    }
                }).catch(console.error);
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => document.body.style.overflow = 'unset';
    }, [isOpen]);

    if (!isOpen || !event) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const bookingData = {
                userName: formData.name,
                email: formData.email,
                events: [event.title]
            };
            const result = await createBooking(bookingData);
            if (result && result.tickets && result.tickets.length > 0) {
                setTicket(result.tickets[0]);
                setSubmitted(true);
            }
        } catch (error) {
            alert(error.message || "Booking failed. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        const ticketElement = document.getElementById('book-ticket-inner');
        if (!ticketElement) return;

        try {
            const canvas = await html2canvas(ticketElement, { 
                scale: 3, 
                useCORS: true, 
                backgroundColor: null,
                onclone: (clonedDoc) => {
                    const ticket = clonedDoc.getElementById('book-ticket-inner');
                    if (ticket) {
                        // EventTicket has aspectRatio '1000 / 415'
                        ticket.style.width = '1000px';
                        ticket.style.height = '415px';
                        ticket.style.aspectRatio = 'auto';
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const { width, height } = pdf.internal.pageSize;
            
            // Standard ticket width in PDF
            const imgWidth = 220;
            const imgHeight = (imgWidth * canvas.height) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
            pdf.save(`${event.title.replace(/\s+/g, '_')}_ticket.pdf`);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to generate ticket. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-default"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-gray-900/95 to-black border-4 border-gradient-to-r from-cyan-500/30 to-emerald-500/30 rounded-3xl shadow-2xl max-h-[95vh] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-2 border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
                                    {submitted ? 'YOUR TICKET' : 'EVENT REGISTRATION'}
                                </h3>
                                <p className={`text-lg font-bold mt-1 ${event.color} drop-shadow-md`}>{event.title}</p>
                                <p className="text-sm text-gray-400 font-mono">{event.subtitle}</p>
                            </div>
                            <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm">
                                <X size={28} className="text-gray-300" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="space-y-6 text-center"
                                >
                                    {/* Enhanced ticket preview */}
                                    <div id="book-ticket-inner" className="mx-auto w-full relative">
                                        <EventTicket 
                                            userName={formData.name}
                                            eventName={event.title}
                                            ticketId={ticket?.ticketId}
                                            qrCode={ticket?.qrCode}
                                            date={event.date || "MARCH 15-16, 2026"}
                                            time={event.time || "10:00 AM ONWARDS"}
                                            venue={event.venue || "PROJECTION ROOM"}
                                        />
                                    </div>
                                    
                                    <div className="space-y-4 pt-4">
                                        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                            <p className="font-mono text-sm text-emerald-400 mb-1">Ticket Confirmed!</p>
                                            <p className="text-xs text-gray-400 font-mono">Attendee: {formData.name}</p>
                                            <p className="text-xs text-gray-400 font-mono">ID: {formData.rollNo}</p>
                                        </div>
                                        <button 
                                            onClick={handleDownload} 
                                            className="w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-glow hover:scale-[1.02] transition-all text-lg flex items-center justify-center gap-3"
                                        >
                                            <Download className="w-6 h-6" />
                                            Download PDF Ticket
                                        </button>
                                        <button 
                                            onClick={onClose} 
                                            className="w-full py-3 px-6 border-2 border-gradient-to-r from-cyan-400/50 to-emerald-400/50 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-3 backdrop-blur-sm">Full Name *</label>
                                        <input 
                                            required 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange}
                                            className="w-full h-14 px-5 bg-white/10 border-2 border-white/30 rounded-2xl text-white font-mono placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all backdrop-blur-md text-lg" 
                                            placeholder="Enter your full name" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-3 backdrop-blur-sm">Roll No. *</label>
                                        <input 
                                            required 
                                            name="rollNo" 
                                            value={formData.rollNo} 
                                            onChange={handleChange}
                                            className="w-full h-14 px-5 bg-white/10 border-2 border-white/30 rounded-2xl text-white font-mono placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all backdrop-blur-md text-lg uppercase" 
                                            placeholder="URK20XX000" 
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-200 mb-3 backdrop-blur-sm">Email *</label>
                                            <input 
                                                required 
                                                type="email"
                                                name="email" 
                                                value={formData.email} 
                                                readOnly
                                                onChange={handleChange}
                                                className="w-full h-14 px-5 bg-white/10 border-2 border-white/30 rounded-2xl text-white/70 font-mono placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all backdrop-blur-md cursor-not-allowed" 
                                                placeholder="your@email.com" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-200 mb-3 backdrop-blur-sm">Mobile *</label>
                                            <input 
                                                required 
                                                type="tel"
                                                name="mobile" 
                                                value={formData.mobile} 
                                                onChange={handleChange}
                                                className="w-full h-14 px-5 bg-white/10 border-2 border-white/30 rounded-2xl text-white font-mono placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all backdrop-blur-md" 
                                                placeholder="+91 9876543210" 
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className={`w-full h-16 font-black text-xl rounded-3xl shadow-2xl transition-all uppercase tracking-wider ${isLoading ? 'bg-gray-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-[1.02] text-shadow-lg'}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block" />
                                                PROCESSING...
                                            </>
                                        ) : (
                                            'SECURE YOUR PROJECTION PASS'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookTicketModal;

