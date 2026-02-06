import React, { useState } from 'react';

function VendasParetoChart({ title = 'Vendas por Cliente (Pareto)' }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Mock data de clientes com suas vendas
    const clientesData = [
        { cliente: 'MODELO CONTINENTE', valor: 45321.90 },
        { cliente: 'LIDL PORTUGAL', valor: 34567.12 },
        { cliente: 'MAKRO - CASH & CARRY', valor: 23456.78 },
        { cliente: 'Tech Solutions Lda', valor: 15420.50 },
        { cliente: 'MERCADONA PORTUGAL', valor: 18934.56 },
        { cliente: 'AUCHAN PORTUGAL', valor: 12890.45 },
        { cliente: 'Mega Store SA', valor: 8750.25 }
    ];

    // Ordenar por valor e calcular percentagem acumulada
    const sortedData = [...clientesData].sort((a, b) => b.valor - a.valor);
    const totalVendas = sortedData.reduce((sum, item) => sum + item.valor, 0);

    const paretoData = sortedData.map((item, index) => {
        const percentageItem = (item.valor / totalVendas) * 100;
        const accumulatedPercentage = sortedData
            .slice(0, index + 1)
            .reduce((sum, d) => sum + (d.valor / totalVendas) * 100, 0);

        return {
            ...item,
            percentageItem,
            accumulatedPercentage
        };
    });

    // SVG dimensions
    const svgWidth = 500;
    const svgHeight = 300;
    const margin = { top: 20, right: 50, bottom: 50, left: 60 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    // Scales
    const maxValue = Math.max(...paretoData.map(d => d.valor));
    const barWidth = chartWidth / paretoData.length;
    const barMargin = 8;

    const xScale = (index) => margin.left + (index + 0.5) * barWidth;
    const yScaleValue = (value) => margin.top + chartHeight - (value / maxValue) * chartHeight;
    const yScalePercent = (percentage) => margin.top + chartHeight - (percentage / 100) * chartHeight;

    // Criar path para a linha de percentagem acumulada
    const linePath = paretoData
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)},${yScalePercent(d.accumulatedPercentage)}`)
        .join(' ');

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-4">
            <h3 className="text-base font-semibold mb-2 text-gray-800">{title}</h3>

            <div className="flex-1 flex justify-center items-center overflow-hidden">
                <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet" className="rounded-lg">
                    {/* Grid */}
                    {[20, 40, 60, 80, 100].map((percent) => (
                        <line
                            key={`grid-${percent}`}
                            x1={margin.left}
                            y1={yScalePercent(percent)}
                            x2={svgWidth - margin.right}
                            y2={yScalePercent(percent)}
                            stroke="#e5e7eb"
                            strokeDasharray="4"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Eixo X */}
                    <line
                        x1={margin.left}
                        y1={margin.top + chartHeight}
                        x2={svgWidth - margin.right}
                        y2={margin.top + chartHeight}
                        stroke="#374151"
                        strokeWidth="2"
                    />

                    {/* Eixo Y esquerdo (Valor €) */}
                    <line
                        x1={margin.left}
                        y1={margin.top}
                        x2={margin.left}
                        y2={margin.top + chartHeight}
                        stroke="#374151"
                        strokeWidth="2"
                    />

                    {/* Eixo Y direito (%) */}
                    <line
                        x1={svgWidth - margin.right}
                        y1={margin.top}
                        x2={svgWidth - margin.right}
                        y2={margin.top + chartHeight}
                        stroke="#374151"
                        strokeWidth="2"
                    />

                    {/* Labels eixo Y esquerdo (Valor) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                        const value = maxValue * ratio;
                        const y = yScaleValue(value);
                        return (
                            <g key={`y-label-${i}`}>
                                <line
                                    x1={margin.left - 5}
                                    y1={y}
                                    x2={margin.left}
                                    y2={y}
                                    stroke="#374151"
                                    strokeWidth="1"
                                />
                                <text
                                    x={margin.left - 10}
                                    y={y}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    className="text-[10px] fill-gray-600"
                                >
                                    €{(value / 1000).toFixed(0)}k
                                </text>
                            </g>
                        );
                    })}

                    {/* Labels eixo Y direito (%) */}
                    {[0, 25, 50, 75, 100].map((percent, i) => {
                        const y = yScalePercent(percent);
                        return (
                            <g key={`y-right-label-${i}`}>
                                <line
                                    x1={svgWidth - margin.right}
                                    y1={y}
                                    x2={svgWidth - margin.right + 5}
                                    y2={y}
                                    stroke="#374151"
                                    strokeWidth="1"
                                />
                                <text
                                    x={svgWidth - margin.right + 10}
                                    y={y}
                                    textAnchor="start"
                                    dominantBaseline="middle"
                                    className="text-[10px] fill-gray-600"
                                >
                                    {percent}%
                                </text>
                            </g>
                        );
                    })}

                    {/* Barras */}
                    {paretoData.map((d, i) => (
                        <g key={`bar-${i}`}>
                            <rect
                                x={xScale(i) - (barWidth - barMargin) / 2}
                                y={yScaleValue(d.valor)}
                                width={barWidth - barMargin}
                                height={chartHeight - (yScaleValue(d.valor) - margin.top)}
                                fill={`hsl(${35 + i * 8}, 85%, 55%)`}
                                opacity={hoveredIndex === i ? 1 : 0.7}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer transition-opacity"
                            />
                            {/* Valor na barra */}
                            <text
                                x={xScale(i)}
                                y={yScaleValue(d.valor) - 5}
                                textAnchor="middle"
                                className="text-[11px] font-semibold fill-gray-800"
                            >
                                €{(d.valor / 1000).toFixed(1)}k
                            </text>
                        </g>
                    ))}

                    {/* Linha de percentagem acumulada */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Pontos na linha */}
                    {paretoData.map((d, i) => (
                        <circle
                            key={`point-${i}`}
                            cx={xScale(i)}
                            cy={yScalePercent(d.accumulatedPercentage)}
                            r="4"
                            fill="#ef4444"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="cursor-pointer"
                        />
                    ))}

                    {/* Tooltip */}
                    {hoveredIndex !== null && (
                        <g>
                            <rect
                                x={xScale(hoveredIndex) + 10}
                                y={yScalePercent(paretoData[hoveredIndex].accumulatedPercentage) - 40}
                                width="140"
                                height="60"
                                fill="white"
                                stroke="#374151"
                                strokeWidth="1"
                                rx="4"
                            />
                            <text
                                x={xScale(hoveredIndex) + 20}
                                y={yScalePercent(paretoData[hoveredIndex].accumulatedPercentage) - 20}
                                className="text-[11px] font-semibold fill-gray-800"
                            >
                                {paretoData[hoveredIndex].cliente.substring(0, 15)}...
                            </text>
                            <text
                                x={xScale(hoveredIndex) + 20}
                                y={yScalePercent(paretoData[hoveredIndex].accumulatedPercentage) - 5}
                                className="text-[10px] fill-gray-600"
                            >
                                €{paretoData[hoveredIndex].valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                            </text>
                            <text
                                x={xScale(hoveredIndex) + 20}
                                y={yScalePercent(paretoData[hoveredIndex].accumulatedPercentage) + 10}
                                className="text-[10px] fill-red-600 font-semibold"
                            >
                                Acum: {paretoData[hoveredIndex].accumulatedPercentage.toFixed(1)}%
                            </text>
                        </g>
                    )}

                    {/* Labels eixo X */}
                    {paretoData.map((d, i) => (
                        <g key={`x-label-${i}`}>
                            <text
                                x={xScale(i)}
                                y={margin.top + chartHeight + 35}
                                textAnchor="middle"
                                className="text-[11px] fill-gray-600"
                            >
                                {d.cliente.split(' ')[0]}
                            </text>
                        </g>
                    ))}

                    {/* Título eixo Y esquerdo */}
                    <text
                        x={15}
                        y={margin.top + chartHeight / 2}
                        textAnchor="middle"
                        transform={`rotate(-90 15 ${margin.top + chartHeight / 2})`}
                        className="text-[12px] font-semibold fill-gray-700"
                    >
                        Valor €
                    </text>

                    {/* Título eixo Y direito */}
                    <text
                        x={svgWidth - 20}
                        y={margin.top + chartHeight / 2}
                        textAnchor="middle"
                        transform={`rotate(90 ${svgWidth - 20} ${margin.top + chartHeight / 2})`}
                        className="text-[12px] font-semibold fill-red-600"
                    >
                        Acumulado %
                    </text>
                </svg>
            </div>

            {/* Legenda */}
            <div className="mt-2 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span className="text-gray-600">Vendas por Cliente</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-red-500"></div>
                    <span className="text-gray-600">% Acumulado</span>
                </div>
            </div>
        </div>
    );
}

export default VendasParetoChart;
