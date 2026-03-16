import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import EventTicket from './EventTicket';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TicketModal = ({ isOpen, onClose, tickets }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!isOpen) return null;

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape since tickets are horizontal
            
            for (let i = 0; i < tickets.length; i++) {
                const ticketElement = document.getElementById(`ticket-${i}`);
                if (ticketElement) {
                    const canvas = await html2canvas(ticketElement, {
                        scale: 2, // higher resolution
                        useCORS: true,
                        backgroundColor: null
                    });
                    const imgData = canvas.toDataURL('image/png');
                    
                    // Calculate PDF dimensions
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    
                    // Keep aspect ratio setup
                    const imgWidth = canvas.width;
                    const imgHeight = canvas.height;
                    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                    
                    // Draw at 90% wide to allow subtle border margins
                    const drawWidth = imgWidth * ratio * 0.9;
                    const drawHeight = imgHeight * ratio * 0.9;
                    
                    // Center vertically & horizontally
                    const xPos = (pdfWidth - drawWidth) / 2;
                    const yPos = (pdfHeight - drawHeight) / 2;

                    if (i > 0) {
                        pdf.addPage();
                    }
                    // Fill background
                    pdf.setFillColor(10, 10, 10);
                    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
                    
                    pdf.addImage(imgData, 'PNG', xPos, yPos, drawWidth, drawHeight);
                }
            }
            
            pdf.save('Rasrang26-Tickets.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative z-10 w-full max-w-5xl h-[80vh] flex flex-col"
                    >
                        {/* Control Bar */}
                        <div className="flex justify-between items-center mb-4 bg-rasrang-black/80 p-6 border border-white/10 rounded-t-lg backdrop-blur-md">
                            <div>
                                <h3 className="text-rasrang-yellow font-marquee text-3xl uppercase tracking-widest">
                                    Your Golden Tickets
                                </h3>
                                <p className="font-typewriter text-rasrang-cyan/60 text-xs mt-1">
                                    {tickets?.length || 0} EVENTS REGISTERED
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className={`hidden md:flex items-center gap-2 px-6 py-3 bg-rasrang-yellow text-black hover:bg-white rounded transition-all font-marquee text-lg ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <Download size={20} /> {isDownloading ? 'GENERATING...' : 'DOWNLOAD TICKETS'}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-white/10 hover:bg-rasrang-pink text-white rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Ticket Rendering Area - Scrollable List */}
                        <div className="flex-1 bg-white/5 p-4 md:p-12 rounded-b-lg border border-x border-b border-white/10 overflow-y-auto custom-scrollbar print:overflow-visible print:bg-white print:p-0">
                            <div className="flex flex-col items-center gap-12 print:gap-0">
                                {tickets && tickets.length > 0 ? (
                                    tickets.map((ticket, index) => (
                                        <div
                                            key={ticket?.ticketId || index}
                                            id={`ticket-${index}`}
                                            className="w-full flex justify-center print:break-after-page print:mb-0"
                                        >
                                            <EventTicket {...ticket} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white/40 font-typewriter">No tickets found in selection.</div>
                                )}
                            </div>
                        </div>

                        {/* Hint */}
                        <div className="mt-6 text-center pb-4">
                            <p className="font-typewriter text-rasrang-cyan/40 text-[10px] animate-pulse uppercase tracking-[0.2em]">
                                * Screening or printing recommended for entry *
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TicketModal;
