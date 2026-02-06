import React from 'react';

function AtividadeDetailModal({ isOpen, onClose, atividadeData }) {
    if (!isOpen || !atividadeData) return null;

    // Determinar cor do header baseado no tipo
    const getHeaderColor = (tipo) => {
        switch (tipo) {
            case 'Venda': return 'from-green-600 to-green-500';
            case 'Compra': return 'from-orange-600 to-orange-500';
            case 'Pagamento': return 'from-red-600 to-red-500';
            case 'Recebimento': return 'from-blue-600 to-blue-500';
            default: return 'from-gray-600 to-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto hide-scrollbar">
                {/* Header */}
                <div className={`bg-linear-to-r ${getHeaderColor(atividadeData.tipo)} p-4 rounded-t-xl relative`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-white text-lg font-bold mb-0.5">Detalhes da Atividade</h2>
                            <p className="text-white/90 text-xs">{atividadeData.tipo} - {atividadeData.descricao}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`${atividadeData.status === 'Concluído' || atividadeData.status === 'Confirmado' ? 'bg-green-500' : atividadeData.status === 'Pendente' || atividadeData.status === 'Trânsito' ? 'bg-yellow-500' : 'bg-blue-500'} px-3 py-1 rounded-full`}>
                                <span className="text-white text-xs font-bold">{atividadeData.status}</span>
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
                    {/* Grid com 3 linhas x 2 colunas */}
                    <div className="grid grid-cols-2 gap-2">

                        {/* Card 1: Informações Gerais */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Informações Gerais</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Tipo:</span>
                                    <span className="text-gray-800">{atividadeData.tipo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Documento:</span>
                                    <span className="text-gray-800">{atividadeData.documento || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Data/Hora:</span>
                                    <span className="text-gray-800">{atividadeData.dataCompleta || atividadeData.data}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Status:</span>
                                    <span className="text-gray-800">{atividadeData.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Valores Financeiros */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Valores Financeiros</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Valor Total:</span>
                                    <span className="text-gray-800">€{atividadeData.valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Valor Líquido:</span>
                                    <span className="text-gray-800">€{(atividadeData.valor * 0.81).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">IVA (23%):</span>
                                    <span className="text-gray-800">€{(atividadeData.valor * 0.19).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Forma Pagamento:</span>
                                    <span className="text-gray-800">Transferência</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Entidade */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Entidade</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Nome:</span>
                                    <span className="text-gray-800 text-right">{atividadeData.entidade || 'Tech Solutions Lda'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">NIF:</span>
                                    <span className="text-gray-800">PT 501234567</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Contacto:</span>
                                    <span className="text-gray-800">+351 21 123 4567</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Email:</span>
                                    <span className="text-gray-800">geral@empresa.pt</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Detalhes da Operação */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Detalhes da Operação</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Utilizador:</span>
                                    <span className="text-gray-800">João Silva</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Departamento:</span>
                                    <span className="text-gray-800">{atividadeData.tipo === 'Venda' ? 'Comercial' : 'Compras'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Aprovado Por:</span>
                                    <span className="text-gray-800">Maria Santos</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Referência:</span>
                                    <span className="text-gray-800">REF-{Math.floor(Math.random() * 10000)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Prazos e Condições */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Prazos e Condições</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Prazo Pagamento:</span>
                                    <span className="text-gray-800">30 dias</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Data Vencimento:</span>
                                    <span className="text-gray-800">07/03/2026</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Desconto:</span>
                                    <span className="text-gray-800">0%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Observações:</span>
                                    <span className="text-gray-800">-</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 6: Estatísticas */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Estatísticas</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Nº Itens:</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 20) + 1}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Quantidade Total:</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 500) + 50} un</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Ticket Médio:</span>
                                    <span className="text-gray-800">€{(atividadeData.valor / (Math.floor(Math.random() * 20) + 1)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Peso Total:</span>
                                    <span className="text-gray-800">{(Math.random() * 100 + 10).toFixed(1)} kg</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Tabela de Itens */}
                    <div className="border border-gray-300 rounded-lg p-2">
                        <h3 className="text-slate-700 font-bold text-sm mb-1">Itens do Documento</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-500 text-white">
                                    <tr>
                                        <th className="px-2 py-1 text-left text-xs font-semibold">Código</th>
                                        <th className="px-2 py-1 text-left text-xs font-semibold">Descrição</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Qtd</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Preço Unit.</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Desc. %</th>
                                        <th className="px-2 py-1 text-right text-xs font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bg-gray-50">
                                        <td className="px-2 py-1 text-gray-700">P-1001</td>
                                        <td className="px-2 py-1 text-gray-700">Laptop Dell XPS 15</td>
                                        <td className="text-right px-2 py-1 text-gray-700">12</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€1,200.00</td>
                                        <td className="text-right px-2 py-1 text-gray-700">5%</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€13,680.00</td>
                                    </tr>
                                    <tr className="border-b bg-white">
                                        <td className="px-2 py-1 text-gray-700">P-1002</td>
                                        <td className="px-2 py-1 text-gray-700">Monitor LG 27"</td>
                                        <td className="text-right px-2 py-1 text-gray-700">8</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€198.50</td>
                                        <td className="text-right px-2 py-1 text-gray-700">0%</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€1,588.00</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="px-2 py-1 text-gray-700">P-1003</td>
                                        <td className="px-2 py-1 text-gray-700">Mouse Wireless HP</td>
                                        <td className="text-right px-2 py-1 text-gray-700">15</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€30.00</td>
                                        <td className="text-right px-2 py-1 text-gray-700">0%</td>
                                        <td className="text-right px-2 py-1 text-gray-700">€450.00</td>
                                    </tr>
                                    <tr className="bg-slate-100 font-semibold">
                                        <td colSpan="5" className="px-2 py-1 text-right text-gray-800">TOTAL:</td>
                                        <td className="text-right px-2 py-1 text-gray-800">€{atividadeData.valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AtividadeDetailModal;
