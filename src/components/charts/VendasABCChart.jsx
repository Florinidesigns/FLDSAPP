import React, { useState } from 'react';

function VendasABCChart({ title = 'Análise ABC - Clientes' }) {
    const [hoveredSegment, setHoveredSegment] = useState(null);

    // Mock data de clientes com suas vendas
    const clientesData = [
        { cliente: 'MODELO CONTINENTE', valor: 45321.90 },
        { cliente: 'LIDL PORTUGAL', valor: 34567.12 },
        { cliente: 'MAKRO - CASH & CARRY', valor: 23456.78 },
        { cliente: 'MERCADONA PORTUGAL', valor: 18934.56 },
        { cliente: 'Tech Solutions Lda', valor: 15420.50 },
        { cliente: 'AUCHAN PORTUGAL', valor: 12890.45 },
        { cliente: 'Mega Store SA', valor: 8750.25 }
    ];

    // Ordenar por valor e calcular percentagem acumulada
    const sortedData = [...clientesData].sort((a, b) => b.valor - a.valor);
    const totalVendas = sortedData.reduce((sum, item) => sum + item.valor, 0);

    let accumulatedPercentage = 0;
    const categorizedData = sortedData.map((item) => {
        const percentageItem = (item.valor / totalVendas) * 100;
        accumulatedPercentage += percentageItem;

        let category;
        if (accumulatedPercentage <= 80) {
            category = 'A';
        } else if (accumulatedPercentage <= 95) {
            category = 'B';
        } else {
            category = 'C';
        }

        return { ...item, category, percentageItem, accumulatedPercentage };
    });

    // Agrupar por categoria
    const abcSummary = {
        A: {
            clientes: categorizedData.filter(d => d.category === 'A').length,
            valor: categorizedData.filter(d => d.category === 'A').reduce((sum, d) => sum + d.valor, 0),
            color: '#22c55e',
            label: 'Clientes A'
        },
        B: {
            clientes: categorizedData.filter(d => d.category === 'B').length,
            valor: categorizedData.filter(d => d.category === 'B').reduce((sum, d) => sum + d.valor, 0),
            color: '#f59e0b',
            label: 'Clientes B'
        },
        C: {
            clientes: categorizedData.filter(d => d.category === 'C').length,
            valor: categorizedData.filter(d => d.category === 'C').reduce((sum, d) => sum + d.valor, 0),
            color: '#ef4444',
            label: 'Clientes C'
        }
    };

    // Calcular percentagens
    Object.keys(abcSummary).forEach(key => {
        abcSummary[key].percentage = (abcSummary[key].valor / totalVendas) * 100;
    });

    // SVG dimensions
    const size = 280;
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = 100;
    const innerRadius = 60;

    // Criar segmentos do donut
    const segments = [];
    let startAngle = -90; // Começar no topo

    ['A', 'B', 'C'].forEach((category) => {
        const data = abcSummary[category];
        const angle = (data.percentage / 100) * 360;
        const endAngle = startAngle + angle;

        segments.push({
            category,
            ...data,
            startAngle,
            endAngle,
            angle
        });

        startAngle = endAngle;
    });

    // Função para criar path do arco
    const createArcPath = (startAngle, endAngle, outerR, innerR) => {
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + outerR * Math.cos(startAngleRad);
        const y1 = centerY + outerR * Math.sin(startAngleRad);
        const x2 = centerX + outerR * Math.cos(endAngleRad);
        const y2 = centerY + outerR * Math.sin(endAngleRad);
        const x3 = centerX + innerR * Math.cos(endAngleRad);
        const y3 = centerY + innerR * Math.sin(endAngleRad);
        const x4 = centerX + innerR * Math.cos(startAngleRad);
        const y4 = centerY + innerR * Math.sin(startAngleRad);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return `
            M ${x1} ${y1}
            A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4} ${y4}
            Z
        `;
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-2">
            <h3 className="text-sm font-semibold mb-1 text-gray-800">{title}</h3>

            <div className="flex-1 flex items-center justify-between gap-2 min-h-0">
                {/* Gráfico Donut */}
                <div className="flex items-center justify-center self-center" style={{ width: '200px', height: '200px' }}>
                    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
                        {segments.map((segment, index) => (
                            <g key={segment.category}>
                                <path
                                    d={createArcPath(segment.startAngle, segment.endAngle, outerRadius, innerRadius)}
                                    fill={segment.color}
                                    opacity={hoveredSegment === segment.category ? 1 : 0.85}
                                    onMouseEnter={() => setHoveredSegment(segment.category)}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                    className="cursor-pointer transition-opacity"
                                />
                                {/* Etiqueta da categoria */}
                                <text
                                    x={centerX + (outerRadius - 20) * Math.cos(((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180)}
                                    y={centerY + (outerRadius - 20) * Math.sin(((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180)}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-2xl font-bold fill-white"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {segment.category}
                                </text>
                            </g>
                        ))}

                        {/* Texto central */}
                        <text
                            x={centerX}
                            y={centerY - 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-sm fill-gray-600 font-semibold"
                        >
                            Total
                        </text>
                        <text
                            x={centerX}
                            y={centerY + 8}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-base fill-gray-800 font-bold"
                        >
                            {clientesData.length}
                        </text>
                        <text
                            x={centerX}
                            y={centerY + 22}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs fill-gray-500"
                        >
                            clientes
                        </text>
                    </svg>
                </div>

                {/* Legenda e detalhes */}
                <div className="flex-1 space-y-1">
                    {segments.map((segment) => (
                        <div
                            key={segment.category}
                            onMouseEnter={() => setHoveredSegment(segment.category)}
                            onMouseLeave={() => setHoveredSegment(null)}
                            className={`p-1 rounded-lg border-2 transition-all cursor-pointer ${hoveredSegment === segment.category
                                ? 'border-gray-400 bg-gray-50 shadow-md scale-105'
                                : 'border-gray-200 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-1.5 mb-0">
                                <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: segment.color }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-base font-bold" style={{ color: segment.color }}>
                                            {segment.category}
                                        </span>
                                        <span className="text-xs text-gray-600 font-medium">
                                            {segment.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-4 space-y-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Clientes:</span>
                                    <span className="text-sm font-semibold text-gray-800">
                                        {segment.clientes} ({((segment.clientes / clientesData.length) * 100).toFixed(0)}%)
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Faturação:</span>
                                    <span className="text-sm font-semibold text-gray-800">
                                        €{(segment.valor / 1000).toFixed(1)}k
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">% do Total:</span>
                                    <span className="text-base font-bold" style={{ color: segment.color }}>
                                        {segment.percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VendasABCChart;
