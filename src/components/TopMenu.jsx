import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();

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
            </div>
        </div>
    );
}

export default TopMenu;
