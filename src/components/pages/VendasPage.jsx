import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TopMenu from '../TopMenu';
import SideBarMenu from '../SideBarMenu';
import KPICards from '../KPICards';
import GraphCards from '../GraphCards';
import GraphCardsHalf from '../GraphCardsHalf';
import SideCards from '../SideCards';
import DataTable from '../DataTable';
import LoadingOverlay from '../LoadingOverlay';
import useVendasData from '../../hooks/useVendasData';
import VendasChart from '../charts/VendasChart';
import VendasParetoChart from '../charts/VendasParetoChart';
import VendasABCChart from '../charts/VendasABCChart';

function VendasPage() {
    const navigate = useNavigate();
    const { isLoading } = useVendasData();
    const loadingText = 'Loading Vendas';

    // Mock data para tabelas de vendas
    const vendasColumns = [
        { key: 'documento', label: 'Documento', width: '15%' },
        { key: 'cliente', label: 'Cliente', width: '35%' },
        { key: 'data', label: 'Data', width: '12%' },
        { key: 'valor', label: 'Valor €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'estado', label: 'Estado', width: '18%' }
    ];

    const vendasData = [
        { documento: 'FT 2026/125', cliente: 'Tech Solutions Lda', data: '02/02/2026', valor: 15420.50, estado: 'Pago' },
        { documento: 'FT 2026/124', cliente: 'Mega Store SA', data: '01/02/2026', valor: 8750.25, estado: 'Pago' },
        { documento: 'FT 2026/123', cliente: 'MAKRO - CASH & CARRY', data: '31/01/2026', valor: 23456.78, estado: 'Pendente' },
        { documento: 'FT 2026/122', cliente: 'MODELO CONTINENTE', data: '30/01/2026', valor: 45321.90, estado: 'Pago' },
        { documento: 'FT 2026/121', cliente: 'AUCHAN PORTUGAL', data: '29/01/2026', valor: 12890.45, estado: 'Pago' },
        { documento: 'FT 2026/120', cliente: 'LIDL PORTUGAL', data: '28/01/2026', valor: 34567.12, estado: 'Em Processamento' },
        { documento: 'FT 2026/119', cliente: 'MERCADONA PORTUGAL', data: '27/01/2026', valor: 18934.56, estado: 'Pago' }
    ];

    const produtosColumns = [
        { key: 'codigo', label: 'Código', width: '15%' },
        { key: 'produto', label: 'Produto', width: '40%' },
        { key: 'qtd', label: 'Qtd', width: '12%' },
        { key: 'valor', label: 'Valor €', width: '18%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'margem', label: 'Margem %', width: '10%', format: (val) => val.toFixed(1) + '%' }
    ];

    const produtosData = [
        { codigo: 'P-1001', produto: 'Laptop Dell XPS 15', qtd: 127, valor: 152400.00, margem: 28.5 },
        { codigo: 'P-1002', produto: 'Monitor LG 27\"', qtd: 245, valor: 48562.50, margem: 32.1 },
        { codigo: 'P-1003', produto: 'Teclado Mecânico Logitech', qtd: 432, valor: 25920.00, margem: 45.3 },
        { codigo: 'P-1004', produto: 'Mouse Wireless HP', qtd: 567, valor: 17010.00, margem: 38.7 },
        { codigo: 'P-1005', produto: 'Webcam Full HD', qtd: 198, valor: 11880.00, margem: 41.2 },
        { codigo: 'P-1006', produto: 'Headset Profissional', qtd: 321, valor: 28890.00, margem: 35.8 }
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
                    <div className="h-[15%] shrink-0">
                        <KPICards pageTitle="VD" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards>
                            <VendasChart title="Gráfico de Vendas" />
                        </GraphCards>
                        <SideCards cardCount={4} pageContext="vendas-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="vendas-stats" />
                        <div className="flex-1 flex flex-row gap-4">
                            <GraphCardsHalf>
                                <VendasParetoChart title="Vendas por Cliente (Pareto)" />
                            </GraphCardsHalf>
                            <GraphCardsHalf>
                                <VendasABCChart title="Análise ABC - Clientes" />
                            </GraphCardsHalf>
                        </div>
                    </div>
                    <div className="h-[40%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Últimas Vendas"
                            columns={vendasColumns}
                            data={vendasData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Produtos Mais Vendidos"
                            columns={produtosColumns}
                            data={produtosData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}


export default VendasPage;
