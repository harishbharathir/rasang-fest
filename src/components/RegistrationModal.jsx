import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const RegistrationModal = ({ isOpen, onClose, eventName }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        institution: '',
        email: '',
        mobile: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call delay
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', regNo: '', institution: '', email: '', mobile: '' });
            onClose();
        }, 2000);
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
                        className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 shadow-2xl overflow-hidden rounded-md"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                            <div>
                                <h3 className="text-rasrang-yellow font-marquee text-2xl tracking-widest uppercase">
                                    REGISTER FOR EVENT
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
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10"
                                >
                                    <CheckCircle2 size={64} className="text-rasrang-pink mb-4" />
                                    <h4 className="text-white font-marquee text-3xl tracking-wider">REGISTRATION SUCCESSFUL</h4>
                                    <p className="text-white/60 font-typewriter mt-2 text-sm text-center">Your spot for {eventName} is confirmed! Redirecting...</p>
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

                                    <button type="submit" className="w-full mt-2 py-4 bg-rasrang-yellow text-black font-marquee text-xl tracking-widest hover:bg-white transition-colors uppercase">
                                        SUBMIT REGISTRATION
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
