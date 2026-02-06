import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TopMenu from '../TopMenu';
import SideBarMenu from '../SideBarMenu';
import KPICards from '../KPICards';
import GraphCards from '../GraphCards';
import SideCards from '../SideCards';
import GridCard from '../GridCard';
import LoadingOverlay from '../LoadingOverlay';
import useVisaoGeralData from '../../hooks/useVisaoGeralData';
import VendasChart from '../charts/VendasChart';
import ComprasChart from '../charts/ComprasChart';

function VisaoGeralPage() {
    const navigate = useNavigate();
    const { isLoading } = useVisaoGeralData();
    const loadingText = 'Loading Visao Geral';

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
                        <KPICards pageTitle="VG" />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <GraphCards>
                            <VendasChart title="Gráfico de Vendas" />
                        </GraphCards>
                        <SideCards cardCount={4} />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <SideCards cardCount={4} />
                        <GraphCards>
                            <ComprasChart title="Gráfico de Compras" />
                        </GraphCards>
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <GridCard />
                        <GridCard />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}

export default VisaoGeralPage;
