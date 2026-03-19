import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Download } from 'lucide-react';
import { createBooking } from '../services/api';
import EventTicket from './EventTicket';
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

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const bookingData = {
                userName: formData.name,
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
                        className={`relative z-10 w-full ${submitted ? 'max-w-4xl' : 'max-w-lg'} bg-[#111] border border-white/10 shadow-2xl overflow-hidden rounded-md transition-all duration-500`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                            <div>
                                <h3 className="text-rasrang-yellow font-marquee text-2xl tracking-widest uppercase">
                                    {submitted ? 'YOUR GOLDEN TICKET' : 'REGISTER FOR EVENT'}
                                </h3>
                                <p className="font-typewriter text-rasrang-cyan/80 text-xs mt-1 uppercase">
                                    {eventName}
                                </p>
                            </div>
                            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8 relative">
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-6"
                                >
                                    <div id="registration-ticket" className="w-full">
                                        <EventTicket {...ticket} />
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-2 px-8 py-3 bg-rasrang-yellow text-black hover:bg-white rounded transition-all font-marquee text-lg"
                                        >
                                            <Download size={20} /> DOWNLOAD TICKET
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black rounded transition-all font-marquee text-lg"
                                        >
                                            CLOSE
                                        </button>
                                    </div>
                                    
                                    <p className="font-typewriter text-rasrang-cyan/40 text-[10px] animate-pulse uppercase tracking-[0.2em] text-center mt-2">
                                        * PROOF OF REGISTRATION SECURED *
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-typewriter">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white/60 text-xs tracking-widest uppercase">FULL NAME</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm" placeholder="Enter your name" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-white/60 text-xs tracking-widest uppercase">REGISTER NO.</label>
                                            <input required type="text" name="regNo" value={formData.regNo} onChange={handleChange} className="bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm" placeholder="Ex: URK20XX000" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-white/60 text-xs tracking-widest uppercase">INSTITUTION</label>
                                            <input required type="text" name="institution" value={formData.institution} onChange={handleChange} className="bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm" placeholder="College Name" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-white/60 text-xs tracking-widest uppercase">EMAIL ADDRESS</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm" placeholder="john@example.com" />
                                    </div>

                                    <div className="flex flex-col gap-1 mb-2">
                                        <label className="text-white/60 text-xs tracking-widest uppercase">MOBILE NUMBER</label>
                                        <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm" placeholder="+91 98765 43210" />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className={`w-full mt-2 py-4 bg-rasrang-yellow text-black font-marquee text-xl tracking-widest hover:bg-white transition-colors uppercase ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? 'PROCESSING...' : 'SUBMIT REGISTRATION'}
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

export default RegistrationModal;

