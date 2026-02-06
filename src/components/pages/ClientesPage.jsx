import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TopMenu from '../TopMenu';
import SideBarMenu from '../SideBarMenu';
import KPICards from '../KPICards';
import GraphCards from '../GraphCards';
import SideCards from '../SideCards';
import DataTable from '../DataTable';
import LoadingOverlay from '../LoadingOverlay';
import useClientesData from '../../hooks/useClientesData';
import { useABCFilter } from '../../context/ABCFilterContext';
import ClientesChart from '../charts/ClientesChart';

function ClientesPage() {
    const navigate = useNavigate();
    const { isLoading } = useClientesData();
    const loadingText = 'Loading Clientes';
    const { abcFilter } = useABCFilter();

    // Mock data para tabela de clientes
    const clientesColumns = [
        { key: 'cliente', label: 'Cliente', width: '10%' },
        { key: 'designacao', label: 'Designação', width: '40%' },
        { key: 'cc', label: 'C.C.€', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'volVd', label: 'Vol.Vd', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'ultCp', label: 'Ult.Cp', width: '15%' }
    ];

    const clientesDataFull = [
        { cliente: 'A.C.1.0', designacao: 'MODELO CONTINENTE HIPERMERCADOS, S. A.', cc: 177681.22, volVd: 36704.88, ultCp: '16/10/2025', classificacao: 'A' },
        { cliente: 'A.C.3.0', designacao: 'COOPLECNORTE, CRL', cc: 18133.63, volVd: 86859.45, ultCp: '20/10/2025', classificacao: 'A' },
        { cliente: 'A.C.4.0', designacao: 'MAKRO - CASH & CARRY PORTUGAL, S. A.', cc: 22704.55, volVd: 5032.84, ultCp: '31/01/2025', classificacao: 'B' },
        { cliente: 'A.C.4.1', designacao: 'MAKRO - CASH & CARRY PORTUGAL, S. A.', cc: 22704.55, volVd: 150170.11, ultCp: '16/10/2025', classificacao: 'A' },
        { cliente: 'A.C.5.0', designacao: 'AUCHAN PORTUGAL HIPERMERCADOS, S. A.', cc: 1703.45, volVd: 0, ultCp: '01/01/1970', classificacao: 'C' },
        { cliente: 'A.C.7.0', designacao: 'EFEITO SORTIDO, LDA.', cc: 0, volVd: 0, ultCp: '01/01/1970', classificacao: 'C' },
        { cliente: 'A.C.8.0', designacao: 'APOLÓNIA SUPERMERCADOS, S. A.', cc: 1564.46, volVd: 430.7, ultCp: '11/09/2025', classificacao: 'B' },
        { cliente: 'A.C.9.0', designacao: 'ITMP ALIMENTAR, S. A.', cc: 0, volVd: 0, ultCp: '01/01/1970', classificacao: 'C' },
        { cliente: 'A.C.10.0', designacao: 'JERÓNIMO MARTINS RETAIL, SGPS, S.A.', cc: 45892.33, volVd: 125340.67, ultCp: '25/11/2025', classificacao: 'A' },
        { cliente: 'A.C.11.0', designacao: 'LIDL PORTUGAL, SGPS, LDA.', cc: 32156.78, volVd: 98234.12, ultCp: '18/12/2025', classificacao: 'A' },
        { cliente: 'A.C.12.0', designacao: 'MERCADONA PORTUGAL, S.A.', cc: 15678.90, volVd: 54321.45, ultCp: '05/01/2026', classificacao: 'B' },
        { cliente: 'A.C.13.0', designacao: 'DIA PORTUGAL SUPERMERCADOS, S.A.', cc: 8934.56, volVd: 23456.78, ultCp: '12/10/2025', classificacao: 'B' }
    ];

    // Filtrar dados baseado na classificação ABC
    const getFilteredClientes = () => {
        if (abcFilter === 'Todos') return clientesDataFull;
        if (abcFilter === 'Ativos') return clientesDataFull.filter(c => c.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return clientesDataFull.filter(c => c.classificacao === 'B');
        if (abcFilter === 'Inativos') return clientesDataFull.filter(c => c.classificacao === 'C');
        return clientesDataFull.filter(c => c.classificacao === abcFilter);
    };

    const clientesData = getFilteredClientes();

    const fornecedoresColumns = [
        { key: 'fornecedor', label: 'Fornecedor', width: '10%' },
        { key: 'designacao', label: 'Designação', width: '40%' },
        { key: 'cc', label: 'C.C.€', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'volCp', label: 'Vol.Cp', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'ultCp', label: 'Ult.Cp', width: '15%' }
    ];

    const fornecedoresDataFull = [
        { fornecedor: 'F.001', designacao: 'DISTRIBUIDORA ALIMENTAR, LDA', cc: 45320.15, volCp: 234567.89, ultCp: '28/01/2026', classificacao: 'A' },
        { fornecedor: 'F.002', designacao: 'PRODUTOS FRESCOS PORTUGAL, S.A.', cc: 23145.67, volCp: 156789.23, ultCp: '22/01/2026', classificacao: 'A' },
        { fornecedor: 'F.003', designacao: 'BEBIDAS & CIA, LDA', cc: 12456.34, volCp: 89234.56, ultCp: '15/01/2026', classificacao: 'B' },
        { fornecedor: 'F.004', designacao: 'CONGELADOS NACIONAIS, S.A.', cc: 34567.89, volCp: 198765.43, ultCp: '30/01/2026', classificacao: 'A' },
        { fornecedor: 'F.005', designacao: 'LACTICÍNIOS PORTUGUESES, LDA', cc: 18923.45, volCp: 123456.78, ultCp: '25/01/2026', classificacao: 'B' },
        { fornecedor: 'F.006', designacao: 'CARNES PREMIUM, S.A.', cc: 28765.43, volCp: 167890.12, ultCp: '27/01/2026', classificacao: 'A' }
    ];

    const getFilteredFornecedores = () => {
        if (abcFilter === 'Todos') return fornecedoresDataFull;
        if (abcFilter === 'Ativos') return fornecedoresDataFull.filter(f => f.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return fornecedoresDataFull.filter(f => f.classificacao === 'B');
        if (abcFilter === 'Inativos') return fornecedoresDataFull.filter(f => f.classificacao === 'C');
        return fornecedoresDataFull.filter(f => f.classificacao === abcFilter);
    };

    const fornecedoresData = getFilteredFornecedores();

    const handleInfoClick = (row) => {
        console.log('Info clicked for:', row);
    };

    if (isLoading) {
        return <LoadingOverlay isLoading={isLoading} text={loadingText} />;
    }
    return (
        <div className="h-screen w-screen bg-gray-100">
            <TopMenu />
            <div className="bg-white flex flex-row rounded-lg shadow-lg h-[88%] relative">
                <SideBarMenu />
                <div className='h-full w-[95%] flex flex-col gap-4 p-4 overflow-auto hide-scrollbar'>
                    <div className="flex items-center justify-between mb-2 shrink-0 gap-4">
                        {/* ABCFilter será passado do TopMenu */}
                    </div>
                    <div className="h-[15%] shrink-0">
                        <KPICards pageTitle="CL" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards>
                            <ClientesChart title="Gráfico Vendas Anual" />
                        </GraphCards>
                        <SideCards cardCount={4} pageContext="clientes-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="clientes-stats" />
                        <GraphCards />
                    </div>
                    <div className="h-[85%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Tabela de Clientes"
                            columns={clientesColumns}
                            data={clientesData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Principais Fornecedores"
                            columns={fornecedoresColumns}
                            data={fornecedoresData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}

export default ClientesPage;
