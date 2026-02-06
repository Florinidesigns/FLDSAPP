import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

    // Mock data para KPIs por página
    const kpiData = {
        'VG': [
            { titulo: 'Vendas Totais', valor: '8.805.536', unidade: '€', variacao: 43.98, tipo: 'positivo' },
            { titulo: 'Compras Totais', valor: '11.090.000', unidade: '€', variacao: 37.17, tipo: 'positivo' },
            { titulo: 'Clientes', valor: '1.247', unidade: '', variacao: 12.5, tipo: 'positivo' },
            { titulo: 'Fornecedores', valor: '342', unidade: '', variacao: -3.8, tipo: 'negativo' },
            { titulo: 'Margem Bruta', valor: '34.2', unidade: '%', variacao: 5.1, tipo: 'positivo' },
            { titulo: 'Stock', valor: '2.450.000', unidade: '€', variacao: 8.3, tipo: 'positivo' }
        ],
        'VD': [
            { titulo: 'Total Vendas', valor: '8.805.536', unidade: '€', variacao: 43.98, tipo: 'positivo' },
            { titulo: 'Ticket Médio', valor: '7.062', unidade: '€', variacao: 18.5, tipo: 'positivo' },
            { titulo: 'Nº Vendas', valor: '1.247', unidade: '', variacao: 21.3, tipo: 'positivo' },
            { titulo: 'Novos Clientes', valor: '89', unidade: '', variacao: 15.2, tipo: 'positivo' },
            { titulo: 'Taxa Conversão', valor: '68.5', unidade: '%', variacao: 3.2, tipo: 'positivo' },
            { titulo: 'Devoluções', valor: '2.1', unidade: '%', variacao: -12.5, tipo: 'positivo' }
        ],
        'CP': [
            { titulo: 'Total Compras', valor: '11.090.000', unidade: '€', variacao: 37.17, tipo: 'positivo' },
            { titulo: 'Nº Encomendas', valor: '342', unidade: '', variacao: 28.4, tipo: 'positivo' },
            { titulo: 'Prazo Médio', valor: '32', unidade: 'dias', variacao: -8.5, tipo: 'positivo' },
            { titulo: 'Fornecedores', valor: '87', unidade: '', variacao: 5.7, tipo: 'positivo' },
            { titulo: 'Ticket Médio', valor: '32.426', unidade: '€', variacao: 6.8, tipo: 'positivo' },
            { titulo: 'A Pagar', valor: '1.245.000', unidade: '€', variacao: 12.3, tipo: 'neutro' }
        ],
        'CL': [
            { titulo: 'Total Clientes', valor: '1.247', unidade: '', variacao: 12.5, tipo: 'positivo' },
            { titulo: 'Ativos', valor: '892', unidade: '', variacao: 18.7, tipo: 'positivo' },
            { titulo: 'Novos (Mês)', valor: '89', unidade: '', variacao: 25.3, tipo: 'positivo' },
            { titulo: 'Taxa Retenção', valor: '87.5', unidade: '%', variacao: 4.2, tipo: 'positivo' },
            { titulo: 'LTV Médio', valor: '24.500', unidade: '€', variacao: 15.8, tipo: 'positivo' },
            { titulo: 'Churn Rate', valor: '3.2', unidade: '%', variacao: -18.5, tipo: 'positivo' }
        ],
        'FR': [
            { titulo: 'Fornecedores', valor: '342', unidade: '', variacao: -3.8, tipo: 'negativo' },
            { titulo: 'Ativos', valor: '287', unidade: '', variacao: 2.1, tipo: 'positivo' },
            { titulo: 'Novos (Ano)', valor: '45', unidade: '', variacao: 32.4, tipo: 'positivo' },
            { titulo: 'Prazo Pagamento', valor: '38', unidade: 'dias', variacao: 5.5, tipo: 'negativo' },
            { titulo: 'Score Médio', valor: '8.3', unidade: '/10', variacao: 12.2, tipo: 'positivo' },
            { titulo: 'Compras/Fornec', valor: '32.426', unidade: '€', variacao: 8.7, tipo: 'positivo' }
        ],
        'AS': [
            { titulo: 'Total Artigos', valor: '2.847', unidade: '', variacao: 8.4, tipo: 'positivo' },
            { titulo: 'Em Stock', valor: '2.245', unidade: '', variacao: 5.2, tipo: 'positivo' },
            { titulo: 'Ruptura', valor: '127', unidade: '', variacao: -24.5, tipo: 'positivo' },
            { titulo: 'Valor Stock', valor: '2.450.000', unidade: '€', variacao: 12.8, tipo: 'positivo' },
            { titulo: 'Rotação', valor: '4.2', unidade: 'x/ano', variacao: 18.5, tipo: 'positivo' },
            { titulo: 'Obsoletos', valor: '3.8', unidade: '%', variacao: -35.2, tipo: 'positivo' }
        ],
        'RM': [
            { titulo: 'Margem Bruta', valor: '34.2', unidade: '%', variacao: 5.1, tipo: 'positivo' },
            { titulo: 'Margem Líquida', valor: '18.7', unidade: '%', variacao: 8.3, tipo: 'positivo' },
            { titulo: 'EBITDA', valor: '1.645.000', unidade: '€', variacao: 22.5, tipo: 'positivo' },
            { titulo: 'ROI', valor: '28.4', unidade: '%', variacao: 12.8, tipo: 'positivo' },
            { titulo: 'Custos Fixos', valor: '425.000', unidade: '€', variacao: 3.2, tipo: 'neutro' },
            { titulo: 'Break Even', valor: '742.000', unidade: '€', variacao: -8.5, tipo: 'positivo' }
        ]
    };

    const kpis = kpiData[pageTitle] || kpiData['VG'];

    const formatValue = (value) => {
        // Formatar números grandes com separador de milhares
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="h-full w-full flex flex-row items-center justify-center gap-4 px-4">
            {/* 6 Cards de KPI */}
            {kpis.map((kpi, index) => (
                <div key={index} className="flex flex-col h-[90%] w-[15%] bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Cabeçalho */}
                    <div className="h-[30%] w-full bg-linear-to-r from-slate-600 to-slate-500 flex items-center justify-center px-2">
                        <span className="text-white text-xs font-semibold text-center leading-tight">{kpi.titulo}</span>
                    </div>

                    {/* Corpo */}
                    <div className="flex-1 w-full bg-white flex flex-col items-center justify-center px-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-700">{formatValue(kpi.valor)}</span>
                            {kpi.unidade && <span className="text-sm font-medium text-slate-500">{kpi.unidade}</span>}
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className={`h-[30%] w-full flex items-center justify-center gap-1 ${kpi.tipo === 'positivo' ? 'bg-green-50' :
                            kpi.tipo === 'negativo' ? 'bg-red-50' : 'bg-slate-50'
                        }`}>
                        {kpi.tipo === 'positivo' ? (
                            <TrendingUp size={16} className="text-green-600" />
                        ) : kpi.tipo === 'negativo' ? (
                            <TrendingDown size={16} className="text-red-600" />
                        ) : null}
                        <span className={`text-sm font-semibold ${kpi.tipo === 'positivo' ? 'text-green-600' :
                                kpi.tipo === 'negativo' ? 'text-red-600' : 'text-slate-600'
                            }`}>
                            {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}%
                        </span>
                    </div>
                </div>
            ))}

            {/* Card com título da página */}
            <div className="flex items-center flex-col justify-center h-[90%] w-[15%] bg-linear-to-br from-slate-700 to-slate-600 rounded-lg shadow-lg">
                <span className="text-white text-3xl font-bold">{pageTitle}</span>
                <span className="text-white font-bold">{fullTitle}</span>
            </div>
        </div>
    );
}

export default KPICards;
