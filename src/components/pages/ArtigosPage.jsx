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
import useArtigosData from '../../hooks/useArtigosData';

function ArtigosPage() {
    const navigate = useNavigate();
    const { isLoading } = useArtigosData();
    const loadingText = 'Loading Artigos & Stocks';

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
                        <KPICards pageTitle="AS" />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <GraphCards />
                        <SideCards cardCount={4} />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 flex-shrink-0">
                        <SideCards cardCount={4} />
                        <GraphCards />
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

export default ArtigosPage;
