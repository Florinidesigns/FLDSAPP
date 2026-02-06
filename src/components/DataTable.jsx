import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

function DataTable({ title, columns, data, onInfoClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredData = data.filter(row => {
        const searchLower = searchTerm.toLowerCase();
        return Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchLower)
        );
    });

    // Calcular paginação
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Resetar página quando filtro mudar
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="h-full w-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-12 bg-linear-to-r from-slate-600 to-slate-500 flex items-center justify-center px-4 shrink-0">
                <span className="text-white font-semibold text-base">{title}</span>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2 border-b border-gray-200 shrink-0">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto hide-scrollbar">
                <table className="w-full">
                    <thead className="bg-slate-500 text-white sticky top-0">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wide"
                                    style={{ width: column.width || 'auto' }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            {onInfoClick && (
                                <th className="px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide w-24">
                                    Ações
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-2 py-1.5 text-xs text-slate-700"
                                    >
                                        {column.format ? column.format(row[column.key]) : row[column.key]}
                                    </td>
                                ))}
                                {onInfoClick && (
                                    <td className="px-2 py-1.5 text-center">
                                        <button
                                            onClick={() => onInfoClick(row)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                                        >
                                            Info
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + (onInfoClick ? 1 : 0)}
                                    className="px-2 py-4 text-center text-xs text-gray-400"
                                >
                                    Nenhum resultado encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer com Paginação */}
            {totalPages > 1 && (
                <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between shrink-0 bg-gray-50">
                    <div className="text-xs text-gray-600">
                        Mostrando {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} className="text-gray-700" />
                        </button>
                        <span className="text-xs text-gray-700 font-medium">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} className="text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataTable;
