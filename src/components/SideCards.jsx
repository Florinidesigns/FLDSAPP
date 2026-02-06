import React from 'react';

function SideCards({ cardCount = 4, data = [] }) {
    const cards = data.length > 0 ? data : Array.from({ length: cardCount }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
        value: 'Dados'
    }));

    return (
        <div className="w-[20%] flex flex-col gap-3">
            {cards.map((card, index) => (
                <div
                    key={card.id || index}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow-md p-3 text-white flex flex-col justify-between flex-1"
                >
                    <span className="text-xs font-bold">{card.title}</span>
                    <span className="text-sm">{card.value}</span>
                </div>
            ))}
        </div>
    );
}

export default SideCards;
