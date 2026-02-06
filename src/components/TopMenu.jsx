import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ABCFilter from './ABCFilter';
import { useABCFilter } from '../context/ABCFilterContext';

function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const { abcFilter, setAbcFilter } = useABCFilter();

    // Páginas que possuem o filtro ABC
    const pagesWithABCFilter = ['/clientes', '/fornecedores', '/artigos'];
    const showABCFilter = pagesWithABCFilter.includes(location.pathname);

    // Reseta o filtro para "Todos" quando muda de página
    useEffect(() => {
        setAbcFilter('Todos');
    }, [location.pathname, setAbcFilter]);

    const isActive = (path) => location.pathname === path;
    const getButtonClass = (path) =>
        isActive(path)
            ? 'shrink-0 rounded-lg bg-slate-600 text-slate-100 px-5 py-2 text-sm shadow-md'
            : 'shrink-0 rounded-lg bg-slate-500 text-slate-100 px-5 py-2 text-sm shadow-md hover:bg-slate-600 transition';

    return (
        <div className="w-full h-[10%] bg-slate-500 px-4 py-3 shadow-md">
            <div className="flex gap-3 overflow-x-auto justify-center items-center h-full">
                <button
                    onClick={() => navigate('/visaogeral')}
                    className={getButtonClass('/visaogeral')}
                >
                    Visao Geral
                </button>
                <button
                    onClick={() => navigate('/vendas')}
                    className={getButtonClass('/vendas')}
                >
                    Vendas
                </button>
                <button
                    onClick={() => navigate('/clientes')}
                    className={getButtonClass('/clientes')}
                >
                    Clientes
                </button>
                <button
                    onClick={() => navigate('/compras')}
                    className={getButtonClass('/compras')}
                >
                    Compras
                </button>
                <button
                    onClick={() => navigate('/fornecedores')}
                    className={getButtonClass('/fornecedores')}
                >
                    Fornecedores
                </button>
                <button
                    onClick={() => navigate('/artigos')}
                    className={getButtonClass('/artigos')}
                >
                    Artigos & Stocks
                </button>
                <button
                    onClick={() => navigate('/rentabilidade')}
                    className={getButtonClass('/rentabilidade')}
                >
                    Rentabilidade & Margens
                </button>

                {/* Divisor */}
                {showABCFilter && <div className="h-6 w-px bg-slate-400"></div>}

                {/* ABCFilter - Apenas nas páginas especificadas */}
                {showABCFilter && (
                    <ABCFilter activeFilter={abcFilter} onFilterChange={setAbcFilter} />
                )}
            </div>
        </div>
    );
}

export default TopMenu;
