import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('gameVolume');
        return savedVolume ? parseInt(savedVolume) : 50;
    });
    const [audio] = useState(() => new Audio('/song/som.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audio.loop = true;
        audio.volume = volume / 100;

        return () => {
            audio.pause();
        };
    }, [audio]);

    useEffect(() => {
        audio.volume = volume / 100;
        localStorage.setItem('gameVolume', volume);
    }, [volume, audio]);

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <AudioContext.Provider value={{ volume, setVolume, isPlaying, togglePlay }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}