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
import useRentabilidadeData from '../../hooks/useRentabilidadeData';

function RentabilidadePage() {
    const navigate = useNavigate();
    const { isLoading } = useRentabilidadeData();
    const loadingText = 'Loading Rentabilidade & Margens';

    // Mock data para tabelas de rentabilidade
    const produtosRentColumns = [
        { key: 'produto', label: 'Produto', width: '30%' },
        { key: 'vendas', label: 'Vendas €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'custo', label: 'Custo €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'margem', label: 'Margem €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'percentagem', label: 'Margem %', width: '12%', format: (val) => val.toFixed(1) + '%' },
        { key: 'roi', label: 'ROI', width: '10%', format: (val) => val.toFixed(1) + '%' }
    ];

    const produtosRentData = [
        { produto: 'Laptop Dell XPS 15', vendas: 152400.00, custo: 109008.00, margem: 43392.00, percentagem: 28.5, roi: 39.8 },
        { produto: 'Monitor LG 27"', vendas: 48562.50, custo: 32973.78, margem: 15588.72, percentagem: 32.1, roi: 47.3 },
        { produto: 'Teclado Mecânico Logitech', vendas: 25920.00, custo: 14178.24, margem: 11741.76, percentagem: 45.3, roi: 82.8 },
        { produto: 'Mouse Wireless HP', vendas: 17010.00, custo: 10426.13, margem: 6583.87, percentagem: 38.7, roi: 63.1 },
        { produto: 'Webcam Full HD', vendas: 11880.00, custo: 6985.44, margem: 4894.56, percentagem: 41.2, roi: 70.1 },
        { produto: 'Headset Profissional', vendas: 28890.00, custo: 18539.28, margem: 10350.72, percentagem: 35.8, roi: 55.8 },
        { produto: 'SSD Samsung 1TB', vendas: 18720.00, custo: 11793.60, margem: 6926.40, percentagem: 37.0, roi: 58.7 }
    ];

    const clientesRentColumns = [
        { key: 'cliente', label: 'Cliente', width: '35%' },
        { key: 'faturacao', label: 'Faturação €', width: '18%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'margem', label: 'Margem €', width: '18%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'percentagem', label: 'Margem %', width: '13%', format: (val) => val.toFixed(1) + '%' },
        { key: 'contribuicao', label: 'Contrib. %', width: '13%', format: (val) => val.toFixed(1) + '%' }
    ];

    const clientesRentData = [
        { cliente: 'Tech Solutions Lda', faturacao: 245000.50, margem: 83300.17, percentagem: 34.0, contribuicao: 18.5 },
        { cliente: 'Mega Store SA', faturacao: 198500.75, margem: 71460.27, percentagem: 36.0, contribuicao: 15.9 },
        { cliente: 'MODELO CONTINENTE HIPERMERCADOS', faturacao: 178320.30, margem: 58248.18, percentagem: 32.7, contribuicao: 12.9 },
        { cliente: 'MAKRO - CASH & CARRY PORTUGAL', faturacao: 156780.90, margem: 50170.69, percentagem: 32.0, contribuicao: 11.1 },
        { cliente: 'LIDL PORTUGAL, SGPS', faturacao: 134210.45, margem: 45911.56, percentagem: 34.2, contribuicao: 10.2 },
        { cliente: 'MERCADONA PORTUGAL', faturacao: 112340.60, margem: 37392.40, percentagem: 33.3, contribuicao: 8.3 }
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
                        <KPICards pageTitle="RM" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards />
                        <SideCards cardCount={4} pageContext="rentabilidade-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="rentabilidade-stats" />
                        <GraphCards />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Rentabilidade por Produto"
                            columns={produtosRentColumns}
                            data={produtosRentData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Rentabilidade por Cliente"
                            columns={clientesRentColumns}
                            data={clientesRentData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}

export default RentabilidadePage;
