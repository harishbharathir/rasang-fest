import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, Ticket } from 'lucide-react';
import EventTicket from './EventTicket';
import { createBooking, getTicketsByUser } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PRO_SHOW_EVENTS = [
    { key: 'day1', label: 'PRO SHOW — DAY 1', date: 'MARCH 15, 2026', time: '06:00 PM', venue: 'GRAND STAGE, MAIN CAMPUS' },
    { key: 'day2', label: 'PRO SHOW — DAY 2', date: 'MARCH 16, 2026', time: '06:00 PM', venue: 'GRAND STAGE, MAIN CAMPUS' },
];

const ProShowModal = ({ isOpen, onClose, user, userData }) => {
    const [step, setStep] = useState('form'); // 'form' | 'tickets'
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        email: '',
        mobile: '',
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep('form');
            setTickets([]);
            const name = userData?.name || user?.displayName || '';
            const rollNo = userData?.registerNo || userData?.employeeId || '';
            const email = user?.email || userData?.email || '';
            const mobile = userData?.mobile || '';
            setFormData({ name, rollNo, email, mobile });

            // Pre-check if already booked
            if (email) {
                getTicketsByUser(email).then(existingTickets => {
                    const proTickets = (existingTickets || []).filter(
                        t => t.eventName === PRO_SHOW_EVENTS[0].label || t.eventName === PRO_SHOW_EVENTS[1].label
                    );
                    if (proTickets.length > 0) {
                        setTickets(proTickets);
                        setStep('tickets');
                    }
                }).catch(console.error);
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await createBooking({
                userName: formData.name,
                email: formData.email,
                events: [PRO_SHOW_EVENTS[0].label, PRO_SHOW_EVENTS[1].label],
            });
            if (result && result.tickets && result.tickets.length > 0) {
                // Enrich tickets with day-specific metadata
                const enriched = result.tickets.map(t => {
                    const meta = PRO_SHOW_EVENTS.find(e => e.label === t.eventName);
                    return { ...t, date: meta?.date || t.date, time: meta?.time || t.time, venue: meta?.venue || t.venue };
                });
                setTickets(enriched);
                setStep('tickets');
            }
        } catch (error) {
            alert(error.message || 'Booking failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const pdf = new jsPDF('l', 'mm', 'a4');
            for (let i = 0; i < tickets.length; i++) {
                const el = document.getElementById(`proshow-ticket-${i}`);
                if (!el) continue;
                const canvas = await html2canvas(el, {
                    scale: 3, useCORS: true, backgroundColor: null,
                    onclone: (doc) => {
                        const t = doc.getElementById(`proshow-ticket-${i}`);
                        if (t) { t.style.width = '1571px'; t.style.height = '707px'; t.style.aspectRatio = 'auto'; }
                    }
                });
                const imgData = canvas.toDataURL('image/png');
                const { width, height } = pdf.internal.pageSize;
                const ratio = Math.min(width / canvas.width, height / canvas.height);
                const drawW = canvas.width * ratio * 0.9;
                const drawH = canvas.height * ratio * 0.9;
                if (i > 0) pdf.addPage();
                pdf.setFillColor(10, 10, 10);
                pdf.rect(0, 0, width, height, 'F');
                pdf.addImage(imgData, 'PNG', (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
            }
            pdf.save('ProShow_Tickets_Rasrang26.pdf');
        } catch (err) {
            console.error(err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-default"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-[#1a0a00] to-black border-2 border-rasrang-yellow/40 rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.15)] max-h-[95vh] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-rasrang-yellow/20 bg-black/60 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <Star className="text-rasrang-yellow w-6 h-6 fill-rasrang-yellow" />
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-marquee text-rasrang-yellow tracking-widest">
                                        {step === 'form' ? 'GET PRO PASS' : 'YOUR PRO PASSES'}
                                    </h3>
                                    <p className="text-rasrang-cyan font-cinema text-xs tracking-[0.3em] mt-0.5">GRAND FINALE · 2 NIGHTS</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X size={24} className="text-white/60" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {step === 'form' ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {/* Event Info Banner */}
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {PRO_SHOW_EVENTS.map(ev => (
                                            <div key={ev.key} className="bg-rasrang-yellow/10 border border-rasrang-yellow/30 rounded-xl p-4 text-center">
                                                <Ticket className="text-rasrang-yellow w-5 h-5 mx-auto mb-2" />
                                                <p className="font-marquee text-rasrang-yellow text-sm leading-tight">{ev.label}</p>
                                                <p className="font-typewriter text-white/50 text-[10px] mt-1">{ev.date} · {ev.time}</p>
                                                <p className="font-typewriter text-rasrang-cyan/60 text-[10px]">{ev.venue}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
                                            <input
                                                required readOnly
                                                value={formData.name}
                                                className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-white/70 font-mono focus:outline-none cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Roll No. / Employee ID</label>
                                            <input
                                                required readOnly
                                                value={formData.rollNo}
                                                className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-white/70 font-mono focus:outline-none cursor-not-allowed uppercase"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                                                <input
                                                    required readOnly type="email"
                                                    value={formData.email}
                                                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-white/70 font-mono focus:outline-none cursor-not-allowed"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-300 mb-2">Mobile</label>
                                                <input
                                                    required readOnly type="tel"
                                                    value={formData.mobile}
                                                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-white/70 font-mono focus:outline-none cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full h-14 font-marquee text-xl rounded-2xl shadow-2xl transition-all uppercase tracking-widest mt-4 ${
                                                isLoading
                                                    ? 'bg-gray-600/50 cursor-not-allowed text-white/50'
                                                    : 'bg-rasrang-yellow text-black hover:bg-white hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] hover:scale-[1.02]'
                                            }`}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                    SECURING PASSES...
                                                </span>
                                            ) : (
                                                'SECURE MY 2-NIGHT PASS'
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    {/* Success Banner */}
                                    <div className="bg-rasrang-yellow/10 border border-rasrang-yellow/30 rounded-2xl p-4 text-center">
                                        <p className="font-marquee text-rasrang-yellow text-lg tracking-widest">🎉 PRO PASSES CONFIRMED!</p>
                                        <p className="font-typewriter text-white/50 text-xs mt-1">Attendee: {formData.name}</p>
                                    </div>

                                    {/* Tickets */}
                                    <div className="space-y-8">
                                        {tickets.map((ticket, i) => (
                                            <div key={ticket.ticketId || i} id={`proshow-ticket-${i}`} className="w-full">
                                                <EventTicket
                                                    userName={ticket.userName || formData.name}
                                                    eventName={ticket.eventName}
                                                    ticketId={ticket.ticketId}
                                                    qrCode={ticket.qrCode}
                                                    date={ticket.date}
                                                    time={ticket.time}
                                                    venue={ticket.venue}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Download */}
                                    <button
                                        onClick={handleDownload}
                                        disabled={isDownloading}
                                        className="w-full py-4 flex items-center justify-center gap-3 bg-rasrang-yellow text-black font-marquee text-lg rounded-2xl hover:bg-white hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50"
                                    >
                                        <Download className="w-5 h-5" />
                                        {isDownloading ? 'GENERATING PDF...' : 'DOWNLOAD BOTH TICKETS'}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 border border-white/20 text-white/60 font-cinema text-sm rounded-2xl hover:bg-white/5 transition-colors"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProShowModal;
