import React from 'react';

function GraphCardsHalf({ children }) {
    return (
        <div className="flex-1 h-full">
            <div className="h-full">
                {children || (
                    <div className="h-full bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-center text-gray-400">
                        Gráfico
                    </div>
                )}
            </div>
        </div>
    );
}

export default GraphCardsHalf;
