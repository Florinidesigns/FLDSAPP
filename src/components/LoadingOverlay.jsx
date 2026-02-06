import React from 'react';

function LoadingOverlay({ isLoading, text = 'Loading' }) {
    if (!isLoading) return null;

    const letters = Array.from(text);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-9999 bg-opacity-0 pointer-events-none">
            <div className="h-[30%] w-full flex items-center justify-center bg-slate-900 bg-opacity-90 pointer-events-auto">
                <h1 className="flex gap-1 loading-text text-4xl md:text-6xl text-white font-bold justify-center flex-wrap">
                    {letters.map((char, index) => (
                        <span
                            key={`${char}-${index}`}
                            className="loading-letter inline-block"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
            </div>
        </div>
    );
}

export default LoadingOverlay;
