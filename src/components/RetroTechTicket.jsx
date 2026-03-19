import React from 'react';

const RetroTechTicket = ({ ticket, rollNo, event = {}, eventName = 'Tech Event' }) => {
    const eventColor = event.color || 'text-cyan-400';
    const uniqueId = ticket?.ticketId || 'RSR-' + rollNo.slice(-6).toUpperCase();
    
    return (
        <div className="relative w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black border-8 border-gradient-to-r from-cyan-500/50 via-blue-500/40 to-emerald-500/50 rounded-3xl shadow-[0_0_80px_rgba(0,255,255,0.4)] overflow-hidden backdrop-blur-xl group" style={{ aspectRatio: '3 / 1.4' }}>
            {/* Enhanced Geometric + Projector background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,255,0.2)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.2)_0%,transparent_50%),radial-gradient(circle,rgba(0,255,255,0.1)_0%,transparent_70%)] opacity-90" />
            
            {/* Film reel corners */}
            <svg className="absolute top-2 left-2 w-12 h-12 text-yellow-400/30" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="6" cy="6" r="1.5"/>
                <circle cx="18" cy="6" r="1.5"/>
                <circle cx="6" cy="18" r="1.5"/>
                <circle cx="18" cy="18" r="1.5"/>
            </svg>
            <svg className="absolute bottom-2 right-2 w-12 h-12 text-yellow-400/30 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="6" cy="6" r="1.5"/>
                <circle cx="18" cy="6" r="1.5"/>
                <circle cx="6" cy="18" r="1.5"/>
                <circle cx="18" cy="18" r="1.5"/>
            </svg>

            {/* Enhanced circuit pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <pattern id="circuit-enhanced" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                            <path d="M0 12.5 L12.5 12.5 M12.5 0 L12.5 12.5 M12.5 12.5 L25 12.5 M12.5 12.5 L12.5 25 M25 12.5 L25 25" stroke="rgba(0,255,255,0.8)" strokeWidth="0.8" fill="none"/>
                            <circle cx="6" cy="6" r="1.5" fill="rgba(34,197,94,1)"/>
                            <circle cx="19" cy="19" r="1.5" fill="rgba(0,255,255,1)"/>
                            <path d="M5 20 Q12.5 15 20 10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#circuit-enhanced)" />
                </svg>
            </div>

            {/* CRT scanlines + flicker */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.05)_0px,rgba(0,255,255,0.05)_1px,transparent_1px,transparent_3px)] animate-scanline pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-flicker opacity-30 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col p-8 justify-between text-white font-mono">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-4 border-b-2 border-current/40 pb-3">
                    <span className={`text-sm uppercase tracking-[0.1em] bg-gradient-to-r from-${eventColor.replace('text-','')} to-emerald-400 bg-clip-text text-transparent font-black`}>
                        RSRNG '26 PROJECTION PASS
                    </span>
                    <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {uniqueId}
                    </span>
                </div>

                {/* Main event info - Event specific */}
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3 px-4">
                    <div className={`text-2xl md:text-3xl font-black uppercase tracking-[0.05em] bg-gradient-to-r from-white to-gray-100 bg-clip-text drop-shadow-2xl leading-tight ${eventColor}`}>
                        {event.title || eventName.toUpperCase()}
                    </div>
                    {event.subtitle && (
                        <div className="text-xs uppercase tracking-widest opacity-85 font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                            {event.subtitle}
                        </div>
                    )}
                    <div className={`text-sm uppercase font-bold ${eventColor}`}>
                        {event.category || 'PROJECTION ROOM'}
                    </div>
                </div>

                {/* User info */}
                <div className="space-y-1.5 text-sm mb-6 opacity-95">
                    <div className="flex justify-between font-bold text-xs">
                        <span>ATTENDEE</span>
                        <span className="text-right min-w-[140px] truncate font-mono">{ticket?.userName || 'Verified User'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs">
                        <span>ID</span>
                        <span className="text-right font-mono text-cyan-400">{rollNo}</span>
                    </div>
                </div>

                {/* Prominent QR Code */}
                <div className="relative mx-auto w-32 h-32 mb-4 group/qr">
                    <div className={`w-full h-full bg-gradient-to-br from-white/98 to-gray-100/95 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.5)] border-4 border-${eventColor.replace('text-','')}/60 p-2.5 flex items-center justify-center transition-all group-hover/qr:scale-105 group-hover/qr:shadow-[0_0_50px_rgba(0,255,255,0.7)]`}>
                        {ticket?.qrCode ? (
                            <img src={ticket.qrCode} alt="QR Verify" className="w-full h-full rounded-2xl shadow-inner" style={{imageRendering: 'pixelated'}} />
                        ) : (
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
                                <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full shadow-xl animate-ping" />
                            </div>
                        )}
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400 uppercase tracking-wider">SCAN TO VERIFY</span>
                </div>

                {/* Enhanced Status footer */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/95 backdrop-blur-md border-t-4 border-gradient-to-r from-cyan-500/50 to-emerald-500/50 p-3 text-center text-xs font-bold uppercase tracking-[0.15em] opacity-95">
                    MARCH 15-16 | PROJECTION ROOM | RASRANG '26 | AUTHENTIC ✓
                </div>
            </div>

            <style jsx>{`
                @keyframes scanline {
                    0%, 95% { transform: translateY(0); opacity: 0.4; }
                    97% { transform: translateY(-1px); opacity: 0.8; }
                    100% { transform: translateY(0); opacity: 0.4; }
                }
                @keyframes flicker {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.1; }
                }
                @keyframes scan-right {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-scanline { animation: scanline 3s infinite; }
                .animate-flicker { animation: flicker 0.15s infinite; }
                .animate-scan-right { animation: scan-right 2s infinite linear; }
            `}</style>
        </div>
    );
};

export default RetroTechTicket;

