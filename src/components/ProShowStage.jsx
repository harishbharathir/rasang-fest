import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import velvetCurtains from '../assets/velvet-curtains.png';
import moviePoster from '../assets/movie-poster.jpg';
import { useClapperSnap } from '../hooks/useClapperSnap';
import curtainSound from '../assets/sounds/curtain.mp3';
import useSound from 'use-sound';

const ProShowStage = ({ onAddToCart }) => {
    const { scrollYProgress } = useScroll();
    const { clapProps } = useClapperSnap();
    const [hasPlayedCurtain, setHasPlayedCurtain] = useState(false);

    const [playCurtain] = useSound(curtainSound, { volume: 0.8 });

    // Curtain logic: When scroll hits this section, move left and right
    const moveLeft = useTransform(scrollYProgress, [0.75, 0.9], ["0%", "-100%"]);
    const moveRight = useTransform(scrollYProgress, [0.75, 0.9], ["0%", "100%"]);

    // Trigger curtain sound
    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", v => {
            // Only trigger if we cross 0.8 significantly
            if (v > 0.8 && !hasPlayedCurtain) {
                playCurtain();
                setHasPlayedCurtain(true);
            }
            // Reset only when scrolled far away from the section
            else if (v < 0.6 && hasPlayedCurtain) {
                setHasPlayedCurtain(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, hasPlayedCurtain, playCurtain]);

    return (
        <section className="relative h-screen bg-rasrang-black overflow-hidden flex items-center justify-center">
            {/* Main Poster Background */}
            <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center p-4"
            >
                <div className="relative max-w-4xl w-full aspect-[16/9] border-8 border-rasrang-yellow bg-rasrang-charcoal shadow-[0_0_100px_rgba(255,215,0,0.2)] overflow-hidden">
                    <img
                        src={moviePoster}
                        alt="Pro Show Artist"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-125 saturate-150"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rasrang-black via-black/20 to-transparent p-12 flex flex-col justify-end items-center text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-6xl md:text-9xl font-marquee text-rasrang-yellow mb-4 leading-none strike-through">
                                GRAND FINALE
                            </h2>
                            <div className="bg-rasrang-pink text-white px-8 py-2 font-cinema text-2xl tracking-[0.3em] inline-block mb-8 mb-4">
                                THE MAIN STAGE
                            </div>
                            <p className="font-typewriter text-rasrang-cyan text-lg md:text-2xl mb-12">
                                2 DAYS • 10 ARTISTS • UNLIMITED ENERGY
                            </p>

                            <button
                                onClick={() => onAddToCart({ id: 'pro-show', name: 'GRAND FINALE PRO SHOW' })}
                                {...clapProps}
                                className="group relative px-12 py-5 bg-white text-black font-marquee text-3xl hover:bg-rasrang-pink hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10">GET PRO PASS</span>
                                <div className="absolute inset-0 bg-rasrang-yellow translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Velvet Curtains */}
            <div className="absolute inset-0 z-20 flex pointer-events-none">
                {/* Left Curtain */}
                <motion.div
                    style={{ x: moveLeft, backgroundImage: `url(${velvetCurtains})` }}
                    className="h-full w-1/2 bg-red-900 border-r-4 border-red-950 relative bg-cover bg-right"
                >
                    {/* Folds/Shadows */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.3)_50%,transparent_100%)] bg-[size:10%_100%] opacity-40"></div>
                    {/* Golden Tassel */}
                    <div className="absolute bottom-20 right-4 w-8 h-32 bg-rasrang-yellow rounded-full blur-[1px]"></div>
                </motion.div>

                {/* Right Curtain */}
                <motion.div
                    style={{ x: moveRight, backgroundImage: `url(${velvetCurtains})` }}
                    className="h-full w-1/2 bg-red-900 border-l-4 border-red-950 relative bg-cover bg-left"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.3)_50%,transparent_100%)] bg-[size:10%_100%] opacity-40"></div>
                    {/* Golden Tassel */}
                    <div className="absolute bottom-20 left-4 w-8 h-32 bg-rasrang-yellow rounded-full blur-[1px]"></div>
                </motion.div>
            </div>

            {/* Curtain Pull Message */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.7, 0.75], [1, 0]) }}
                className="absolute z-30 flex flex-col items-center pointer-events-none"
            >
                <p className="text-white font-cinema tracking-[0.5em] text-xl">DRAIN THE LIGHTS</p>
                <div className="w-px h-20 bg-white mt-4"></div>
            </motion.div>
        </section>
    );
};

export default ProShowStage;
