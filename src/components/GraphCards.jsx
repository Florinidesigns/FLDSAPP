import React from 'react';

function GraphCards({ children }) {
    return (
        <div className="w-[80%] h-full">
            {children || (
                <div className="h-full bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-center text-gray-400">
                    Gráfico
                </div>
            )}
        </div>
    );
}

export default GraphCards;
