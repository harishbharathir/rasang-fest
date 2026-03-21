import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CensorCertificate = ({ onComplete }) => {
    const [isBurning, setIsBurning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBurning(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {!isBurning && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.5,
                        filter: "brightness(2) blur(10px)",
                        transition: { duration: 1.5, ease: "easeIn" }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-start md:justify-center bg-[#f4f1ea] text-black p-4 overflow-y-auto"
                >
                    <div className="max-w-2xl w-full border-4 border-black p-4 md:p-8 font-typewriter relative my-auto">
                        {/* Stamp Effect */}
                        <div className="absolute top-4 right-4 border-4 border-red-600 rounded-full px-4 py-2 text-red-600 font-bold rotate-12 opacity-70">
                            APPROVED '26
                        </div>

                        <h1 className="text-3xl font-bold border-b-4 border-black mb-6 pb-2 text-center uppercase tracking-widest">
                            Central Board of Film Certification
                        </h1>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                            <div>
                                <p><span className="font-bold">TITLE:</span> rasrang '26</p>
                                <p><span className="font-bold">CATEGORY:</span> CULTURAL & TECH</p>
                                <p><span className="font-bold">LANGUAGE:</span> MULTI-LINGUAL</p>
                            </div>
                            <div className="text-right">
                                <p><span className="font-bold">CERTIFICATE NO:</span> RSG-2026-001</p>
                                <p><span className="font-bold">DATE:</span> 09/03/2026</p>
                            </div>
                        </div>

                        <div className="border-4 border-black flex items-center justify-center p-12 mb-8">
                            <span className="text-9xl font-bold">U/A</span>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="font-bold border-t-2 border-black pt-4">SYNOPSIS</p>
                            <p className="text-lg">20 Competitions. 1 Epic Pro Show.</p>
                            <p className="italic">Warning: Highly addictive cultural energy and lethal tech spikes ahead.</p>
                        </div>

                        <div className="mt-8 flex justify-between items-end border-t-2 border-black pt-4">
                            <div className="text-[10px] space-y-1">
                                <p>Length: 48 Hours</p>
                                <p>Location: Main Campus</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-1 border-b border-black mb-2 mx-auto"></div>
                                <p className="text-xs font-bold font-cinema uppercase">Director of rasrang</p>
                            </div>
                        </div>
                    </div>

                    {/* Burn Vignette Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_transparent_50%,_rgba(0,0,0,0.4)_100%)]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CensorCertificate;
