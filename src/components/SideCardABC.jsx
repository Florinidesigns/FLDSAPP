import React from 'react';

function SideCardABC() {
    // Mock data para ABC e Status
    const data = {
        abc: {
            total: 3876037.66,
            a: 3045745.24,
            b: 628573.51,
            c: 201718.91
        },
        status: {
            todos: 3876037.66,
            ativos: 0.00,
            semiAtivos: 3798891.67,
            inativos: 77145.99
        }
    };

    const formatValue = (value) => {
        return value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="w-[40%] h-full flex flex-row gap-3 overflow-hidden">
            {/* Receita P/Pareto (ABC) */}
            <div className="flex-1 h-full flex flex-col gap-0 rounded-lg shadow-md overflow-hidden ">
                <div className="bg-slate-500 text-white px-2 py-1 text-xs font-semibold text-center">
                    Receita P/Pareto (ABC)
                </div>
                <div className="flex-1 bg-gray-100 px-2 py-1 text-xs text-gray-700 flex items-center">
                    ABC : EUR {formatValue(data.abc.total)}
                </div>
                <div className="flex-1 bg-green-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    A : EUR {formatValue(data.abc.a)}
                </div>
                <div className="flex-1 bg-yellow-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    B : EUR {formatValue(data.abc.b)}
                </div>
                <div className="flex-1 bg-red-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    C : EUR {formatValue(data.abc.c)}
                </div>
            </div>

            {/* Receita P/Status */}
            <div className="flex-1 h-full flex flex-col gap-0 rounded-lg shadow-md overflow-hidden">
                <div className="bg-slate-500 text-white px-2 py-1 text-xs font-semibold text-center">
                    Receita P/Status
                </div>
                <div className="flex-1 bg-gray-100 px-2 py-1 text-xs text-gray-700 flex items-center">
                    Todos : EUR {formatValue(data.status.todos)}
                </div>
                <div className="flex-1 bg-green-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    Ativos : EUR {formatValue(data.status.ativos)}
                </div>
                <div className="flex-1 bg-yellow-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    Semi-Ativos : EUR {formatValue(data.status.semiAtivos)}
                </div>
                <div className="flex-1 bg-red-300 px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    Inativos : EUR {formatValue(data.status.inativos)}
                </div>
            </div>
        </div>
    );
}

export default SideCardABC;
