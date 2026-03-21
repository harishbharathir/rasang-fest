import React, { useState } from 'react';
import useSound from 'use-sound';
import { Megaphone, MegaphoneOff } from 'lucide-react';
import projectorSound from '../assets/sounds/projector.mp3';

const AudioDirector = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { stop, pause }] = useSound(projectorSound, {
        loop: true,
        volume: 0.4,
        interrupt: false,
    });

    const toggleAudio = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={toggleAudio}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 border backdrop-blur-md ${isPlaying
                ? 'bg-rasrang-yellow/20 border-rasrang-yellow text-rasrang-yellow shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                }`}
            title={isPlaying ? "Douse the Projector" : "Start the Film"}
        >
            {isPlaying ? (
                <Megaphone size={20} className="animate-pulse" />
            ) : (
                <MegaphoneOff size={20} />
            )}
        </button>
    );
};

export default AudioDirector;
