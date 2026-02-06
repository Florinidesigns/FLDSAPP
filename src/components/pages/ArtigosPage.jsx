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
import useArtigosData from '../../hooks/useArtigosData';
import { useABCFilter } from '../../context/ABCFilterContext';

function ArtigosPage() {
    const navigate = useNavigate();
    const { isLoading } = useArtigosData();
    const loadingText = 'Loading Artigos & Stocks';
    const { abcFilter } = useABCFilter();

    // Mock data para tabelas de artigos
    const artigosColumns = [
        { key: 'codigo', label: 'Código', width: '12%' },
        { key: 'descricao', label: 'Descrição', width: '35%' },
        { key: 'stock', label: 'Stock', width: '10%' },
        { key: 'stockMin', label: 'Mínimo', width: '10%' },
        { key: 'pvp', label: 'PVP €', width: '13%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'categoria', label: 'Categoria', width: '15%' }
    ];

    const artigosDataFull = [
        { codigo: 'P-1001', descricao: 'Laptop Dell XPS 15', stock: 45, stockMin: 20, pvp: 1200.00, categoria: 'Informática', classificacao: 'A' },
        { codigo: 'P-1002', descricao: 'Monitor LG 27"', stock: 127, stockMin: 50, pvp: 198.50, categoria: 'Periféricos', classificacao: 'A' },
        { codigo: 'P-1003', descricao: 'Teclado Mecânico Logitech', stock: 234, stockMin: 100, pvp: 60.00, categoria: 'Periféricos', classificacao: 'A' },
        { codigo: 'P-1004', descricao: 'Mouse Wireless HP', stock: 321, stockMin: 150, pvp: 30.00, categoria: 'Periféricos', classificacao: 'B' },
        { codigo: 'P-1005', descricao: 'Webcam Full HD', stock: 18, stockMin: 30, pvp: 60.00, categoria: 'Periféricos', classificacao: 'B' },
        { codigo: 'P-1006', descricao: 'Headset Profissional', stock: 89, stockMin: 40, pvp: 90.00, categoria: 'Áudio', classificacao: 'A' },
        { codigo: 'P-1007', descricao: 'SSD Samsung 1TB', stock: 156, stockMin: 75, pvp: 120.00, categoria: 'Armazenamento', classificacao: 'A' },
        { codigo: 'P-1008', descricao: 'Impressora HP LaserJet', stock: 12, stockMin: 15, pvp: 450.00, categoria: 'Impressão', classificacao: 'B' },
        { codigo: 'P-1009', descricao: 'Produto Descontinuado 1', stock: 3, stockMin: 5, pvp: 25.00, categoria: 'Diversos', classificacao: 'C' },
        { codigo: 'P-1010', descricao: 'Produto Descontinuado 2', stock: 1, stockMin: 5, pvp: 15.00, categoria: 'Diversos', classificacao: 'C' }
    ];

    const getFilteredArtigos = () => {
        if (abcFilter === 'Todos') return artigosDataFull;
        if (abcFilter === 'Ativos') return artigosDataFull.filter(a => a.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return artigosDataFull.filter(a => a.classificacao === 'B');
        if (abcFilter === 'Inativos') return artigosDataFull.filter(a => a.classificacao === 'C');
        return artigosDataFull.filter(a => a.classificacao === abcFilter);
    };

    const artigosData = getFilteredArtigos();

    const movimentosColumns = [
        { key: 'data', label: 'Data', width: '12%' },
        { key: 'artigo', label: 'Artigo', width: '25%' },
        { key: 'tipo', label: 'Tipo', width: '12%' },
        { key: 'quantidade', label: 'Quantidade', width: '12%' },
        { key: 'origem', label: 'Origem/Destino', width: '25%' },
        { key: 'documento', label: 'Documento', width: '14%' }
    ];

    const movimentosDataFull = [
        { data: '05/02/2026', artigo: 'Laptop Dell XPS 15', tipo: 'Saída', quantidade: 15, origem: 'Tech Solutions Lda', documento: 'FT 2026/125', classificacao: 'A' },
        { data: '04/02/2026', artigo: 'Monitor LG 27"', tipo: 'Entrada', quantidade: 50, origem: 'Global Tech Supply', documento: 'FC 2026/234', classificacao: 'A' },
        { data: '04/02/2026', artigo: 'Teclado Mecânico', tipo: 'Saída', quantidade: 25, origem: 'Mega Store SA', documento: 'FT 2026/124', classificacao: 'A' },
        { data: '03/02/2026', artigo: 'Mouse Wireless HP', tipo: 'Saída', quantidade: 40, origem: 'MAKRO', documento: 'FT 2026/123', classificacao: 'B' },
        { data: '02/02/2026', artigo: 'Webcam Full HD', tipo: 'Entrada', quantidade: 30, origem: 'Tech Distributor', documento: 'FC 2026/232', classificacao: 'B' },
        { data: '01/02/2026', artigo: 'SSD Samsung 1TB', tipo: 'Saída', quantidade: 20, origem: 'MODELO CONTINENTE', documento: 'FT 2026/122', classificacao: 'A' },
        { data: '31/01/2026', artigo: 'Produto Descontinuado 1', tipo: 'Saída', quantidade: 1, origem: 'Cliente Diversos', documento: 'FT 2026/100', classificacao: 'C' }
    ];

    const getFilteredMovimentos = () => {
        if (abcFilter === 'Todos') return movimentosDataFull;
        if (abcFilter === 'Ativos') return movimentosDataFull.filter(m => m.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return movimentosDataFull.filter(m => m.classificacao === 'B');
        if (abcFilter === 'Inativos') return movimentosDataFull.filter(m => m.classificacao === 'C');
        return movimentosDataFull.filter(m => m.classificacao === abcFilter);
    };

    const movimentosData = getFilteredMovimentos();

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
                        <KPICards pageTitle="AS" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards />
                        <SideCards cardCount={4} pageContext="artigos-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="artigos-stats" />
                        <GraphCards />
                    </div>
                    <div className="h-[40%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Catálogo de Artigos"
                            columns={artigosColumns}
                            data={artigosData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Movimentos de Stock"
                            columns={movimentosColumns}
                            data={movimentosData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}

export default ArtigosPage;
