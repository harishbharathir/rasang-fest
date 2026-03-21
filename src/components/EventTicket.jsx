import React from 'react';
import ticketTemplate from '../assets/ticket-new.png';

const EventTicket = ({
    userName = "FACULTY",
    eventName = "GRAND EVENT",
    ticketId = "RSG-2026-X89",
    date = "MARCH 27-28",
    time = "10:00 AM",
    venue = "MAIN CAMPUS GROUNDS",
    row = "A",
    seat = "24",
    qrCode = null
}) => {

    return (
        <div className="w-full max-w-[900px] mx-auto px-4 py-8 flex justify-center items-center">
            <div
                className="relative shadow-2xl overflow-hidden select-none font-typewriter uppercase text-black rounded-sm"
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    aspectRatio: '1571 / 707' // Added height to reveal 10px top & bottom (approx 35 units in ratio)
                }}
            >
                {/* Real Image Background */}
                <div className="absolute inset-0 bg-[#fff9ea] z-[-1]" />
                <img
                    src={ticketTemplate}
                    alt="Ticket Template"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* --- DATA OVERLAY (Centered wrapper to maintain text alignment) --- */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div 
                        className="relative z-10 w-full" 
                        style={{ aspectRatio: '1571 / 672' }}
                    >


                    {/* MAIN TICKET */}
                    {/* COMPETITION NAME: */}
                    <div className="absolute top-[32.2%] left-[32%] w-[33%] text-[1.1vw] md:text-[11px] text-black border-black/5 truncate text-left">
                        {eventName || "GENERAL ADMISSION"}
                    </div>

                    {/* DATE & TIME: */}
                    <div className="absolute top-[42.2%] left-[32%] w-[33%] text-[1.1vw] md:text-[11px] text-black text-left truncate">
                        {date} {time}
                    </div>

                    {/* VENUE: */}
                    <div className="absolute top-[52.2%] left-[20%] w-[55%] text-[1.1vw] md:text-[11px] text-black leading-tight text-left truncate">
                        {venue}
                    </div>

                    {/* REGISTRATION ID: */}
                    <div className="absolute top-[62.2%] left-[32%] w-[33%] text-[1.1vw] md:text-[11px] text-black text-left truncate">
                        {ticketId || "RSG-XXXX-XXX"}
                    </div>

                    {/* USER NAME: */}
                    <div className="absolute top-[72.2%] left-[32%] w-[33%] text-[1.1vw] md:text-[11px] text-black text-left truncate">
                        {userName || "TICKET HOLDER"}
                    </div>

                    {/* CATEGORY: */}
                    <div className="absolute top-[82.2%] left-[32%] w-[33%] text-[1.1vw] md:text-[11px] text-black text-left truncate">
                        {row}-{seat} / GENERAL
                    </div>

                    {/* --- ADMIN STUB (RIGHT SIDE) --- */}
                    {/* REG ID: */}
                    <div className="absolute top-[13.5%] left-[73.5%] w-[18%] text-[0.9vw] md:text-[9.5px] text-left text-black truncate">
                        {ticketId?.split('-').pop() || "ID"}
                    </div>

                    {/* USER NAME: */}
                    <div className="absolute top-[20.2%] left-[78.5%] w-[16%] text-[0.9vw] md:text-[9.5px] text-left text-black truncate">
                        {userName?.split(' ')[0] || "TICKET HOLDER"}
                    </div>

                    {/* COMPETITION: */}
                    <div className="absolute top-[26.9%] left-[80.5%] w-[15%] text-[0.9vw] md:text-[9.5px] text-left text-black truncate">
                        {eventName?.slice(0, 15) || "EVENT"}
                    </div>

                    {/* DATE: */}
                    <div className="absolute top-[35.5%] left-[73.5%] w-[16%] text-[0.9vw] md:text-[9.5px] text-left text-black truncate">
                        {date?.slice(0, 15)}
                    </div>

                    {/* TIME: */}
                    <div className="absolute top-[43.5%] left-[73.5%] w-[16%] text-[0.9vw] md:text-[9.5px] text-left text-black truncate">
                        {time?.slice(0, 12)}
                    </div>

                    {/* --- HUGE QR CODE --- (Overlays the giant QR box area) */}
                    {qrCode && (
                        <div className="absolute top-[54.5%] left-[70.1%] w-[18.2%] aspect-square p-[1px] shadow-sm bg-white mix-blend-multiply flex items-center justify-center">
                            <img
                                src={qrCode}
                                alt="Ticket QR"
                                className="w-[88%] h-[88%] object-contain"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventTicket;
