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
import useFornecedoresData from '../../hooks/useFornecedoresData';
import { useABCFilter } from '../../context/ABCFilterContext';
import ClientesChart from '../charts/ClientesChart';

function FornecedoresPage() {
    const navigate = useNavigate();
    const { isLoading } = useFornecedoresData();
    const loadingText = 'Loading Fornecedores';
    const { abcFilter } = useABCFilter();

    // Mock data para tabelas de fornecedores
    const fornecedoresColumns = [
        { key: 'codigo', label: 'Código', width: '10%' },
        { key: 'designacao', label: 'Designação', width: '35%' },
        { key: 'contacto', label: 'Contacto', width: '15%' },
        { key: 'volume', label: 'Volume €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'prazo', label: 'Prazo Pag.', width: '10%' },
        { key: 'avaliacao', label: 'Avaliação', width: '10%' }
    ];

    const fornecedoresDataFull = [
        { codigo: 'F.001', designacao: 'DISTRIBUIDORA ALIMENTAR, LDA', contacto: '217 123 456', volume: 387000.50, prazo: '30 dias', avaliacao: 'A+', classificacao: 'A' },
        { codigo: 'F.002', designacao: 'PRODUTOS FRESCOS PORTUGAL, S.A.', contacto: '218 234 567', volume: 245800.75, prazo: '45 dias', avaliacao: 'A', classificacao: 'A' },
        { codigo: 'F.003', designacao: 'BEBIDAS & CIA, LDA', contacto: '219 345 678', volume: 198500.25, prazo: '30 dias', avaliacao: 'A', classificacao: 'A' },
        { codigo: 'F.004', designacao: 'CONGELADOS NACIONAIS, S.A.', contacto: '211 456 789', volume: 321450.90, prazo: '60 dias', avaliacao: 'B+', classificacao: 'B' },
        { codigo: 'F.005', designacao: 'LACTICÍNIOS PORTUGUESES, LDA', contacto: '213 567 890', volume: 156700.40, prazo: '30 dias', avaliacao: 'A', classificacao: 'B' },
        { codigo: 'F.006', designacao: 'CARNES PREMIUM, S.A.', contacto: '214 678 901', volume: 267890.60, prazo: '45 dias', avaliacao: 'A+', classificacao: 'A' },
        { codigo: 'F.007', designacao: 'Global Tech Supply', contacto: '220 789 012', volume: 397000.85, prazo: '90 dias', avaliacao: 'A+', classificacao: 'A' },
        { codigo: 'F.008', designacao: 'Fornecedor Inativo 1', contacto: '220 111 222', volume: 12000.00, prazo: '60 dias', avaliacao: 'C', classificacao: 'C' },
        { codigo: 'F.009', designacao: 'Fornecedor Inativo 2', contacto: '220 333 444', volume: 8500.00, prazo: '90 dias', avaliacao: 'C', classificacao: 'C' }
    ];

    const getFilteredFornecedores = () => {
        if (abcFilter === 'Todos') return fornecedoresDataFull;
        if (abcFilter === 'Ativos') return fornecedoresDataFull.filter(f => f.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return fornecedoresDataFull.filter(f => f.classificacao === 'B');
        if (abcFilter === 'Inativos') return fornecedoresDataFull.filter(f => f.classificacao === 'C');
        return fornecedoresDataFull.filter(f => f.classificacao === abcFilter);
    };

    const fornecedoresData = getFilteredFornecedores();

    const condicoesColumns = [
        { key: 'fornecedor', label: 'Fornecedor', width: '30%' },
        { key: 'categoria', label: 'Categoria', width: '20%' },
        { key: 'desconto', label: 'Desconto %', width: '12%' },
        { key: 'prazo', label: 'Prazo', width: '12%' },
        { key: 'minimo', label: 'Mínimo €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'status', label: 'Status', width: '11%' }
    ];

    const condicoesDataFull = [
        { fornecedor: 'DISTRIBUIDORA ALIMENTAR', categoria: 'Alimentação', desconto: '12%', prazo: '30d', minimo: 5000.00, status: 'Ativo', classificacao: 'A' },
        { fornecedor: 'PRODUTOS FRESCOS', categoria: 'Frescos', desconto: '8%', prazo: '45d', minimo: 3000.00, status: 'Ativo', classificacao: 'A' },
        { fornecedor: 'BEBIDAS & CIA', categoria: 'Bebidas', desconto: '15%', prazo: '30d', minimo: 2000.00, status: 'Ativo', classificacao: 'B' },
        { fornecedor: 'CONGELADOS NACIONAIS', categoria: 'Congelados', desconto: '10%', prazo: '60d', minimo: 4000.00, status: 'Ativo', classificacao: 'B' },
        { fornecedor: 'Global Tech Supply', categoria: 'Tecnologia', desconto: '18%', prazo: '90d', minimo: 10000.00, status: 'Ativo', classificacao: 'A' },
        { fornecedor: 'Fornecedor Suspenso', categoria: 'Diversos', desconto: '0%', prazo: '0d', minimo: 0, status: 'Inativo', classificacao: 'C' }
    ];

    const getFilteredCondicoes = () => {
        if (abcFilter === 'Todos') return condicoesDataFull;
        if (abcFilter === 'Ativos') return condicoesDataFull.filter(c => c.classificacao === 'A');
        if (abcFilter === 'SemiAtivos') return condicoesDataFull.filter(c => c.classificacao === 'B');
        if (abcFilter === 'Inativos') return condicoesDataFull.filter(c => c.classificacao === 'C');
        return condicoesDataFull.filter(c => c.classificacao === abcFilter);
    };

    const condicoesData = getFilteredCondicoes();

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
                        <KPICards pageTitle="FR" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards>
                            <ClientesChart title="Gráfico Compras Anual" />
                        </GraphCards>
                        <SideCards cardCount={4} pageContext="fornecedores-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="fornecedores-stats" />
                        <GraphCards />
                    </div>
                    <div className="h-[85%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Lista de Fornecedores"
                            columns={fornecedoresColumns}
                            data={fornecedoresData}
                            onInfoClick={handleInfoClick}
                        />
                        <DataTable
                            title="Condições Comerciais"
                            columns={condicoesColumns}
                            data={condicoesData}
                            onInfoClick={handleInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>
        </div>
    );
}

export default FornecedoresPage;
