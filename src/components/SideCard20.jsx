import React from 'react';

function SideCard20({ cardCount = 4, pageContext = 'default' }) {
    const mockData = {
        'vendas-top': [
            { id: 1, title: 'Cliente Top', value: 'Tech Solutions Lda', subtitle: '245.000 EUR' },
            { id: 2, title: 'Produto Mais Vendido', value: 'Laptop Dell XPS 15', subtitle: '127 unidades' },
            { id: 3, title: 'Vendedor Destaque', value: 'Joao Silva', subtitle: '432.000 EUR' },
            { id: 4, title: 'Regiao Lider', value: 'Lisboa', subtitle: '38% do total' }
        ],
        'vendas-stats': [
            { id: 1, title: 'Pedidos Pendentes', value: '47', subtitle: 'A processar' },
            { id: 2, title: 'Encomendas Hoje', value: '23', subtitle: '+15% vs ontem' },
            { id: 3, title: 'Tempo Medio', value: '2.3 dias', subtitle: 'Entrega' },
            { id: 4, title: 'Satisfacao', value: '4.7/5', subtitle: '892 avaliacoes' }
        ],
        'compras-top': [
            { id: 1, title: 'Fornecedor Top', value: 'Global Tech Supply', subtitle: '387.000 EUR' },
            { id: 2, title: 'Produto Mais Comprado', value: 'Componentes Eletronicos', subtitle: '245 unidades' },
            { id: 3, title: 'Categoria Maior', value: 'Hardware', subtitle: '42% do total' },
            { id: 4, title: 'Prazo Medio', value: '28 dias', subtitle: 'Pagamento' }
        ],
        'compras-stats': [
            { id: 1, title: 'Encomendas Ativas', value: '34', subtitle: 'Em transito' },
            { id: 2, title: 'Faturas Pendentes', value: '18', subtitle: 'A pagar' },
            { id: 3, title: 'Valor Pendente', value: '142.500 EUR', subtitle: 'A receber' },
            { id: 4, title: 'Fornecedores Ativos', value: '87', subtitle: 'Este mes' }
        ],
        'clientes-top': [
            { id: 1, title: 'Cliente Fidelizado', value: 'Mega Store SA', subtitle: '5 anos' },
            { id: 2, title: 'Maior Crescimento', value: 'Quick Solutions', subtitle: '+156% este ano' },
            { id: 3, title: 'Setor Principal', value: 'Tecnologia', subtitle: '34% clientes' },
            { id: 4, title: 'Novo Cliente Top', value: 'Innovation Hub', subtitle: '89.000 EUR (3 meses)' }
        ],
        'clientes-stats': [
            { id: 1, title: 'Contactos Hoje', value: '142', subtitle: '23 novos' },
            { id: 2, title: 'Oportunidades', value: '67', subtitle: 'Em negociacao' },
            { id: 3, title: 'Taxa Resposta', value: '87%', subtitle: 'Em 24h' },
            { id: 4, title: 'NPS Score', value: '72', subtitle: 'Excelente' }
        ],
        'fornecedores-top': [
            { id: 1, title: 'Melhor Qualidade', value: 'Premium Supplies', subtitle: '9.4/10 score' },
            { id: 2, title: 'Mais Pontual', value: 'Express Logistics', subtitle: '98% on-time' },
            { id: 3, title: 'Melhor Preco', value: 'Bulk Wholesale Co', subtitle: '-12% vs media' },
            { id: 4, title: 'Parceiro Estrategico', value: 'Global Partners Ltd', subtitle: '8 anos' }
        ],
        'fornecedores-stats': [
            { id: 1, title: 'Entregas Hoje', value: '12', subtitle: '8 completas' },
            { id: 2, title: 'Atrasos', value: '3', subtitle: '2.1% do total' },
            { id: 3, title: 'Qualidade Media', value: '8.7/10', subtitle: 'Score' },
            { id: 4, title: 'Novos Fornecedores', value: '5', subtitle: 'Este trimestre' }
        ],
        'artigos-top': [
            { id: 1, title: 'Stock Critico', value: '24 artigos', subtitle: 'Abaixo minimo' },
            { id: 2, title: 'Mais Rentavel', value: 'Serie Premium XL', subtitle: '67% margem' },
            { id: 3, title: 'Maior Rotacao', value: 'Acessorios USB-C', subtitle: '12.3x/ano' },
            { id: 4, title: 'Novo Lancamento', value: 'Smart Kit Pro', subtitle: '342 vendas' }
        ],
        'artigos-stats': [
            { id: 1, title: 'Movimentos Hoje', value: '347', subtitle: '89 entradas' },
            { id: 2, title: 'Valor Medio', value: '1.087 EUR', subtitle: 'Por artigo' },
            { id: 3, title: 'Cobertura Stock', value: '42 dias', subtitle: 'Media' },
            { id: 4, title: 'Inventario Agendado', value: '15 Mar', subtitle: 'Proximo' }
        ],
        'rentabilidade-top': [
            { id: 1, title: 'Categoria Top', value: 'Software & Licencas', subtitle: '52% margem' },
            { id: 2, title: 'Produto Top', value: 'Enterprise Suite', subtitle: '145.000 EUR lucro' },
            { id: 3, title: 'Melhor Trimestre', value: 'Q3 2025', subtitle: '487.000 EUR lucro' },
            { id: 4, title: 'Canal Mais Rentavel', value: 'Online Direct', subtitle: '41% margem' }
        ],
        'rentabilidade-stats': [
            { id: 1, title: 'Receita Mes', value: '892.000 EUR', subtitle: '+18% vs anterior' },
            { id: 2, title: 'Custos Mes', value: '547.000 EUR', subtitle: '61% receita' },
            { id: 3, title: 'Lucro Mes', value: '345.000 EUR', subtitle: '38.7% margem' },
            { id: 4, title: 'Projecao Anual', value: '4.2M EUR', subtitle: 'Lucro liquido' }
        ],
        'default': [
            { id: 1, title: 'Metrica 1', value: '1.247', subtitle: 'Total' },
            { id: 2, title: 'Metrica 2', value: '342', subtitle: 'Ativos' },
            { id: 3, title: 'Metrica 3', value: '89%', subtitle: 'Taxa' },
            { id: 4, title: 'Metrica 4', value: '24.5K', subtitle: 'Valor' }
        ]
    };

    const cards = mockData[pageContext] || mockData.default;
    const displayCards = cards.slice(0, cardCount);

    return (
        <div className="w-[20%] flex flex-col gap-3 h-full overflow-hidden">
            {displayCards.map((card) => (
                <div
                    key={card.id}
                    className="bg-linear-to-r from-orange-400 to-orange-500 rounded-lg shadow-md p-3 text-white flex flex-col justify-between flex-1 min-h-0"
                >
                    <span className="text-xs font-semibold opacity-90">{card.title}</span>
                    <span className="text-lg font-bold leading-tight">{card.value}</span>
                    {card.subtitle && (
                        <span className="text-xs opacity-80 mt-1">{card.subtitle}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SideCard20;
