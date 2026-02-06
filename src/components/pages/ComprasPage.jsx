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
import useComprasData from '../../hooks/useComprasData';
import ComprasChart from '../charts/ComprasChart';

function ComprasPage() {
    const navigate = useNavigate();
    const { isLoading } = useComprasData();
    const loadingText = 'Loading Compras';

    // Mock data para tabelas de compras
    const comprasColumns = [
        { key: 'documento', label: 'Documento', width: '15%' },
        { key: 'fornecedor', label: 'Fornecedor', width: '35%' },
        { key: 'data', label: 'Data', width: '12%' },
        { key: 'valor', label: 'Valor €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'estado', label: 'Estado', width: '18%' }
    ];

    const comprasData = [
        { documento: 'FC 2026/234', fornecedor: 'DISTRIBUIDORA ALIMENTAR', data: '05/02/2026', valor: 45320.75, estado: 'Recebido' },
        { documento: 'FC 2026/233', fornecedor: 'PRODUTOS FRESCOS PORTUGAL', data: '04/02/2026', valor: 28450.30, estado: 'Em Trânsito' },
        { documento: 'FC 2026/232', fornecedor: 'BEBIDAS & CIA', data: '03/02/2026', valor: 15890.50, estado: 'Recebido' },
        { documento: 'FC 2026/231', fornecedor: 'CONGELADOS NACIONAIS', data: '02/02/2026', valor: 52340.80, estado: 'Pendente' },
        { documento: 'FC 2026/230', fornecedor: 'LATICÍNIOS PORTUGUESES', data: '01/02/2026', valor: 19876.45, estado: 'Recebido' },
        { documento: 'FC 2026/229', fornecedor: 'CARNES PREMIUM', data: '31/01/2026', valor: 38765.90, estado: 'Recebido' }
    ];

    const encomendasColumns = [
        { key: 'encomenda', label: 'Encomenda', width: '15%' },
        { key: 'fornecedor', label: 'Fornecedor', width: '35%' },
        { key: 'previsao', label: 'Previsão', width: '12%' },
        { key: 'valor', label: 'Valor €', width: '18%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'status', label: 'Status', width: '15%' }
    ];

    const encomendasData = [
        { encomenda: 'ENC-2026-045', fornecedor: 'Global Tech Supply', previsao: '10/02/2026', valor: 67890.50, status: 'Confirmada' },
        { encomenda: 'ENC-2026-044', fornecedor: 'DISTRIBUIDORA ALIMENTAR', previsao: '08/02/2026', valor: 34567.25, status: 'Aguardando' },
        { encomenda: 'ENC-2026-043', fornecedor: 'PRODUTOS FRESCOS', previsao: '07/02/2026', valor: 23456.80, status: 'Confirmada' },
        { encomenda: 'ENC-2026-042', fornecedor: 'BEBIDAS & CIA', previsao: '09/02/2026', valor: 18765.40, status: 'Processando' }
    ];

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
                    <div className="h-[15%] flex-shrink-0">
                        <KPICards pageTitle="CP" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 flex-shrink-0">
                        <GraphCards>
                            <ComprasChart title="Análise de Compras" />
                        </GraphCards>
                        <SideCards cardCount={4} pageContext="compras-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 flex-shrink-0">
                        <SideCards cardCount={4} pageContext="compras-stats" />
                        <GraphCards />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <DataTable
                            title="Últimas Compras"
                            columns={comprasColumns}
                            data={comprasData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Encomendas Pendentes"
                            columns={encomendasColumns}
                            data={encomendasData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}
export default ComprasPage;
