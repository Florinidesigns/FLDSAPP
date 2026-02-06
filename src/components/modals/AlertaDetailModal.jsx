import React from 'react';

function AlertaDetailModal({ isOpen, onClose, alertaData }) {
    if (!isOpen || !alertaData) return null;

    // Determinar cor do header baseado na prioridade
    const getHeaderColor = (prioridade) => {
        switch (prioridade) {
            case 'Alta': return 'from-red-600 to-red-500';
            case 'Média': return 'from-orange-600 to-orange-500';
            case 'Baixa': return 'from-blue-600 to-blue-500';
            default: return 'from-gray-600 to-gray-500';
        }
    };

    const getPrioridadeColor = (prioridade) => {
        switch (prioridade) {
            case 'Alta': return 'bg-red-500';
            case 'Média': return 'bg-orange-500';
            case 'Baixa': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto hide-scrollbar">
                {/* Header */}
                <div className={`bg-linear-to-r ${getHeaderColor(alertaData.prioridade)} p-4 rounded-t-xl relative`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-white text-lg font-bold mb-0.5">Detalhes do Alerta</h2>
                            <p className="text-white/90 text-xs">{alertaData.tipo} - {alertaData.mensagem}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`${getPrioridadeColor(alertaData.prioridade)} px-3 py-1 rounded-full`}>
                                <span className="text-white text-xs font-bold">{alertaData.prioridade}</span>
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

                        {/* Card 1: Informações do Alerta */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Informações do Alerta</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Tipo:</span>
                                    <span className="text-gray-800">{alertaData.tipo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Prioridade:</span>
                                    <span className="text-gray-800">{alertaData.prioridade}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Data Criação:</span>
                                    <span className="text-gray-800">{alertaData.data}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Status:</span>
                                    <span className="text-gray-800">Ativo</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Mensagem Detalhada */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Mensagem Detalhada</h3>
                            <div className="space-y-1 text-xs">
                                <p className="text-gray-700 leading-relaxed">
                                    {alertaData.mensagem}
                                </p>
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-gray-600 italic">
                                        Este alerta requer atenção {alertaData.prioridade.toLowerCase()}.
                                        Ação recomendada: {alertaData.acao}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Ação Recomendada */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Ação Recomendada</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Ação:</span>
                                    <span className="text-gray-800">{alertaData.acao}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Prazo:</span>
                                    <span className="text-gray-800">{alertaData.prioridade === 'Alta' ? '24h' : alertaData.prioridade === 'Média' ? '7 dias' : '30 dias'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Responsável:</span>
                                    <span className="text-gray-800">João Silva</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Departamento:</span>
                                    <span className="text-gray-800">{alertaData.tipo === 'Stock' ? 'Armazém' : alertaData.tipo === 'Pagamento' ? 'Financeiro' : 'Comercial'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Impacto */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Análise de Impacto</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Nível de Impacto:</span>
                                    <span className="text-gray-800">{alertaData.prioridade === 'Alta' ? 'Crítico' : alertaData.prioridade === 'Média' ? 'Moderado' : 'Baixo'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Áreas Afetadas:</span>
                                    <span className="text-gray-800">{alertaData.tipo === 'Stock' ? 'Vendas, Armazém' : alertaData.tipo === 'Pagamento' ? 'Financeiro' : 'Operações'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Custo Potencial:</span>
                                    <span className="text-gray-800">€{(Math.random() * 5000 + 500).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Tempo Resolução:</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 5 + 1)}h</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Histórico */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Histórico</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Ocorrências (30d):</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 10 + 1)}x</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Última Ocorrência:</span>
                                    <span className="text-gray-800">{alertaData.data}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Taxa Resolução:</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 30 + 70)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Tempo Méd. Resolução:</span>
                                    <span className="text-gray-800">{Math.floor(Math.random() * 48 + 2)}h</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 6: Automação */}
                        <div className="border border-gray-300 rounded-lg p-2">
                            <h3 className="text-slate-700 font-bold text-sm mb-1">Configuração</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Notificação Email:</span>
                                    <span className="text-green-600">✓ Ativo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Notificação SMS:</span>
                                    <span className="text-gray-400">✗ Inativo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Alerta Sistema:</span>
                                    <span className="text-green-600">✓ Ativo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-semibold">Auto-Resolução:</span>
                                    <span className="text-gray-400">✗ Desativado</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Tabela de Itens Relacionados ou Ações */}
                    <div className="border border-gray-300 rounded-lg p-2">
                        <h3 className="text-slate-700 font-bold text-sm mb-1">
                            {alertaData.tipo === 'Stock' ? 'Produtos Afetados' : 'Ações Relacionadas'}
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                {alertaData.tipo === 'Stock' ? (
                                    <>
                                        <thead className="bg-slate-500 text-white">
                                            <tr>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Código</th>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Produto</th>
                                                <th className="px-2 py-1 text-right text-xs font-semibold">Stock Atual</th>
                                                <th className="px-2 py-1 text-right text-xs font-semibold">Stock Mín.</th>
                                                <th className="px-2 py-1 text-right text-xs font-semibold">A Encomendar</th>
                                                <th className="px-2 py-1 text-right text-xs font-semibold">Custo Est.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b bg-gray-50">
                                                <td className="px-2 py-1 text-gray-700">P-1005</td>
                                                <td className="px-2 py-1 text-gray-700">Webcam Full HD</td>
                                                <td className="text-right px-2 py-1 text-red-600 font-semibold">18</td>
                                                <td className="text-right px-2 py-1 text-gray-700">30</td>
                                                <td className="text-right px-2 py-1 text-gray-700">50</td>
                                                <td className="text-right px-2 py-1 text-gray-700">€3,000.00</td>
                                            </tr>
                                            <tr className="border-b bg-white">
                                                <td className="px-2 py-1 text-gray-700">P-1008</td>
                                                <td className="px-2 py-1 text-gray-700">Impressora HP LaserJet</td>
                                                <td className="text-right px-2 py-1 text-red-600 font-semibold">12</td>
                                                <td className="text-right px-2 py-1 text-gray-700">15</td>
                                                <td className="text-right px-2 py-1 text-gray-700">25</td>
                                                <td className="text-right px-2 py-1 text-gray-700">€6,250.00</td>
                                            </tr>
                                            <tr className="bg-slate-100 font-semibold">
                                                <td colSpan="5" className="px-2 py-1 text-right text-gray-800">TOTAL ESTIMADO:</td>
                                                <td className="text-right px-2 py-1 text-gray-800">€9,250.00</td>
                                            </tr>
                                        </tbody>
                                    </>
                                ) : (
                                    <>
                                        <thead className="bg-slate-500 text-white">
                                            <tr>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Data</th>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Usuário</th>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Ação</th>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Resultado</th>
                                                <th className="px-2 py-1 text-left text-xs font-semibold">Observações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b bg-gray-50">
                                                <td className="px-2 py-1 text-gray-700">05/02/2026 14:20</td>
                                                <td className="px-2 py-1 text-gray-700">João Silva</td>
                                                <td className="px-2 py-1 text-gray-700">Visualizou alerta</td>
                                                <td className="px-2 py-1 text-blue-600">Pendente</td>
                                                <td className="px-2 py-1 text-gray-700">Aguardando aprovação</td>
                                            </tr>
                                            <tr className="border-b bg-white">
                                                <td className="px-2 py-1 text-gray-700">05/02/2026 10:15</td>
                                                <td className="px-2 py-1 text-gray-700">Sistema</td>
                                                <td className="px-2 py-1 text-gray-700">Email enviado</td>
                                                <td className="px-2 py-1 text-green-600">Sucesso</td>
                                                <td className="px-2 py-1 text-gray-700">Notificação automática</td>
                                            </tr>
                                            <tr className="border-b bg-gray-50">
                                                <td className="px-2 py-1 text-gray-700">05/02/2026 09:00</td>
                                                <td className="px-2 py-1 text-gray-700">Sistema</td>
                                                <td className="px-2 py-1 text-gray-700">Alerta criado</td>
                                                <td className="px-2 py-1 text-green-600">Ativo</td>
                                                <td className="px-2 py-1 text-gray-700">Verificação automática</td>
                                            </tr>
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-2 justify-end">
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg font-semibold transition-colors">
                            Marcar como Resolvido
                        </button>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg font-semibold transition-colors">
                            Atribuir a Usuário
                        </button>
                        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-lg font-semibold transition-colors">
                            Adiar Alerta
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AlertaDetailModal;
