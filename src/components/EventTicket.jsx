import React from 'react';
import ticketTemplate from '../assets/ticket-temp.jpeg';

const EventTicket = ({
    userName = "FACULTY",
    eventName = "GRAND EVENT",
    ticketId = "RSG-2026-X89",
    date = "MARCH 15-16, 2026",
    time = "10:00 AM ONWARDS",
    venue = "MAIN CAMPUS GROUNDS",
    row = "A",
    seat = "24",
    qrCode = null
}) => {

    return (
        <div className="w-full max-w-[900px] mx-auto p-4 flex justify-center items-center">
            <div
                className="relative shadow-2xl overflow-hidden select-none font-typewriter uppercase text-black rounded-sm"
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    aspectRatio: '1000 / 415'
                }}
            >
                {/* Real Image Background */}
                <div className="absolute inset-0 bg-[#fff9ea] z-[-1]" />
                <img
                    src={ticketTemplate}
                    alt="Ticket Template"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* --- DATA OVERLAY (Z-Index 10) --- */}
                <div className="relative z-10 w-full h-full pointer-events-none">

                    {/* ADMIT ONE: */}
                    <div className="absolute top-[46.8%] left-[21.5%] w-[35%] text-[1.4vw] md:text-[16px] font-bold text-black border-b border-black/5 truncate">
                        {userName || "TICKET HOLDER"}
                    </div>

                    {/* TICKET ID: */}
                    <div className="absolute top-[52.8%] left-[21.5%] w-[35%] text-[1.3vw] md:text-[14px] text-black">
                        {ticketId || "RSG-XXXX-XXX"}
                    </div>

                    {/* DATE: */}
                    <div className="absolute top-[58.8%] left-[17.5%] w-[35%] text-[1.3vw] md:text-[14px] text-black">
                        {date}
                    </div>

                    {/* TIME: */}
                    <div className="absolute top-[64.8%] left-[17.5%] w-[35%] text-[1.3vw] md:text-[14px] text-black">
                        {time}
                    </div>

                    {/* VENUE: */}
                    <div className="absolute top-[70.8%] left-[19%] w-[35%] text-[1.2vw] md:text-[14px] leading-tight text-black">
                        {venue}
                    </div>

                    {/* EVENT NAME (Replacement for Price) */}
                    <div className="absolute top-[76.8%] left-[17.5%] w-[45%] text-[1.6vw] md:text-[20px] font-marquee text-[#FF007F] drop-shadow-sm truncate tracking-widest">
                        {eventName || "GENERAL ADMISSION"}
                    </div>

                    {/* ROW: | SEAT: */}
                    <div className="absolute top-[82.8%] left-[16.5%] text-[1.3vw] md:text-[14px] text-black">
                        {row || "A"}
                    </div>
                    <div className="absolute top-[82.8%] left-[34.5%] text-[1.3vw] md:text-[14px] text-black">
                        {seat || "X"}
                    </div>

                    {/* --- ADMIN STUB --- */}
                    <div className="absolute top-[28%] left-[64.5%] w-[14.5%] text-[1.2vw] md:text-[14px] text-center border-b border-black/20 text-black font-bold">
                        {ticketId?.split('-').pop() || "ID"}
                    </div>

                    {/* --- USER KEEPSAKE --- */}
                    <div className="absolute top-[65.5%] left-[64.5%] w-[14.5%] text-[1.2vw] md:text-[14px] text-center border-b border-black/20 text-black font-bold">
                        {ticketId?.split('-').pop() || "ID"}
                    </div>

                    {/* --- QR CODE --- */}
                    {qrCode && (
                        <div className="absolute bottom-[13.7%] right-[7.0%] w-[11.6%] aspect-square p-[1px] bg-white/10 backdrop-blur-[1px] shadow-sm">
                            <img
                                src={qrCode}
                                alt="Ticket QR"
                                className="w-full h-full object-contain mix-blend-multiply"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    )}

                </div>

                {/* Paper Texture Overlay for extra realism */}
                <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-20"></div>
            </div>
        </div>
    );
};

export default EventTicket;
