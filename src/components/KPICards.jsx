import React from 'react';

function KPICards({ pageTitle }) {
    const pageTitles = {
        'VG': 'Visão Geral',
        'VD': 'Vendas',
        'CP': 'Compras',
        'CL': 'Clientes',
        'FR': 'Fornecedores',
        'AS': 'Artigos & Stocks',
        'RM': 'Rentabilidade'
    };

    const fullTitle = pageTitles[pageTitle] || 'Dashboard';

    return (
        <div className="h-full w-full flex flex-row items-center justify-center gap-4 px-4">
            {/* 6 Cards de KPI */}
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex flex-col h-[90%] w-[15%] bg-white rounded-lg shadow-md">
                    {/* Cabeçalho */}
                    <div className="h-[30%] w-full bg-gradient-to-r from-slate-600 to-slate-500 rounded-t-lg"></div>

                    {/* Corpo */}
                    <div className="flex-1 w-full bg-white"></div>

                    {/* Rodapé */}
                    <div className="h-[30%] w-full bg-slate-50 rounded-b-lg"></div>
                </div>
            ))}

            {/* Card com título da página */}
            <div className="flex items-center flex-col justify-center h-[90%] w-[15%] bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg shadow-lg">
                <span className="text-white text-3xl font-bold">{pageTitle}</span>
                <span className="text-white font-bold">{fullTitle}</span>
            </div>
        </div>
    );
}

export default KPICards;
