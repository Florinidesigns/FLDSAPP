import React, { useState } from 'react';
import { useABCFilter } from '../../context/ABCFilterContext';

function ClientesChart({ title = 'Vendas Anual' }) {
    const [viewType, setViewType] = useState('valor'); // quantidade, valor, percentagem
    const [periodType, setPeriodType] = useState('mensal'); // mensal, trimestral, semestral
    const [visibleSeries, setVisibleSeries] = useState({ show2025: true, show2024: true, showMedia: false });
    const { abcFilter } = useABCFilter();

    // Mock data por classificação ABC (Pareto 80/20) e Estado de Atividade (tempo desde último movimento)
    const mockDataByFilter = {
        // Classificação A: Top 20% clientes que representam 80% do valor - VALORES MUITO ALTOS
        'A': {
            mensal: [
                { mes: 'Janeiro', valor2025: 485620.34, valor2024: 322450.67, quantidade2025: 3150, quantidade2024: 2680 },
                { mes: 'Fevereiro', valor2025: 258280.56, valor2024: 235012.34, quantidade2025: 1920, quantidade2024: 1790 },
                { mes: 'Março', valor2025: 570310.23, valor2024: 436180.89, quantidade2025: 2990, quantidade2024: 2480 },
                { mes: 'Abril', valor2025: 551042.87, valor2024: 395670.56, quantidade2025: 2940, quantidade2024: 2810 },
                { mes: 'Maio', valor2025: 554251.74, valor2024: 393574.05, quantidade2025: 3140, quantidade2024: 2672 },
                { mes: 'Junho', valor2025: 492080.08, valor2024: 361185.80, quantidade2025: 2968, quantidade2024: 2280 },
                { mes: 'Julho', valor2025: 651100.74, valor2024: 417195.20, quantidade2025: 3544, quantidade2024: 2776 },
                { mes: 'Agosto', valor2025: 738440.15, valor2024: 460634.18, quantidade2025: 4064, quantidade2024: 3320 },
                { mes: 'Setembro', valor2025: 708367.58, valor2024: 456407.66, quantidade2025: 3864, quantidade2024: 2960 },
                { mes: 'Outubro', valor2025: 644316.06, valor2024: 414817.78, quantidade2025: 3232, quantidade2024: 2776 },
                { mes: 'Novembro', valor2025: 604576.91, valor2024: 375461.45, quantidade2025: 3152, quantidade2024: 2504 },
                { mes: 'Dezembro', valor2025: 520314.74, valor2024: 335743.28, quantidade2025: 2544, quantidade2024: 2256 }
            ]
        },
        // Classificação B: 30% clientes que representam 15% do valor - VALORES MÉDIOS
        'B': {
            mensal: [
                { mes: 'Janeiro', valor2025: 91019.47, valor2024: 60419.22, quantidade2025: 736, quantidade2024: 620 },
                { mes: 'Fevereiro', valor2025: 48427.56, valor2024: 33356.69, quantidade2025: 360, quantidade2024: 288 },
                { mes: 'Março', valor2025: 106932.68, valor2024: 81791.76, quantidade2025: 562, quantidade2024: 466 },
                { mes: 'Abril', valor2025: 103320.39, valor2024: 74175.75, quantidade2025: 552, quantidade2024: 526 },
                { mes: 'Maio', valor2025: 103722.20, valor2024: 73795.13, quantidade2025: 589, quantidade2024: 501 },
                { mes: 'Junho', valor2025: 92265.02, valor2024: 67722.39, quantidade2025: 556, quantidade2024: 427 },
                { mes: 'Julho', valor2025: 122231.39, valor2024: 78223.70, quantidade2025: 665, quantidade2024: 520 },
                { mes: 'Agosto', valor2025: 138457.53, valor2024: 86368.91, quantidade2025: 762, quantidade2024: 622 },
                { mes: 'Setembro', valor2025: 132818.92, valor2024: 85576.44, quantidade2025: 724, quantidade2024: 555 },
                { mes: 'Outubro', valor2025: 120809.26, valor2024: 77778.33, quantidade2025: 606, quantidade2024: 520 },
                { mes: 'Novembro', valor2025: 113358.17, valor2024: 70399.02, quantidade2025: 591, quantidade2024: 469 },
                { mes: 'Dezembro', valor2025: 97559.01, valor2024: 62976.86, quantidade2025: 477, quantidade2024: 423 }
            ]
        },
        // Classificação C: 50% clientes que representam 5% do valor - VALORES BAIXOS
        'C': {
            mensal: [
                { mes: 'Janeiro', valor2025: 30152.66, valor2024: 19925.89, quantidade2025: 184, quantidade2024: 150 },
                { mes: 'Fevereiro', valor2025: 16142.51, valor2024: 11234.67, quantidade2025: 120, quantidade2024: 95 },
                { mes: 'Março', valor2025: 35640.88, valor2024: 27306.40, quantidade2025: 188, quantidade2024: 164 },
                { mes: 'Abril', valor2025: 34439.32, valor2024: 24992.02, quantidade2025: 188, quantidade2024: 174 },
                { mes: 'Maio', valor2025: 34840.74, valor2024: 24598.38, quantidade2025: 201, quantidade2024: 167 },
                { mes: 'Junho', valor2025: 30755.00, valor2024: 22574.44, quantidade2025: 186, quantidade2024: 143 },
                { mes: 'Julho', valor2025: 40543.79, valor2024: 26075.10, quantidade2025: 221, quantidade2024: 174 },
                { mes: 'Agosto', valor2025: 46152.51, valor2024: 28789.63, quantidade2025: 254, quantidade2024: 208 },
                { mes: 'Setembro', valor2025: 44272.97, valor2024: 28525.48, quantidade2025: 242, quantidade2024: 185 },
                { mes: 'Outubro', valor2025: 40269.76, valor2024: 25926.12, quantidade2025: 202, quantidade2024: 174 },
                { mes: 'Novembro', valor2025: 37786.06, valor2024: 23466.34, quantidade2025: 197, quantidade2024: 157 },
                { mes: 'Dezembro', valor2025: 32519.68, valor2024: 20958.96, quantidade2025: 159, quantidade2024: 141 }
            ]
        },
        // Activos: Movimento nos ÚLTIMOS 3 MESES (Nov, Dez, Jan atual) - valores consistentes, especialmente recentes
        'Ativos': {
            mensal: [
                { mes: 'Janeiro', valor2025: 485280.78, valor2024: 322140.56, quantidade2025: 2940, quantidade2024: 2450 },
                { mes: 'Fevereiro', valor2025: 258136.45, valor2024: 234890.34, quantidade2025: 1920, quantidade2024: 1784 },
                { mes: 'Março', valor2025: 569840.23, valor2024: 435890.12, quantidade2025: 2992, quantidade2024: 2488 },
                { mes: 'Abril', valor2025: 550670.34, valor2024: 395120.78, quantidade2025: 2944, quantidade2024: 2808 },
                { mes: 'Maio', valor2025: 553840.45, valor2024: 393240.67, quantidade2025: 3144, quantidade2024: 2676 },
                { mes: 'Junho', valor2025: 491780.89, valor2024: 360890.23, quantidade2025: 2968, quantidade2024: 2280 },
                { mes: 'Julho', valor2025: 650340.56, valor2024: 416780.12, quantidade2025: 3544, quantidade2024: 2776 },
                { mes: 'Agosto', valor2025: 737450.67, valor2024: 460120.34, quantidade2025: 4064, quantidade2024: 3320 },
                { mes: 'Setembro', valor2025: 707560.78, valor2024: 455890.56, quantidade2025: 3864, quantidade2024: 2960 },
                { mes: 'Outubro', valor2025: 643780.45, valor2024: 414340.89, quantidade2025: 3232, quantidade2024: 2776 },
                { mes: 'Novembro', valor2025: 604120.34, valor2024: 375120.67, quantidade2025: 3152, quantidade2024: 2504 },
                { mes: 'Dezembro', valor2025: 519890.23, valor2024: 335450.78, quantidade2025: 2544, quantidade2024: 2256 }
            ]
        },
        // Semi-Activos: Último movimento entre 3-8 meses - atividade irregular, gaps ocasionais
        'SemiAtivos': {
            mensal: [
                { mes: 'Janeiro', valor2025: 91340.56, valor2024: 60780.34, quantidade2025: 560, quantidade2024: 480 },
                { mes: 'Fevereiro', valor2025: 48560.23, valor2024: 24450.12, quantidade2025: 340, quantidade2024: 220 },
                { mes: 'Março', valor2025: 107120.45, valor2024: 82140.56, quantidade2025: 580, quantidade2024: 480 },
                { mes: 'Abril', valor2025: 52670.89, valor2024: 74560.34, quantidade2025: 390, quantidade2024: 540 },
                { mes: 'Maio', valor2025: 104230.67, valor2024: 74230.78, quantidade2025: 600, quantidade2024: 510 },
                { mes: 'Junho', valor2025: 92780.34, valor2024: 68120.45, quantidade2025: 570, quantidade2024: 450 },
                { mes: 'Julho', valor2025: 67340.23, valor2024: 78670.23, quantidade2025: 440, quantidade2024: 530 },
                { mes: 'Agosto', valor2025: 139230.56, valor2024: 86890.34, quantidade2025: 780, quantidade2024: 640 },
                { mes: 'Setembro', valor2025: 133450.78, valor2024: 71230.45, quantidade2025: 740, quantidade2024: 520 },
                { mes: 'Outubro', valor2025: 88560.34, valor2024: 78230.45, quantidade2025: 550, quantidade2024: 530 },
                { mes: 'Novembro', valor2025: 113890.67, valor2024: 70780.34, quantidade2025: 600, quantidade2024: 480 },
                { mes: 'Dezembro', valor2025: 98120.45, valor2024: 54340.78, quantidade2025: 490, quantidade2024: 380 }
            ]
        },
        // Inactivos: Sem movimento há 8+ meses - valores muito baixos/zero, quase sem atividade recente
        'Inativos': {
            mensal: [
                { mes: 'Janeiro', valor2025: 30171.13, valor2024: 19873.88, quantidade2025: 170, quantidade2024: 170 },
                { mes: 'Fevereiro', valor2025: 16153.95, valor2024: 9562.34, quantidade2025: 140, quantidade2024: 85 },
                { mes: 'Março', valor2025: 35923.11, valor2024: 27248.37, quantidade2025: 168, quantidade2024: 142 },
                { mes: 'Abril', valor2025: 138131.91, valor2024: 25156.21, quantidade2025: 736, quantidade2024: 162 },
                { mes: 'Maio', valor2025: 34743.56, valor2024: 24496.11, quantidade2025: 186, quantidade2024: 154 },
                { mes: 'Junho', valor2025: 30539.87, valor2024: 22371.95, quantidade2025: 172, quantidade2024: 140 },
                { mes: 'Julho', valor2025: 163535.36, valor2024: 26042.65, quantidade2025: 886, quantidade2024: 164 },
                { mes: 'Agosto', valor2025: 46369.96, valor2024: 28782.04, quantidade2025: 236, quantidade2024: 190 },
                { mes: 'Setembro', valor2025: 44447.91, valor2024: 114619.02, quantidade2025: 226, quantidade2024: 740 },
                { mes: 'Outubro', valor2025: 161614.82, valor2024: 25951.89, quantidade2025: 808, quantidade2024: 164 },
                { mes: 'Novembro', valor2025: 37710.13, valor2024: 23425.80, quantidade2025: 188, quantidade2024: 146 },
                { mes: 'Dezembro', valor2025: 32382.75, valor2024: 63228.32, quantidade2025: 146, quantidade2024: 564 }
            ]
        },
        'Todos': {
            mensal: [
                { mes: 'Janeiro', valor2025: 606792.47, valor2024: 402794.78, quantidade2025: 3670, quantidade2024: 3100 },
                { mes: 'Fevereiro', valor2025: 322850.63, valor2024: 293612.92, quantidade2025: 2400, quantidade2024: 2230 },
                { mes: 'Março', valor2025: 712883.79, valor2024: 545279.05, quantidade2025: 3740, quantidade2024: 3110 },
                { mes: 'Abril', valor2025: 688802.58, valor2024: 494838.33, quantidade2025: 3680, quantidade2024: 3510 },
                { mes: 'Maio', valor2025: 692814.68, valor2024: 491967.56, quantidade2025: 3930, quantidade2024: 3340 },
                { mes: 'Junho', valor2025: 615100.10, valor2024: 451482.63, quantidade2025: 3710, quantidade2024: 2850 },
                { mes: 'Julho', valor2025: 813875.92, valor2024: 521494.00, quantidade2025: 4430, quantidade2024: 3470 },
                { mes: 'Agosto', valor2025: 923050.19, valor2024: 575792.72, quantidade2025: 5080, quantidade2024: 4150 },
                { mes: 'Setembro', valor2025: 885459.47, valor2024: 570509.58, quantidade2025: 4830, quantidade2024: 3700 },
                { mes: 'Outubro', valor2025: 805395.08, valor2024: 518522.23, quantidade2025: 4040, quantidade2024: 3470 },
                { mes: 'Novembro', valor2025: 755721.14, valor2024: 469326.81, quantidade2025: 3940, quantidade2024: 3130 },
                { mes: 'Dezembro', valor2025: 650393.43, valor2024: 419679.10, quantidade2025: 3180, quantidade2024: 2820 }
            ]
        }
    };

    // Obter dados baseado no filtro selecionado
    const getFilteredMockData = () => {
        if (abcFilter === 'Ativos') return mockDataByFilter['Ativos'];
        if (abcFilter === 'SemiAtivos') return mockDataByFilter['SemiAtivos'];
        if (abcFilter === 'Inativos') return mockDataByFilter['Inativos'];
        if (abcFilter === 'SemiAtivos') return mockDataByFilter['B'];
        if (abcFilter === 'Inativos') return mockDataByFilter['C'];
        if (abcFilter === 'A' || abcFilter === 'B' || abcFilter === 'C') {
            return mockDataByFilter[abcFilter];
        }
        return mockDataByFilter['Todos'];
    };

    const mockData = getFilteredMockData();

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
            return `${value.toFixed(2)}%`;
        } else if (viewType === 'valor') {
            return `${(value / 1000).toFixed(2)}K`;
        }
        return value.toString();
    };

    const getAverage = () => {
        const data = getData();
        const values = [];

        if (viewType === 'percentagem') {
            values.push(...data.map(d => d.percentagem2025));
        } else {
            if (visibleSeries.show2025) {
                values.push(...data.map(d => d[`${viewType}2025`]));
            }
            if (visibleSeries.show2024) {
                values.push(...data.map(d => d[`${viewType}2024`]));
            }
        }

        if (values.length === 0) return 0;
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    };

    const getChartColors = () => {
        if (abcFilter === 'A' || abcFilter === 'Ativos') {
            return { color2025: 'bg-green-400', color2024: 'bg-green-700', text2025: 'text-slate-700', text2024: 'text-white', legend2025: 'bg-green-400', legend2024: 'bg-green-700' };
        }
        if (abcFilter === 'B' || abcFilter === 'SemiAtivos') {
            return { color2025: 'bg-yellow-400', color2024: 'bg-yellow-600', text2025: 'text-slate-900', text2024: 'text-white', legend2025: 'bg-yellow-400', legend2024: 'bg-yellow-600' };
        }
        if (abcFilter === 'C' || abcFilter === 'Inativos') {
            return { color2025: 'bg-red-400', color2024: 'bg-red-700', text2025: 'text-white', text2024: 'text-white', legend2025: 'bg-red-400', legend2024: 'bg-red-700' };
        }
        // Default - Todos
        return { color2025: 'bg-cyan-400', color2024: 'bg-slate-600', text2025: 'text-slate-700', text2024: 'text-white', legend2025: 'bg-cyan-400', legend2024: 'bg-slate-600' };
    };

    const colors = getChartColors();
    const chartTitle = abcFilter !== 'Todos' ? `${title} - ${abcFilter}` : title;

    const getLegendLabels = () => {
        if (abcFilter === 'A' || abcFilter === 'Ativos') {
            return { label2025: '2025 - A', label2024: '2024 - A' };
        }
        if (abcFilter === 'B' || abcFilter === 'SemiAtivos') {
            return { label2025: '2025 - B', label2024: '2024 - B' };
        }
        if (abcFilter === 'C' || abcFilter === 'Inativos') {
            return { label2025: '2025 - C', label2024: '2024 - C' };
        }
        return { label2025: '2025', label2024: '2024' };
    };

    const legendLabels = getLegendLabels();

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Title Bar */}
            <div className="h-10 w-full bg-linear-to-r from-slate-600 to-slate-500 flex items-center px-4 shrink-0">
                <span className="text-white font-semibold text-sm">{chartTitle}</span>
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
                            <>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 ${colors.legend2025} rounded`}></div>
                                    <span className="text-sm font-semibold">Variação % {legendLabels.label2025}</span>
                                </div>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, showMedia: !prev.showMedia }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-0.5 ${visibleSeries.showMedia ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.showMedia ? 'text-gray-900' : 'text-gray-400'}`}>Média</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, show2025: !prev.show2025 }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-3 rounded ${visibleSeries.show2025 ? colors.legend2025 : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.show2025 ? 'text-gray-900' : 'text-gray-400'}`}>{legendLabels.label2025}</span>
                                </button>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, show2024: !prev.show2024 }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-3 rounded ${visibleSeries.show2024 ? colors.legend2024 : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.show2024 ? 'text-gray-900' : 'text-gray-400'}`}>{legendLabels.label2024}</span>
                                </button>
                                <button
                                    onClick={() => setVisibleSeries(prev => ({ ...prev, showMedia: !prev.showMedia }))}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-3 h-0.5 ${visibleSeries.showMedia ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    <span className={`text-sm font-semibold ${visibleSeries.showMedia ? 'text-gray-900' : 'text-gray-400'}`}>Média</span>
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
                    <div className="flex-1 flex items-end justify-between gap-1 px-2 relative">
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
                                                    className={`w-full ${colors.color2025} rounded-t flex items-center justify-center`}
                                                    style={{ height: `${height2025}%` }}
                                                >
                                                    {height2025 > 15 && (
                                                        <span className={`text-[9px] font-semibold ${colors.text2025} transform -rotate-90 whitespace-nowrap`}>
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
                                                        className={`w-full ${colors.color2025} rounded-t flex items-center justify-center`}
                                                        style={{ height: `${height2025}%` }}
                                                    >
                                                        {height2025 > 15 && (
                                                            <span className={`text-[9px] font-semibold ${colors.text2025} transform -rotate-90 whitespace-nowrap`}>
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
                                                        className={`w-full ${colors.color2024} rounded-t flex items-center justify-center`}
                                                        style={{ height: `${height2024}%` }}
                                                    >
                                                        {height2024 > 15 && (
                                                            <span className={`text-[9px] font-semibold ${colors.text2024} transform -rotate-90 whitespace-nowrap`}>
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
                        {/* Average Line - Rendered last to appear on top */}
                        {visibleSeries.showMedia && (
                            <div
                                className="absolute left-0 right-0 border-t-2 border-orange-500 border-dashed pointer-events-none z-10"
                                style={{ bottom: `${(getAverage() / getMaxValue()) * 100}%` }}
                            >
                                <span className="absolute -top-5 right-2 text-xs font-semibold text-orange-600 bg-white px-1">
                                    {formatValue(getAverage())}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientesChart;
