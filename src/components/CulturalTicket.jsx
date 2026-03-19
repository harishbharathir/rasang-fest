import React from 'react';

const CulturalTicket = ({ ticket, rollNo, event = {}, eventName = 'Cultural Event' }) => {
    const eventColor = event.color || 'text-yellow-400';
    const uniqueId = ticket?.ticketId || 'CUL-' + rollNo.slice(-6).toUpperCase();
    
    return (
style={{ aspectRatio: '3 / 1.4' }}
            {/* Movie theater style background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.2)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,140,0,0.2)_0%,transparent_50%)] opacity-90" />
            
            {/* Vintage ticket perforations */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_2px,transparent_6px)] opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_2px,transparent_6px)] opacity-70" />

            {/* Seat ticket stubs */}
            <svg className="absolute top-4 left-4 w-16 h-16 text-yellow-300/50" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="8"/>
                <path d="M4 8h16v8H4z" opacity="0.3"/>
            </svg>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col p-8 justify-between text-white font-mono">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b-2 border-yellow-400/50 pb-3">
                    <span className={`text-sm uppercase tracking-[0.1em] bg-gradient-to-r from-${eventColor.replace('text-','')} to-orange-400 bg-clip-text text-transparent font-black`}>
                        RASRANG '26 ADMISSION
                    </span>
                    <span className="text-lg font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        {uniqueId}
                    </span>
                </div>

                {/* Event info */}
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3 px-4">
                    <div className={`text-2xl md:text-3xl font-black uppercase tracking-[0.05em] bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text drop-shadow-2xl leading-tight ${eventColor}`}>
                        {event.title || eventName.toUpperCase()}
                    </div>
                    {event.subtitle && (
                        <div className="text-xs uppercase tracking-widest opacity-85 font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">
                            {event.subtitle}
                        </div>
                    )}
                    <div className={`text-sm uppercase font-bold ${eventColor}`}>
                        {event.category || 'CULTURAL ALLEY'}
                    </div>
                </div>

                {/* User info */}
                <div className="space-y-1.5 text-sm mb-6 opacity-95">
                    <div className="flex justify-between font-bold text-xs">
                        <span>NAME</span>
                        <span className="text-right min-w-[140px] truncate font-mono">{ticket?.userName || 'Attendee'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs">
                        <span>REG/ID</span>
                        <span className="text-right font-mono text-yellow-400">{rollNo}</span>
                    </div>
                </div>

                {/* QR Code */}
                <div className="relative mx-auto w-28 h-28 mb-4">
                    <div className={`w-full h-full bg-gradient-to-br from-yellow-50/90 to-orange-50/90 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(255,165,0,0.5)] border-4 border-yellow-400/60 p-2 flex items-center justify-center`}>
                        {ticket?.qrCode ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <img src={ticket.qrCode} alt="QR Verify" className="w-full h-full rounded-xl shadow-inner" style={{imageRendering: 'pixelated'}} />
                            </div>
                        ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center animate-pulse">
                                <div className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg animate-ping" />
                            </div>
                        )}
                    </div>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-400 uppercase tracking-wider">VALIDATE</span>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/95 to-transparent backdrop-blur-md border-t border-yellow-400/50 p-3 text-center text-xs font-bold uppercase tracking-[0.15em] opacity-95">
                    MARCH 15-16 | CULTURAL ALLEY | RASRANG '26 ✓
                </div>
            </div>

            <style jsx>{`
                @keyframes scan-qr {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-scan-qr {
                    animation: scan-qr 2s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default CulturalTicket;

