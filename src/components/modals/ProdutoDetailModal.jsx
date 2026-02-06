import React from 'react';

function ProdutoDetailModal({ isOpen, onClose, produtoData }) {
    if (!isOpen || !produtoData) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto hide-scrollbar">
                {/* Header */}
                <div className="bg-linear-to-r from-blue-600 to-blue-500 p-4 rounded-t-xl relative">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-white text-lg font-bold mb-0.5">Visão de Produto</h2>
                            <p className="text-white/90 text-xs">{produtoData.produto}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500 w-9 h-9 rounded-full flex items-center justify-center">
                                <span className="text-white text-base font-bold">{produtoData.classificacao}</span>
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

                        {/* Card 1: Dados do Produto */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Dados do Produto
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Código:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.codigo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Produto:</span>
                                    <span className="text-gray-900 font-medium text-xs text-right">{produtoData.produto}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Categoria:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.categoria}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Fornecedor:</span>
                                    <span className="text-gray-900 font-medium text-xs text-right">{produtoData.fornecedor}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Stock */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Gestão de Stock
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Stock Atual:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.stock} un</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Stock Mínimo:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.stockMinimo} un</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Rotação:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.rotacao}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Última Compra:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.ultimaCompra}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Preços e Margem */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Preços e Margem
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Preço de Compra:</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {produtoData.precoCompra.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Preço de Venda:</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {produtoData.precoVenda.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Margem Atual:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.margemAtual.toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Lucro Unitário:</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {(produtoData.precoVenda - produtoData.precoCompra).toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Performance de Vendas */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Performance de Vendas
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Qtd Vendida (período):</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.qtdVendida} un</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Valor Total (período):</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {produtoData.valorTotal.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Última Venda:</span>
                                    <span className="text-gray-900 font-medium text-xs">{produtoData.ultimaVenda}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Ticket Médio:</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {(produtoData.valorTotal / produtoData.qtdVendida).toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Análise ABC */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Análise ABC
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Classificação:</span>
                                    <span className="text-gray-900 font-bold text-xs">{produtoData.classificacao}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">% Faturação Total:</span>
                                    <span className="text-gray-900 font-medium text-xs">8.5%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Ranking Vendas:</span>
                                    <span className="text-gray-900 font-medium text-xs">1º de 127</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Tendência:</span>
                                    <span className="text-green-600 font-medium text-xs">↑ Crescente</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 6: Indicadores Adicionais */}
                        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                                Indicadores Adicionais
                            </h3>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Lucro Total (período):</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {((produtoData.precoVenda - produtoData.precoCompra) * produtoData.qtdVendida).toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Dias até Ruptura:</span>
                                    <span className="text-gray-900 font-medium text-xs">45 dias</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Valor em Stock:</span>
                                    <span className="text-gray-900 font-medium text-xs">
                                        {(produtoData.precoCompra * produtoData.stock).toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-xs">Sazonalidade:</span>
                                    <span className="text-gray-900 font-medium text-xs">Neutro</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Tabela de Últimas 10 Vendas do Produto */}
                    <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                            Últimas 10 Vendas do Produto
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="text-left px-1.5 py-1 text-gray-700 text-xs">Data</th>
                                        <th className="text-left px-1.5 py-1 text-gray-700 text-xs">Documento</th>
                                        <th className="text-left px-1.5 py-1 text-gray-700 text-xs">Cliente</th>
                                        <th className="text-right px-1.5 py-1 text-gray-700 text-xs">Qtd</th>
                                        <th className="text-right px-1.5 py-1 text-gray-700 text-xs">Valor Venda €</th>
                                        <th className="text-right px-1.5 py-1 text-gray-700 text-xs">Lucro €</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-1.5 py-1">05/02/2026</td>
                                        <td className="px-1.5 py-1">FT 2026/125</td>
                                        <td className="px-1.5 py-1">Tech Solutions Lda</td>
                                        <td className="text-right px-1.5 py-1">15</td>
                                        <td className="text-right px-1.5 py-1">{(15 * produtoData.precoVenda).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        <td className="text-right px-1.5 py-1">{(15 * (produtoData.precoVenda - produtoData.precoCompra)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-1.5 py-1">03/02/2026</td>
                                        <td className="px-1.5 py-1">FT 2026/120</td>
                                        <td className="px-1.5 py-1">LIDL PORTUGAL</td>
                                        <td className="text-right px-1.5 py-1">32</td>
                                        <td className="text-right px-1.5 py-1">{(32 * produtoData.precoVenda).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        <td className="text-right px-1.5 py-1">{(32 * (produtoData.precoVenda - produtoData.precoCompra)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-1.5 py-1">01/02/2026</td>
                                        <td className="px-1.5 py-1">FT 2026/117</td>
                                        <td className="px-1.5 py-1">MODELO CONTINENTE</td>
                                        <td className="text-right px-1.5 py-1">25</td>
                                        <td className="text-right px-1.5 py-1">{(25 * produtoData.precoVenda).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        <td className="text-right px-1.5 py-1">{(25 * (produtoData.precoVenda - produtoData.precoCompra)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-1.5 py-1">30/01/2026</td>
                                        <td className="px-1.5 py-1">FT 2026/115</td>
                                        <td className="px-1.5 py-1">AUCHAN PORTUGAL</td>
                                        <td className="text-right px-1.5 py-1">18</td>
                                        <td className="text-right px-1.5 py-1">{(18 * produtoData.precoVenda).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        <td className="text-right px-1.5 py-1">{(18 * (produtoData.precoVenda - produtoData.precoCompra)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-1.5 py-1">28/01/2026</td>
                                        <td className="px-1.5 py-1">FT 2026/112</td>
                                        <td className="px-1.5 py-1">Mega Store SA</td>
                                        <td className="text-right px-1.5 py-1">12</td>
                                        <td className="text-right px-1.5 py-1">{(12 * produtoData.precoVenda).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                                        <td className="text-right px-1.5 py-1">{(12 * (produtoData.precoVenda - produtoData.precoCompra)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
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

export default ProdutoDetailModal;
