import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function ClientesTop10Chart({ title = 'Top 10 Clientes' }) {
    const [sortOrder, setSortOrder] = useState('desc');

    // Mock data dos top 10 clientes
    const clientesTop10 = [
        { rank: 1, cliente: 'MODELO CONTINENTE', valor: 177681.22, percentagem: 18.5 },
        { rank: 2, cliente: 'LIDL PORTUGAL', valor: 156789.34, percentagem: 16.3 },
        { rank: 3, cliente: 'MAKRO - CASH & CARRY', valor: 145670.56, percentagem: 15.1 },
        { rank: 4, cliente: 'JERÓNIMO MARTINS RETAIL', valor: 134562.78, percentagem: 14.0 },
        { rank: 5, cliente: 'AUCHAN PORTUGAL', valor: 98765.43, percentagem: 10.2 },
        { rank: 6, cliente: 'MERCADONA PORTUGAL', valor: 87654.32, percentagem: 9.1 },
        { rank: 7, cliente: 'DIA PORTUGAL SUPERMERCADOS', valor: 56789.12, percentagem: 5.9 },
        { rank: 8, cliente: 'APOLÓNIA SUPERMERCADOS', valor: 34567.89, percentagem: 3.6 },
        { rank: 9, cliente: 'COOPLECNORTE', valor: 23456.78, percentagem: 2.4 },
        { rank: 10, cliente: 'EFEITO SORTIDO', valor: 12345.67, percentagem: 1.3 }
    ];

    const maxValor = Math.max(...clientesTop10.map(c => c.valor));

    const formatValue = (value) => {
        return (value / 1000).toFixed(0) + 'K';
    };

    const toggleSort = () => {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    const sortedData = sortOrder === 'desc'
        ? [...clientesTop10]
        : [...clientesTop10].reverse();

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-12 bg-linear-to-r from-slate-600 to-slate-500 flex items-center justify-between px-4 shrink-0">
                <span className="text-white font-semibold text-base">{title}</span>
                <button
                    onClick={toggleSort}
                    className="text-white hover:opacity-80 transition-opacity"
                    title="Ordenar"
                >
                    {sortOrder === 'desc' ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </button>
            </div>

            {/* Chart */}
            <div className="flex-1 overflow-auto hide-scrollbar p-4">
                <div className="space-y-2">
                    {sortedData.map((cliente, index) => {
                        const barWidth = (cliente.valor / maxValor) * 100;
                        return (
                            <div key={cliente.rank} className="flex items-center gap-2">
                                {/* Rank e Nome */}
                                <div className="w-32 shrink-0">
                                    <div className="text-xs font-semibold text-gray-700">
                                        {cliente.rank}. {cliente.cliente.substring(0, 18)}...
                                    </div>
                                </div>

                                {/* Barra */}
                                <div className="flex-1 h-6 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div
                                        className="h-full bg-cyan-400 rounded-lg flex items-center justify-center transition-all"
                                        style={{ width: `${barWidth}%` }}
                                    >
                                        {barWidth > 15 && (
                                            <span className="text-xs font-semibold text-slate-700">
                                                {cliente.percentagem}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Valor */}
                                <div className="w-16 text-right shrink-0">
                                    <span className="text-xs font-semibold text-gray-700">
                                        € {formatValue(cliente.valor)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ClientesTop10Chart;
