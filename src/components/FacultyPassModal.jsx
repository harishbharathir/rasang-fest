import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const DEPARTMENTS = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Biotechnology',
    'Other',
];

const inputClass = "bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm w-full font-typewriter";
const labelClass = "text-white/60 text-xs tracking-widest uppercase font-typewriter";

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
        <label className={labelClass}>{label}</label>
        {children}
    </div>
);

export default function FacultyPassModal({ isOpen, onClose }) {
    const [passData, setPassData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '', institution: '', department: '', designation: '',
        employeeId: '', email: '', mobile: '', eventsAttending: '',
    });

    const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/faculty-pass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Server error');
            const data = await res.json();
            setPassData(data);
        } catch {
            setError('Failed to submit. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPassData(null);
        setError('');
        setForm({ name: '', institution: '', department: '', designation: '', employeeId: '', email: '', mobile: '', eventsAttending: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 shadow-2xl rounded-md overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 shrink-0">
                            <div>
                                <h3 className="text-rasrang-yellow font-marquee text-2xl tracking-widest uppercase">Faculty Pass</h3>
                                <p className="font-typewriter text-rasrang-cyan/80 text-xs mt-1 uppercase tracking-widest">rasrang '26 — Grand Cultural Fest</p>
                            </div>
                            <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto">
                            {passData ? (
                                /* ── SUCCESS: Retro QR Pass ── */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Retro ticket card */}
                                    <div className="w-full bg-[#f5e6c8] text-[#1a0a00] rounded-sm overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                                        style={{ fontFamily: 'monospace' }}>

                                        {/* Top strip */}
                                        <div className="bg-[#1a0a00] text-[#f5e6c8] px-4 py-2 flex justify-between items-center">
                                            <span className="text-xs tracking-[0.3em] uppercase">rasrang '26</span>
                                            <span className="text-xs tracking-widest">FACULTY PASS</span>
                                        </div>

                                        {/* Perforation line */}
                                        <div className="flex items-center px-2 py-1">
                                            {[...Array(36)].map((_, i) => (
                                                <div key={i} className="flex-1 h-px bg-[#1a0a00]/20 mx-px" />
                                            ))}
                                        </div>

                                        <div className="px-6 pb-6 pt-2 flex gap-6">
                                            {/* QR Code — retro sepia toned */}
                                            <div className="shrink-0 flex flex-col items-center gap-2">
                                                <div className="border-4 border-[#1a0a00] p-1 bg-[#f5e6c8]">
                                                    <img
                                                        src={passData.qrCode}
                                                        alt="Faculty QR"
                                                        className="w-28 h-28"
                                                        style={{ imageRendering: 'pixelated', filter: 'sepia(0.4) contrast(1.2)' }}
                                                    />
                                                </div>
                                                <span className="text-[9px] tracking-widest text-[#1a0a00]/60 uppercase">scan to verify</span>
                                            </div>

                                            {/* Details */}
                                            <div className="flex flex-col justify-center gap-1 text-[#1a0a00] min-w-0">
                                                <p className="text-lg font-bold tracking-wide uppercase truncate">{passData.name}</p>
                                                <p className="text-xs tracking-widest uppercase text-[#1a0a00]/60">{form.designation}</p>
                                                <div className="h-px bg-[#1a0a00]/20 my-1" />
                                                <p className="text-xs truncate">{form.institution}</p>
                                                <p className="text-xs text-[#1a0a00]/60">{form.department}</p>
                                                <div className="h-px bg-[#1a0a00]/20 my-1" />
                                                <p className="text-[10px] tracking-[0.2em] font-bold">{passData.passCode}</p>
                                                <p className="text-[9px] text-[#1a0a00]/50 uppercase tracking-widest">MARCH 15–16, 2026 • SRM TRICHY</p>
                                            </div>
                                        </div>

                                        {/* Bottom perforation */}
                                        <div className="flex items-center px-2">
                                            {[...Array(36)].map((_, i) => (
                                                <div key={i} className="flex-1 h-px bg-[#1a0a00]/20 mx-px" />
                                            ))}
                                        </div>
                                        <div className="bg-[#1a0a00] text-[#f5e6c8] px-4 py-2 text-center">
                                            <span className="text-[9px] tracking-[0.4em] uppercase opacity-60">Grand Cultural Fest • Admit One • Non-Transferable</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleClose}
                                        className="mt-6 w-full py-3 bg-rasrang-yellow text-black font-marquee text-lg tracking-widest hover:bg-white transition-colors"
                                    >
                                        DONE
                                    </button>
                                </motion.div>
                            ) : (
                                /* ── FORM ── */
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <Field label="Full Name">
                                        <input required type="text" name="name" value={form.name} onChange={set} className={inputClass} placeholder="Dr. / Prof. Full Name" />
                                    </Field>
                                    <Field label="Institution Name">
                                        <input required type="text" name="institution" value={form.institution} onChange={set} className={inputClass} placeholder="College / University" />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Department">
                                            <select required name="department" value={form.department} onChange={set} className={inputClass + " appearance-none"}>
                                                <option value="" disabled>Select dept.</option>
                                                {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#111]">{d}</option>)}
                                            </select>
                                        </Field>
                                        <Field label="Designation">
                                            <input required type="text" name="designation" value={form.designation} onChange={set} className={inputClass} placeholder="Professor / HOD..." />
                                        </Field>
                                    </div>
                                    <Field label="Employee / Staff ID">
                                        <input required type="text" name="employeeId" value={form.employeeId} onChange={set} className={inputClass} placeholder="EMP-XXXX" />
                                    </Field>
                                    <Field label="Official Email">
                                        <input required type="email" name="email" value={form.email} onChange={set} className={inputClass} placeholder="faculty@institution.edu" />
                                    </Field>
                                    <Field label="Mobile Number">
                                        <input required type="tel" name="mobile" value={form.mobile} onChange={set} className={inputClass} placeholder="+91 98765 43210" pattern="[0-9+\s\-]{10,15}" />
                                    </Field>
                                    <Field label="Events / Sessions to Attend">
                                        <textarea required name="eventsAttending" value={form.eventsAttending} onChange={set} className={inputClass + " resize-none h-20"} placeholder="e.g. Pro Show, Cultural Night, Tech Expo..." />
                                    </Field>

                                    {error && <p className="text-rasrang-pink font-typewriter text-xs">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-2 py-4 bg-rasrang-pink text-white font-marquee text-xl tracking-widest hover:bg-rasrang-yellow hover:text-rasrang-black transition-colors uppercase shadow-[0_0_20px_#FF007F] disabled:opacity-50"
                                    >
                                        {loading ? 'PROCESSING...' : 'CONFIRM FACULTY PASS'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
