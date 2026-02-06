import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

function ABCFilter({ activeFilter, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    const filters = [
        { key: 'Todos', label: 'Todos', group: 'main' },
        { key: 'A', label: 'A', group: 'letters' },
        { key: 'B', label: 'B', group: 'letters' },
        { key: 'C', label: 'C', group: 'letters' },
        { key: 'Ativos', label: 'Activos', group: 'status' },
        { key: 'SemiAtivos', label: 'Semi-Activos', group: 'status' },
        { key: 'Inativos', label: 'Inactivos', group: 'status' }
    ];

    const getDisplayLabel = () => {
        const filter = filters.find(f => f.key === activeFilter);
        return filter ? filter.label : 'Todos';
    };

    const handleSelect = (key) => {
        onFilterChange(key);
        setIsOpen(false);
    };

    const handleButtonClick = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
        setIsOpen(!isOpen);
    };

    const getButtonColor = () => {
        if (activeFilter === 'A') return 'bg-green-500 text-white border-green-600';
        if (activeFilter === 'B') return 'bg-yellow-400 text-slate-900 border-yellow-500';
        if (activeFilter === 'C') return 'bg-red-500 text-white border-red-600';
        if (activeFilter === 'Ativos') return 'bg-green-500 text-white border-green-600';
        if (activeFilter === 'SemiAtivos') return 'bg-yellow-400 text-slate-900 border-yellow-500';
        if (activeFilter === 'Inativos') return 'bg-red-500 text-white border-red-600';
        return 'bg-white text-slate-700 border-slate-300';
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className={`
                    flex items-center gap-2 px-4 py-2 border-2
                    rounded-lg font-semibold text-sm
                    transition-all duration-200 shadow-sm hover:opacity-80
                    ${getButtonColor()}
                `}
            >
                <span>Classificação: {getDisplayLabel()}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="fixed bg-white border-2 border-slate-300 rounded-lg shadow-lg z-[9999] w-56"
                    style={{
                        top: `${dropdownPos.top}px`,
                        left: `${dropdownPos.left}px`
                    }}
                >
                    {/* Grupo Todos */}
                    <div className="p-2">
                        <button
                            onClick={() => handleSelect('Todos')}
                            className={`
                                w-full text-left px-3 py-2 rounded text-sm font-semibold
                                transition-colors duration-150
                                ${activeFilter === 'Todos'
                                    ? 'bg-slate-500 text-white'
                                    : 'hover:bg-slate-100 text-slate-700'
                                }
                            `}
                        >
                            Todos
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200"></div>

                    {/* Grupo Letras */}
                    <div className="p-2">
                        <div className="text-xs font-bold text-slate-500 px-3 py-1 uppercase mb-2">Categorias</div>
                        <div className="flex gap-2">
                            {filters
                                .filter(f => f.group === 'letters')
                                .map(filter => {
                                    let bgColor = 'bg-slate-300 text-slate-700';
                                    if (activeFilter === filter.key) {
                                        if (filter.key === 'A') bgColor = 'bg-green-500 text-white';
                                        if (filter.key === 'B') bgColor = 'bg-yellow-400 text-slate-900';
                                        if (filter.key === 'C') bgColor = 'bg-red-500 text-white';
                                    }
                                    return (
                                        <button
                                            key={filter.key}
                                            onClick={() => handleSelect(filter.key)}
                                            className={`
                                                flex-1 px-3 py-2 rounded text-sm font-bold
                                                transition-colors duration-150 text-center
                                                ${bgColor} hover:opacity-80
                                            `}
                                        >
                                            {filter.label}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200"></div>

                    {/* Grupo Status */}
                    <div className="p-2">
                        <div className="text-xs font-bold text-slate-500 px-3 py-1 uppercase">Estado</div>
                        {filters
                            .filter(f => f.group === 'status')
                            .map(filter => {
                                let bgColor = 'bg-slate-300 text-slate-700';
                                if (activeFilter === filter.key) {
                                    if (filter.key === 'Ativos') bgColor = 'bg-green-500 text-white';
                                    if (filter.key === 'SemiAtivos') bgColor = 'bg-yellow-400 text-slate-900';
                                    if (filter.key === 'Inativos') bgColor = 'bg-red-500 text-white';
                                }
                                return (
                                    <button
                                        key={filter.key}
                                        onClick={() => handleSelect(filter.key)}
                                        className={`
                                            w-full text-left px-3 py-2 rounded text-sm font-semibold
                                            transition-colors duration-150
                                            ${bgColor} hover:opacity-80
                                        `}
                                    >
                                        {filter.label}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ABCFilter;
