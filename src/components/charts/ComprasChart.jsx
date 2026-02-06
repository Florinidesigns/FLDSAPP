import React, { useState } from 'react';

function ComprasChart({ title = 'Compras' }) {
    const [viewType, setViewType] = useState('valor'); // quantidade, valor, percentagem
    const [periodType, setPeriodType] = useState('mensal'); // mensal, trimestral, semestral
    const [visibleSeries, setVisibleSeries] = useState({ show2025: true, show2024: true });

    // Mock data para compras
    const mockData = {
        mensal: [
            { mes: 'Jan', valor2025: 780000, valor2024: 556000, quantidade2025: 3200, quantidade2024: 2800 },
            { mes: 'Fev', valor2025: 825000, valor2024: 590000, quantidade2025: 3400, quantidade2024: 2900 },
            { mes: 'Mar', valor2025: 950000, valor2024: 620000, quantidade2025: 3900, quantidade2024: 3100 },
            { mes: 'Abr', valor2025: 890000, valor2024: 720000, quantidade2025: 3700, quantidade2024: 3500 },
            { mes: 'Mai', valor2025: 910000, valor2024: 680000, quantidade2025: 3800, quantidade2024: 3300 },
            { mes: 'Jun', valor2025: 875000, valor2024: 550000, quantidade2025: 3650, quantidade2024: 2750 },
            { mes: 'Jul', valor2025: 1020000, valor2024: 700000, quantidade2025: 4200, quantidade2024: 3400 },
            { mes: 'Ago', valor2025: 1180000, valor2024: 890000, quantidade2025: 4800, quantidade2024: 4100 },
            { mes: 'Set', valor2025: 1150000, valor2024: 760000, quantidade2025: 4750, quantidade2024: 3600 },
            { mes: 'Out', valor2025: 920000, valor2024: 695000, quantidade2025: 3850, quantidade2024: 3350 },
            { mes: 'Nov', valor2025: 880000, valor2024: 625000, quantidade2025: 3700, quantidade2024: 3100 },
            { mes: 'Dez', valor2025: 710000, valor2024: 560000, quantidade2025: 3100, quantidade2024: 2800 }
        ]
    };

    const getAggregatedData = () => {
        const mensal = mockData.mensal;

        if (periodType === 'mensal') {
            return mensal;
        } else if (periodType === 'trimestral') {
            return [
                {
                    mes: 'Q1',
                    valor2025: mensal[0].valor2025 + mensal[1].valor2025 + mensal[2].valor2025,
                    valor2024: mensal[0].valor2024 + mensal[1].valor2024 + mensal[2].valor2024,
                    quantidade2025: mensal[0].quantidade2025 + mensal[1].quantidade2025 + mensal[2].quantidade2025,
                    quantidade2024: mensal[0].quantidade2024 + mensal[1].quantidade2024 + mensal[2].quantidade2024
                },
                {
                    mes: 'Q2',
                    valor2025: mensal[3].valor2025 + mensal[4].valor2025 + mensal[5].valor2025,
                    valor2024: mensal[3].valor2024 + mensal[4].valor2024 + mensal[5].valor2024,
                    quantidade2025: mensal[3].quantidade2025 + mensal[4].quantidade2025 + mensal[5].quantidade2025,
                    quantidade2024: mensal[3].quantidade2024 + mensal[4].quantidade2024 + mensal[5].quantidade2024
                },
                {
                    mes: 'Q3',
                    valor2025: mensal[6].valor2025 + mensal[7].valor2025 + mensal[8].valor2025,
                    valor2024: mensal[6].valor2024 + mensal[7].valor2024 + mensal[8].valor2024,
                    quantidade2025: mensal[6].quantidade2025 + mensal[7].quantidade2025 + mensal[8].quantidade2025,
                    quantidade2024: mensal[6].quantidade2024 + mensal[7].quantidade2024 + mensal[8].quantidade2024
                },
                {
                    mes: 'Q4',
                    valor2025: mensal[9].valor2025 + mensal[10].valor2025 + mensal[11].valor2025,
                    valor2024: mensal[9].valor2024 + mensal[10].valor2024 + mensal[11].valor2024,
                    quantidade2025: mensal[9].quantidade2025 + mensal[10].quantidade2025 + mensal[11].quantidade2025,
                    quantidade2024: mensal[9].quantidade2024 + mensal[10].quantidade2024 + mensal[11].quantidade2024
                }
            ];
        } else if (periodType === 'semestral') {
            return [
                {
                    mes: 'S1',
                    valor2025: mensal.slice(0, 6).reduce((sum, m) => sum + m.valor2025, 0),
                    valor2024: mensal.slice(0, 6).reduce((sum, m) => sum + m.valor2024, 0),
                    quantidade2025: mensal.slice(0, 6).reduce((sum, m) => sum + m.quantidade2025, 0),
                    quantidade2024: mensal.slice(0, 6).reduce((sum, m) => sum + m.quantidade2024, 0)
                },
                {
                    mes: 'S2',
                    valor2025: mensal.slice(6, 12).reduce((sum, m) => sum + m.valor2025, 0),
                    valor2024: mensal.slice(6, 12).reduce((sum, m) => sum + m.valor2024, 0),
                    quantidade2025: mensal.slice(6, 12).reduce((sum, m) => sum + m.quantidade2025, 0),
                    quantidade2024: mensal.slice(6, 12).reduce((sum, m) => sum + m.quantidade2024, 0)
                }
            ];
        }
        return mensal;
    };

    const getData = () => {
        const data = getAggregatedData();

        // Calcular percentagens se necessário
        if (viewType === 'percentagem') {
            return data.map(item => ({
                ...item,
                percentagem2025: item.valor2024 !== 0 ? ((item.valor2025 - item.valor2024) / item.valor2024) * 100 : 0,
                percentagem2024: 0 // baseline
            }));
        }

        return data;
    };

    const getMaxValue = () => {
        const data = getData();
        if (viewType === 'percentagem') {
            const max = Math.max(...data.map(d => Math.abs(d[`${viewType}2025`])));
            return max;
        }

        const values = [];
        if (visibleSeries.show2025) {
            values.push(...data.map(d => d[`${viewType}2025`]));
        }
        if (visibleSeries.show2024) {
            values.push(...data.map(d => d[`${viewType}2024`]));
        }

        return values.length > 0 ? Math.max(...values) : 1;
    };

    const formatValue = (value) => {
        if (viewType === 'percentagem') {
            return `${value.toFixed(1)}%`;
        } else if (viewType === 'valor') {
            return `${(value / 1000).toFixed(0)}K`;
        }
        return value.toString();
    };

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Title Bar */}
            <div className="h-10 w-full bg-linear-to-r from-slate-600 to-slate-500 flex items-center px-4 shrink-0">
                <span className="text-white font-semibold text-sm">{title}</span>
            </div>

            {/* Chart Content */}
            <div className="flex-1 flex flex-col p-3 min-h-0">
                {/* Controls and Legend */}
                <div className="flex justify-between items-center mb-2 shrink-0">
                    {/* Left controls - View Type */}
                    <div className="flex gap-1">
                        <button
                            onClick={() => setViewType('quantidade')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${viewType === 'quantidade'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Quantidade
                        </button>
                        <button
                            onClick={() => setViewType('valor')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${viewType === 'valor'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Valor
                        </button>
                        <button
                            onClick={() => setViewType('percentagem')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${viewType === 'percentagem'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Percentagem
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-6">
                        {viewType === 'percentagem' ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-rose-400 rounded"></div>
                                <span className="text-sm font-semibold">Variação % 2025</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, show2025: !prev.show2025 }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-3 rounded ${visibleSeries.show2025 ? 'bg-rose-400' : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.show2025 ? 'text-gray-900' : 'text-gray-400'}`}>2025</span>
                                </button>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, show2024: !prev.show2024 }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-3 rounded ${visibleSeries.show2024 ? 'bg-slate-500' : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.show2024 ? 'text-gray-900' : 'text-gray-400'}`}>2024</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right controls - Period Type */}
                    <div className="flex gap-1">
                        <button
                            onClick={() => setPeriodType('mensal')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${periodType === 'mensal'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setPeriodType('trimestral')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${periodType === 'trimestral'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Trimestral
                        </button>
                        <button
                            onClick={() => setPeriodType('semestral')}
                            className={`px-3 py-1 text-sm rounded-lg border transition-all ${periodType === 'semestral'
                                ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-600'
                                }`}
                        >
                            Semestral
                        </button>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="flex-1 flex items-end justify-between gap-1 px-2">
                        {getData().map((item, index) => {
                            const maxValue = getMaxValue();
                            const value2025 = item[`${viewType}2025`];
                            const value2024 = item[`${viewType}2024`];
                            const height2025 = (value2025 / maxValue) * 100;
                            const height2024 = (value2024 / maxValue) * 100;

                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-1 h-full">
                                    {/* Bars Container */}
                                    {viewType === 'percentagem' ? (
                                        <div className="w-full flex items-end justify-center flex-1 pb-1">
                                            {/* Single Percentage Bar */}
                                            <div className="relative flex-1 h-full flex flex-col justify-end">
                                                <div
                                                    className="w-full bg-rose-400 rounded-t flex items-center justify-center"
                                                    style={{ height: `${height2025}%` }}
                                                >
                                                    {height2025 > 15 && (
                                                        <span className="text-[9px] font-semibold text-slate-700 transform -rotate-90 whitespace-nowrap">
                                                            {formatValue(value2025)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full flex items-end gap-1 flex-1 pb-1">
                                            {/* 2025 Bar */}
                                            {visibleSeries.show2025 && (
                                                <div className="relative flex-1 h-full flex flex-col justify-end">
                                                    <div
                                                        className="w-full bg-rose-400 rounded-t flex items-center justify-center"
                                                        style={{ height: `${height2025}%` }}
                                                    >
                                                        {height2025 > 15 && (
                                                            <span className="text-[9px] font-semibold text-slate-700 transform -rotate-90 whitespace-nowrap">
                                                                {formatValue(value2025)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {/* 2024 Bar */}
                                            {visibleSeries.show2024 && (
                                                <div className="relative flex-1 h-full flex flex-col justify-end">
                                                    <div
                                                        className="w-full bg-slate-500 rounded-t flex items-center justify-center"
                                                        style={{ height: `${height2024}%` }}
                                                    >
                                                        {height2024 > 15 && (
                                                            <span className="text-[9px] font-semibold text-white transform -rotate-90 whitespace-nowrap">
                                                                {formatValue(value2024)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* Month label */}
                                    <span className="text-xs font-medium text-gray-600">{item.mes}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComprasChart;
