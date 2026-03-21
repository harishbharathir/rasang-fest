import useSound from 'use-sound';
import clapperSound from '../assets/sounds/clapper.mp3';

export const useClapperSnap = () => {
    const [play] = useSound(clapperSound, {
        volume: 0.5,
    });

    const handleClap = () => {
        play();
    };

    return {
        clapProps: {
            onMouseDown: handleClap,
            onTouchStart: handleClap,
        }
    };
};
