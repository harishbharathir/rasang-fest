import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import EventTicket from './EventTicket';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getFacultyPassByUser } from '../services/api';

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

const INSTITUTIONS = [
    'SRM TRP Engineering College',
    'SRM IST, Trichy',
    'SRM University, Chennai',
    'Anna University',
    'Other Technical Institution',
];

const EVENTS = [
    'Pro Show (Grand Finale)',
    'Cultural Night (Drama, Music, Dance)',
    'Tech Expo (Hackathon, Robotics, Coding)',
    'All Event Sessions',
];

const inputClass = "bg-white/5 border border-white/10 focus:border-rasrang-cyan text-white p-3 outline-none transition-colors rounded-sm w-full font-typewriter";
const labelClass = "text-white/60 text-xs tracking-widest uppercase font-typewriter";

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
        <label className={labelClass}>{label}</label>
        {children}
    </div>
);

export default function FacultyPassModal({ isOpen, onClose, user }) {
    const [passData, setPassData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '', institution: '', department: '', designation: '',
        employeeId: '', email: '', mobile: '', eventsAttending: '',
    });

    const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setPassData(null);
            setError('');
            setForm(prev => ({ ...prev, email: user?.email || '', name: '', institution: '', department: '', designation: '', employeeId: '', mobile: '', eventsAttending: '' }));

            if (user?.email) {
                getFacultyPassByUser(user.email).then(pass => {
                    if (pass) {
                        setPassData(pass);
                        setForm(prev => ({ ...prev, institution: pass.institution || prev.institution, department: pass.department || prev.department }));
                    }
                }).catch(console.error);
            }
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, user]);

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

    const handleDownload = async () => {
        const passElement = document.getElementById('faculty-pass-card-inner');
        if (!passElement) return;

        try {
            const canvas = await html2canvas(passElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                onclone: (clonedDoc) => {
                    const pass = clonedDoc.getElementById('faculty-pass-card-inner');
                    if (pass) {
                        // EventTicket has aspectRatio '1000 / 415'
                        pass.style.width = '1000px';
                        pass.style.height = '415px';
                        pass.style.aspectRatio = 'auto';
                    }
                }
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

            pdf.setFillColor(17, 17, 17);
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
            pdf.addImage(imgData, 'PNG', xPos, yPos, drawWidth, drawHeight);
            pdf.save(`Faculty-Pass-${form.name}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
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
                        className="relative z-10 w-full max-w-2xl bg-[#111] border border-white/10 shadow-2xl rounded-md overflow-hidden max-h-[90vh] flex flex-col"
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
                                /* ── SUCCESS: EventTicket based Pass ── */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Event ticket component */}
                                    <div id="faculty-pass-card-inner" className="w-full">
                                        <EventTicket 
                                            userName={passData.name}
                                            eventName="FACULTY PASS"
                                            ticketId={passData.passCode}
                                            qrCode={passData.qrCode}
                                            venue={`${form.institution} | ${form.department}`}
                                            date="MARCH 15-16, 2026"
                                            time="ALL FEST SESSIONS"
                                        />
                                    </div>

                                    <div className="flex gap-4 mt-6 w-full">
                                        <button
                                            onClick={handleDownload}
                                            className="flex-1 py-3 bg-white text-black font-marquee text-lg tracking-widest hover:bg-rasrang-yellow transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download size={20} /> DOWNLOAD PDF
                                        </button>
                                        <button
                                            onClick={handleClose}
                                            className="flex-1 py-3 bg-rasrang-yellow text-black font-marquee text-lg tracking-widest hover:bg-white transition-colors"
                                        >
                                            DONE
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                /* ── FORM ── */
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <Field label="Full Name">
                                        <input required type="text" name="name" value={form.name} onChange={set} className={inputClass} placeholder="Dr. / Prof. Full Name" />
                                    </Field>
                                    <Field label="Institution Name">
                                        <select required name="institution" value={form.institution} onChange={set} className={inputClass + " appearance-none"}>
                                            <option value="" disabled>Select Institution</option>
                                            {INSTITUTIONS.map(inst => <option key={inst} value={inst} className="bg-[#111]">{inst}</option>)}
                                        </select>
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
                                        <input required type="email" name="email" value={form.email} readOnly onChange={set} className={inputClass + " cursor-not-allowed text-white/70"} placeholder="faculty@institution.edu" />
                                    </Field>
                                    <Field label="Mobile Number">
                                        <input required type="tel" name="mobile" value={form.mobile} onChange={set} className={inputClass} placeholder="+91 98765 43210" pattern="[0-9+\s\-]{10,15}" />
                                    </Field>
                                    <Field label="Events / Sessions to Attend">
                                        <select required name="eventsAttending" value={form.eventsAttending} onChange={set} className={inputClass + " appearance-none"}>
                                            <option value="" disabled>Select Events</option>
                                            {EVENTS.map(event => <option key={event} value={event} className="bg-[#111]">{event}</option>)}
                                        </select>
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
