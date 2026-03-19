import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import CulturalTicket from './CulturalTicket';
import { createBooking } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RegistrationModal = ({ isOpen, onClose, eventName }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        institution: '',
        email: '',
        mobile: ''
    });

    // Prevent body scroll when modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const bookingData = {
                userName: `${formData.name} - ${formData.institution}`,
                email: formData.email,
                events: [eventName]
            };
            const result = await createBooking(bookingData);
            if (result && result.tickets) {
                setTicket(result.tickets[0]);
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        const ticketElement = document.getElementById('registration-ticket');
        if (!ticketElement) return;

        try {
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            const drawWidth = imgWidth * ratio * 0.9;
            const drawHeight = imgHeight * ratio * 0.9;
            
            const xPos = (pdfWidth - drawWidth) / 2;
            const yPos = (pdfHeight - drawHeight) / 2;

            pdf.setFillColor(10, 10, 10);
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
            pdf.addImage(imgData, 'PNG', xPos, yPos, drawWidth, drawHeight);
            pdf.save(`${eventName}-Ticket.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-md bg-[#111] border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-white/10 bg-gradient-to-r from-black/80 to-black/50 shrink-0">
                            <div>
                                <h3 className="text-rasrang-yellow font-marquee text-xl tracking-widest uppercase">
                                    {submitted ? 'GOLDEN TICKET' : 'EVENT REG'}
                                </h3>
                                <p className="font-mono text-rasrang-cyan/80 text-xs mt-1 uppercase tracking-wider">
                                    {eventName}
                                </p>
                            </div>
                            <button onClick={onClose} className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex flex-col">
                            {/* Scrollable body */}
                            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2 custom-scrollbar">
                                {submitted ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center gap-4"
                                    >
                                        {/* Compact ticket card */}
w-full max-w-lg">
                                            <div
                                                className="relative shadow-xl overflow-hidden select-none rounded-lg border border-black/20"
                                                style={{
                                                    aspectRatio: '1000 / 415',
                                                    maxHeight: '140px'
                                                }}
                                            >
<CulturalTicket ticket={ticket} rollNo={formData.regNo} eventName={eventName} event={{title: eventName}} />

                                                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
                                                <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 w-full max-w-xs">
                                            <button
                                                onClick={handleDownload}
                                                className="w-full py-3 px-6 bg-gradient-to-r from-rasrang-yellow to-amber-400 text-black font-mono text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-bold"
                                            >
                                                <Download className="inline w-4 h-4 mr-2" />
                                                SAVE TICKET
                                            </button>
                                            <button
                                                onClick={onClose}
                                                className="w-full py-3 px-6 border-2 border-rasrang-cyan/50 text-rasrang-cyan hover:bg-rasrang-cyan hover:text-black font-mono text-sm uppercase tracking-wider rounded-lg transition-all hover:shadow-glow-cyan"
                                            >
                                                DONE ✓
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-white/80 text-xs font-mono uppercase tracking-wider block">NAME *</label>
                                            <input 
                                                required 
                                                name="name" 
                                                value={formData.name} 
                                                onChange={handleChange}
                                                className="w-full h-12 bg-white/10 border border-white/30 rounded-lg px-4 text-white font-mono text-sm placeholder-white/50 focus:border-rasrang-cyan focus:outline-none transition-all" 
                                                placeholder="Full Name" 
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-white/80 text-xs font-mono uppercase tracking-wider block">REG NO *</label>
                                                <input 
                                                    required 
                                                    name="regNo" 
                                                    value={formData.regNo} 
                                                    onChange={handleChange}
                                                    className="w-full h-12 bg-white/10 border border-white/30 rounded-lg px-4 text-white font-mono text-sm placeholder-white/50 focus:border-rasrang-cyan focus:outline-none transition-all" 
                                                    placeholder="URK20XX000" 
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-white/80 text-xs font-mono uppercase tracking-wider block">COLLEGE *</label>
                                                <input 
                                                    required 
                                                    name="institution" 
                                                    value={formData.institution} 
                                                    onChange={handleChange}
                                                    className="w-full h-12 bg-white/10 border border-white/30 rounded-lg px-4 text-white font-mono text-sm placeholder-white/50 focus:border-rasrang-cyan focus:outline-none transition-all" 
                                                    placeholder="College Name" 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-white/80 text-xs font-mono uppercase tracking-wider block">EMAIL *</label>
                                            <input 
                                                required 
                                                type="email"
                                                name="email" 
                                                value={formData.email} 
                                                onChange={handleChange}
                                                className="w-full h-12 bg-white/10 border border-white/30 rounded-lg px-4 text-white font-mono text-sm placeholder-white/50 focus:border-rasrang-cyan focus:outline-none transition-all" 
                                                placeholder="student@college.edu" 
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-white/80 text-xs font-mono uppercase tracking-wider block">PHONE *</label>
                                            <input 
                                                required 
                                                type="tel"
                                                name="mobile" 
                                                value={formData.mobile} 
                                                onChange={handleChange}
                                                className="w-full h-12 bg-white/10 border border-white/30 rounded-lg px-4 text-white font-mono text-sm placeholder-white/50 focus:border-rasrang-cyan focus:outline-none transition-all" 
                                                placeholder="+91 98XXX XXXXX" 
                                            />
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className={`w-full h-14 bg-gradient-to-r from-rasrang-yellow via-amber-400 to-orange-400 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all font-mono uppercase tracking-wider text-sm font-bold rounded-xl text-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="flex items-center justify-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                        SECURING...
                                                    </span>
                                                </>
                                            ) : 'SECURE GOLDEN TICKET'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
