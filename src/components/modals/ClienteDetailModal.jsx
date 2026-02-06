import React from 'react';

function ClienteDetailModal({ isOpen, onClose, clienteData }) {
    if (!isOpen || !clienteData) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto hide-scrollbar">
                {/* Header */}
                <div className="bg-linear-to-r from-slate-600 to-slate-500 p-4 rounded-t-xl relative">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-white text-lg font-bold mb-0.5">Visão de Cliente</h2>
                            <p className="text-white/90 text-xs">{clienteData.nome}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500 w-9 h-9 rounded-full flex items-center justify-center">
                                <span className="text-white text-base font-bold">{clienteData.classificacao}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 space-y-2">
                    {/* Primeira linha - 2 colunas */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Dados de Cliente */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Dados de Cliente</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Número:</span>
                                    <span className="text-gray-800">{clienteData.numero}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Nome:</span>
                                    <span className="text-gray-800">{clienteData.nome}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Contacto:</span>
                                    <span className="text-gray-800">{clienteData.contacto}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Email:</span>
                                    <span className="text-gray-800">{clienteData.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Volume de Negócios */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Volume de Negócios</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Volume Vendas:</span>
                                    <span className="text-gray-800">€{clienteData.volumeVendas.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Nº Pedidos:</span>
                                    <span className="text-gray-800">{clienteData.numPedidos}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Ticket Médio:</span>
                                    <span className="text-gray-800">€{clienteData.ticketMedio.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Segunda linha - 2 colunas */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Análise Financeira */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Análise Financeira</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Custo Vendas:</span>
                                    <span className="text-gray-800">€{clienteData.custoVendas.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Lucro Bruto:</span>
                                    <span className="text-gray-800">€{clienteData.lucroBruto.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Margem Bruta:</span>
                                    <span className="text-gray-800">{clienteData.margemBruta}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Métricas por Pedido */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Métricas por Pedido</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Lucro Médio/Pedido:</span>
                                    <span className="text-gray-800">€{clienteData.lucroMedioPedido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Ticket Médio/Pedido:</span>
                                    <span className="text-gray-800">€{clienteData.ticketMedioPedido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terceira linha - 2 colunas */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Tempo e Frequência */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Tempo e Frequência</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Frequência Compra:</span>
                                    <span className="text-gray-800">{clienteData.frequenciaCompra}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Primeira Compra:</span>
                                    <span className="text-gray-800">{clienteData.primeiraCompra}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Última Compra:</span>
                                    <span className="text-gray-800">{clienteData.ultimaCompra}</span>
                                </div>
                            </div>
                        </div>

                        {/* Análise Comparativa */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Análise Comparativa</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Evolução Ticket:</span>
                                    <span className="text-gray-800">{clienteData.evolucaoTicket}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Participação Faturação:</span>
                                    <span className="text-gray-800">{clienteData.participacaoFaturacao}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Eficiência Margem:</span>
                                    <span className="text-gray-800">{clienteData.eficienciaMargem}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Saldo CC:</span>
                                    <span className="text-gray-800">€{clienteData.saldoCC.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Últimas 10 Vendas */}
                    <div className="border border-gray-300 rounded-lg p-2">
                        <h3 className="text-slate-700 font-bold text-sm mb-1">Últimas 10 Vendas</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-500 text-white">
                                    <tr>
                                        <th className="px-2 py-1 text-left text-xs font-semibold">Data</th>
                                        <th className="px-2 py-1 text-left text-xs font-semibold">Documento</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Valor Venda</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Custo</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Lucro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clienteData.ultimasVendas.map((venda, index) => (
                                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                            <td className="px-2 py-1 text-gray-700">{venda.data}</td>
                                            <td className="px-2 py-1 text-gray-700">{venda.documento}</td>
                                            <td className="px-2 py-1 text-gray-700 text-right">€{venda.valorVenda.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-2 py-1 text-gray-700 text-right">€{venda.custo.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-2 py-1 text-gray-700 text-right">€{venda.lucro.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClienteDetailModal;
