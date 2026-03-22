import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { registerStudent, registerFaculty } from '../services/api';

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

export default function RegistrationScreen({ user, onRegistered }) {
    const [type, setType] = useState(null); // 'student' or 'faculty'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [studentForm, setStudentForm] = useState({
        name: user?.displayName || '',
        registerNo: '',
        email: user?.email || '',
        mobile: '',
        institution: ''
    });

    const [facultyForm, setFacultyForm] = useState({
        name: user?.displayName || '',
        institution: '',
        department: '',
        designation: '',
        employeeId: '',
        email: user?.email || '',
        mobile: '',
        eventsAttending: ''
    });

    const setSForm = (e) => setStudentForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const setFForm = (e) => setFacultyForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await registerStudent(studentForm);
            onRegistered({ type: 'student', data });
        } catch (err) {
            setError(err.message || "Failed to register. Please check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleFacultySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await registerFaculty(facultyForm);
            // registerFaculty returns { passCode, qrCode, name, ... } which serves as the data
            onRegistered({ type: 'faculty', data });
        } catch (err) {
            setError(err.message || "Failed to register. Please check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    if (!type) {
        return (
            <div className="min-h-screen bg-rasrang-black flex items-center justify-center p-4 selection:bg-rasrang-pink selection:text-white">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass-morphic border-2 border-white/10 p-8 flex flex-col items-center gap-6"
                >
                    <h2 className="text-3xl font-marquee text-rasrang-yellow mb-2 tracking-widest text-center">JOIN THE FEST</h2>
                    <p className="font-typewriter text-white/60 text-center text-sm mb-4 uppercase">Select your registration type to proceed</p>
                    
                    <button 
                        onClick={() => setType('student')}
                        className="w-full py-4 bg-rasrang-cyan hover:bg-white text-black font-marquee text-xl tracking-widest transition-colors shadow-[0_0_20px_#00E5FF] hover:shadow-[0_0_20px_#ffffff]"
                    >
                        STUDENT
                    </button>
                    
                    <button 
                        onClick={() => setType('faculty')}
                        className="w-full py-4 bg-rasrang-pink hover:bg-white text-white hover:text-black font-marquee text-xl tracking-widest transition-colors shadow-[0_0_20px_#FF007F] hover:shadow-[0_0_20px_#ffffff]"
                    >
                        FACULTY
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-rasrang-black flex items-center justify-center p-4 py-12 selection:bg-rasrang-pink selection:text-white overflow-y-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-[#111] border border-white/10 shadow-2xl p-6 md:p-8"
            >
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-marquee text-rasrang-yellow tracking-widest">
                            {type === 'student' ? 'STUDENT REGISTRATION' : 'FACULTY PASS REGISTRATION'}
                        </h2>
                        <p className="font-typewriter text-rasrang-cyan/80 text-xs mt-1 uppercase tracking-widest">rasrang '26</p>
                    </div>
                    <button onClick={() => setType(null)} className="text-white/40 hover:text-white font-typewriter text-xs underline underline-offset-4">BACK</button>
                </div>

                {error && <p className="text-rasrang-pink font-typewriter text-xs mb-4">{error}</p>}

                {type === 'student' ? (
                    <form onSubmit={handleStudentSubmit} className="flex flex-col gap-4">
                        <Field label="Full Name">
                            <input required type="text" name="name" value={studentForm.name} onChange={setSForm} className={inputClass} placeholder="Full Name" />
                        </Field>
                        <Field label="Register / Roll Number">
                            <input required type="text" name="registerNo" value={studentForm.registerNo} onChange={setSForm} className={inputClass} placeholder="URK20XXX" />
                        </Field>
                        <Field label="Official Email">
                            <input required type="email" name="email" value={studentForm.email} readOnly className={inputClass + " cursor-not-allowed text-white/40"} />
                        </Field>
                        <Field label="Mobile Number">
                            <input required type="tel" name="mobile" value={studentForm.mobile} onChange={setSForm} className={inputClass} placeholder="+91 9876543210" pattern="[0-9+\s\-]{10,15}" />
                        </Field>
                        <Field label="Institution Name">
                            <select required name="institution" value={studentForm.institution} onChange={setSForm} className={inputClass + " appearance-none"}>
                                <option value="" disabled>Select Institution</option>
                                {INSTITUTIONS.map(inst => <option key={inst} value={inst} className="bg-[#111]">{inst}</option>)}
                            </select>
                        </Field>
                        <button type="submit" disabled={loading} className="w-full mt-4 py-4 bg-rasrang-cyan hover:bg-white text-black font-marquee text-xl tracking-widest transition-colors shadow-[0_0_20px_#00E5FF] disabled:opacity-50">
                            {loading ? 'PROCESSING...' : 'COMPLETE REGISTRATION'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleFacultySubmit} className="flex flex-col gap-4">
                        <Field label="Full Name">
                            <input required type="text" name="name" value={facultyForm.name} onChange={setFForm} className={inputClass} placeholder="Dr. / Prof. Full Name" />
                        </Field>
                        <Field label="Institution Name">
                            <select required name="institution" value={facultyForm.institution} onChange={setFForm} className={inputClass + " appearance-none"}>
                                <option value="" disabled>Select Institution</option>
                                {INSTITUTIONS.map(inst => <option key={inst} value={inst} className="bg-[#111]">{inst}</option>)}
                            </select>
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Department">
                                <select required name="department" value={facultyForm.department} onChange={setFForm} className={inputClass + " appearance-none"}>
                                    <option value="" disabled>Select dept.</option>
                                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#111]">{d}</option>)}
                                </select>
                            </Field>
                            <Field label="Designation">
                                <input required type="text" name="designation" value={facultyForm.designation} onChange={setFForm} className={inputClass} placeholder="Professor / HOD..." />
                            </Field>
                        </div>
                        <Field label="Employee / Staff ID">
                            <input required type="text" name="employeeId" value={facultyForm.employeeId} onChange={setFForm} className={inputClass} placeholder="EMP-XXXX" />
                        </Field>
                        <Field label="Official Email">
                            <input required type="email" name="email" value={facultyForm.email} readOnly className={inputClass + " cursor-not-allowed text-white/40"} />
                        </Field>
                        <Field label="Mobile Number">
                            <input required type="tel" name="mobile" value={facultyForm.mobile} onChange={setFForm} className={inputClass} placeholder="+91 9876543210" pattern="[0-9+\s\-]{10,15}" />
                        </Field>
                        <Field label="Events / Sessions to Attend">
                            <select required name="eventsAttending" value={facultyForm.eventsAttending} onChange={setFForm} className={inputClass + " appearance-none"}>
                                <option value="" disabled>Select Events</option>
                                {EVENTS.map(event => <option key={event} value={event} className="bg-[#111]">{event}</option>)}
                            </select>
                        </Field>
                        <button type="submit" disabled={loading} className="w-full mt-4 py-4 bg-rasrang-pink hover:bg-white text-white hover:text-black font-marquee text-xl tracking-widest transition-colors shadow-[0_0_20px_#FF007F] disabled:opacity-50">
                            {loading ? 'PROCESSING...' : 'CONFIRM FACULTY PASS'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
