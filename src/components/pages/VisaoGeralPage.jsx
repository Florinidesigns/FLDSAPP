import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TopMenu from '../TopMenu';
import SideBarMenu from '../SideBarMenu';
import KPICards from '../KPICards';
import GraphCards from '../GraphCards';
import SideCards from '../SideCards';
import DataTable from '../DataTable';
import LoadingOverlay from '../LoadingOverlay';
import useVisaoGeralData from '../../hooks/useVisaoGeralData';
import VendasChart from '../charts/VendasChart';
import ComprasChart from '../charts/ComprasChart';
import AtividadeDetailModal from '../modals/AtividadeDetailModal';
import AlertaDetailModal from '../modals/AlertaDetailModal';

function VisaoGeralPage() {
    const navigate = useNavigate();
    const { isLoading } = useVisaoGeralData();
    const loadingText = 'Loading Visao Geral';

    const [selectedAtividade, setSelectedAtividade] = useState(null);
    const [isAtividadeModalOpen, setIsAtividadeModalOpen] = useState(false);
    const [selectedAlerta, setSelectedAlerta] = useState(null);
    const [isAlertaModalOpen, setIsAlertaModalOpen] = useState(false);

    // Mock data para tabelas da visão geral
    const atividadeColumns = [
        { key: 'tipo', label: 'Tipo', width: '15%' },
        { key: 'descricao', label: 'Descrição', width: '40%' },
        { key: 'data', label: 'Data/Hora', width: '18%' },
        { key: 'valor', label: 'Valor €', width: '15%', format: (val) => val.toLocaleString('pt-PT', { minimumFractionDigits: 2 }) },
        { key: 'status', label: 'Status', width: '12%' }
    ];

    const atividadeData = [
        { tipo: 'Venda', descricao: 'FT 2026/125 - Tech Solutions Lda', data: '05/02 14:32', valor: 15420.50, status: 'Concluído' },
        { tipo: 'Compra', descricao: 'FC 2026/234 - DISTRIBUIDORA ALIMENTAR', data: '05/02 11:15', valor: 45320.75, status: 'Recebido' },
        { tipo: 'Venda', descricao: 'FT 2026/124 - Mega Store SA', data: '04/02 16:45', valor: 8750.25, status: 'Concluído' },
        { tipo: 'Compra', descricao: 'FC 2026/233 - PRODUTOS FRESCOS', data: '04/02 09:20', valor: 28450.30, status: 'Trânsito' },
        { tipo: 'Pagamento', descricao: 'Pagamento - Global Tech Supply', data: '03/02 10:30', valor: 67890.50, status: 'Processado' },
        { tipo: 'Venda', descricao: 'FT 2026/123 - MAKRO', data: '02/02 15:10', valor: 23456.78, status: 'Pendente' },
        { tipo: 'Recebimento', descricao: 'Recebimento - Tech Solutions Lda', data: '01/02 11:45', valor: 15420.50, status: 'Confirmado' }
    ];

    const alertasColumns = [
        { key: 'prioridade', label: 'Prior.', width: '10%' },
        { key: 'tipo', label: 'Tipo', width: '15%' },
        { key: 'mensagem', label: 'Mensagem', width: '50%' },
        { key: 'data', label: 'Data', width: '15%' },
        { key: 'acao', label: 'Ação', width: '10%' }
    ];

    const alertasData = [
        { prioridade: 'Alta', tipo: 'Stock', mensagem: 'Webcam Full HD abaixo do stock mínimo (18 < 30)', data: '05/02/2026', acao: 'Encomendar' },
        { prioridade: 'Alta', tipo: 'Stock', mensagem: 'Impressora HP LaserJet abaixo do stock mínimo (12 < 15)', data: '05/02/2026', acao: 'Encomendar' },
        { prioridade: 'Média', tipo: 'Pagamento', mensagem: '3 faturas de fornecedores vencem em 7 dias', data: '04/02/2026', acao: 'Revisar' },
        { prioridade: 'Média', tipo: 'Cliente', mensagem: 'MAKRO com pagamento pendente há 30 dias', data: '03/02/2026', acao: 'Contactar' },
        { prioridade: 'Baixa', tipo: 'Sistema', mensagem: 'Atualização de sistema disponível', data: '01/02/2026', acao: 'Agendar' }
    ];

    const handleAtividadeInfoClick = (row) => {
        // Criar dados detalhados da atividade
        const atividadeDetalhada = {
            tipo: row.tipo,
            descricao: row.descricao,
            data: row.data,
            dataCompleta: row.data + ' - 05/02/2026',
            valor: row.valor,
            status: row.status,
            documento: row.descricao.split(' - ')[0],
            entidade: row.descricao.split(' - ')[1] || 'Entidade Desconhecida'
        };
        setSelectedAtividade(atividadeDetalhada);
        setIsAtividadeModalOpen(true);
    };

    const handleAlertaInfoClick = (row) => {
        // Criar dados detalhados do alerta
        const alertaDetalhado = {
            prioridade: row.prioridade,
            tipo: row.tipo,
            mensagem: row.mensagem,
            data: row.data,
            acao: row.acao
        };
        setSelectedAlerta(alertaDetalhado);
        setIsAlertaModalOpen(true);
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
                        <KPICards pageTitle="VG" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <GraphCards>
                            <VendasChart title="Gráfico de Vendas" />
                        </GraphCards>
                        <SideCards cardCount={4} pageContext="vendas-top" />
                    </div>
                    <div className="h-[50%] w-full flex gap-4 shrink-0">
                        <SideCards cardCount={4} pageContext="compras-top" />
                        <GraphCards>
                            <ComprasChart title="Gráfico de Compras" />
                        </GraphCards>
                    </div>
                    <div className="h-[85%] w-full flex gap-4 shrink-0">
                        <DataTable
                            title="Atividade Recente"
                            columns={atividadeColumns}
                            data={atividadeData}
                            onInfoClick={handleAtividadeInfoClick}
                        />
                        <DataTable
                            title="Alertas e Notificações"
                            columns={alertasColumns}
                            data={alertasData}
                            onInfoClick={handleAlertaInfoClick}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-500 text-white h-[2%]"></div>

            <AtividadeDetailModal
                isOpen={isAtividadeModalOpen}
                onClose={() => setIsAtividadeModalOpen(false)}
                atividadeData={selectedAtividade}
            />

            <AlertaDetailModal
                isOpen={isAlertaModalOpen}
                onClose={() => setIsAlertaModalOpen(false)}
                alertaData={selectedAlerta}
            />
        </div>
    );
}

export default VisaoGeralPage;
