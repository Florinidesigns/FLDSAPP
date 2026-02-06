import React, { useState, useEffect } from 'react';
import { Home, Mail, Settings, LogOut, Check, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './center/Modal';

function SideBarMenu() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(null);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    // Mock users
    const users = [
        { id: 1, name: 'João Silva' },
        { id: 2, name: 'Maria Santos' },
        { id: 3, name: 'Pedro Costa' },
        { id: 4, name: 'Ana Oliveira' },
        { id: 5, name: 'Carlos Martins' },
    ];

    const [messages, setMessages] = useState([
        // Mock mensagem recebida
        {
            id: 1,
            content: "Olá, como estão as coisas?",
            senderName: "João Silva",
            company: "Empresa A",
            recipients: [
                {
                    userId: 0, // 0 = current user (nós)
                    userName: "Você",
                    isRead: false,
                }
            ],
            timestamp: "12:30",
            isFromMe: false,
        }
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageContent, setMessageContent] = useState('');
    const [quickReplyContent, setQuickReplyContent] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('Empresa A');
    const [activeConversation, setActiveConversation] = useState(null);
    const [showNewMessagePrompt, setShowNewMessagePrompt] = useState(false);
    const [newMessageTarget, setNewMessageTarget] = useState(null);

    // Estados para menções
    const [showMentionDropdown, setShowMentionDropdown] = useState(false);
    const [mentionSearch, setMentionSearch] = useState('');
    const [mentionStartPos, setMentionStartPos] = useState(0);
    const [activeTextarea, setActiveTextarea] = useState(null); // 'quick' ou 'new'

    const companies = ['Empresa A', 'Empresa B', 'Empresa C'];
    const pages = ['Visão Geral', 'Vendas', 'Compras', 'Fornecedores', 'Clientes', 'Artigos', 'Rentabilidade', 'Dashboards'];

    // Marca mensagens como lidas quando entramos no tab
    useEffect(() => {
        if (!activeConversation) return;

        setMessages(prevMessages =>
            prevMessages.map(msg => {
                // Calcular a chave da conversa desta mensagem
                let userGroupKey;
                if (msg.isFromMe) {
                    userGroupKey = msg.recipients.map(r => r.userName).sort().join(',');
                } else {
                    userGroupKey = msg.senderName;
                }
                const company = msg.company || 'Sem Empresa';
                const messageConversationKey = `${company}-${userGroupKey}`;

                // Se a mensagem pertence à conversa ativa e foi recebida, marcar como lida
                if (messageConversationKey === activeConversation && !msg.isFromMe) {
                    return {
                        ...msg,
                        recipients: msg.recipients.map(r => ({ ...r, isRead: true }))
                    };
                }
                return msg;
            })
        );
    }, [activeConversation]);

    // Verifica se recebemos mensagem não lida de um utilizador
    const hasReceivedMessageFrom = (userId) => {
        return messages.some(msg => {
            if (!msg.isFromMe) {
                // Verifica se tem algum recipient não lido
                const hasUnread = msg.recipients.some(r => !r.isRead);
                if (!hasUnread) return false;

                if (userId === 'all') {
                    return msg.recipients.length === 5;
                } else {
                    const user = users.find(u => u.id === userId);
                    if (!user) return false;
                    return msg.senderName === user.name;
                }
            }
            return false;
        });
    };

    // Verifica se existe conversa com um utilizador
    const hasConversationWith = (userId) => {
        return messages.some(msg => {
            if (userId === 'all') {
                // Organização: apenas mensagens com 5 recipients
                return msg.recipients.length === 5;
            } else {
                const user = users.find(u => u.id === userId);
                if (!user) return false;
                if (msg.isFromMe) {
                    // Mensagens enviadas por nós: 
                    // - Excluir mensagens para organização (5 recipients)
                    // - Incluir apenas se tem este recipient específico e é singular (1 recipient)
                    return msg.recipients.length === 1 && msg.recipients.some(r => r.userName === user.name);
                } else {
                    // Mensagens recebidas: apenas de um utilizador específico
                    return msg.senderName === user.name;
                }
            }
        });
    };

    // Detectar @ e mostrar dropdown de menções
    const handleTextChange = (value, textareaType) => {
        if (textareaType === 'quick') {
            setQuickReplyContent(value);
        } else {
            setMessageContent(value);
        }

        // Detectar @
        const lastAtPos = value.lastIndexOf('@');
        if (lastAtPos !== -1) {
            const textAfterAt = value.substring(lastAtPos + 1);
            // Verificar se não há espaço após o @
            if (!textAfterAt.includes(' ')) {
                setMentionSearch(textAfterAt.toLowerCase());
                setMentionStartPos(lastAtPos);
                setShowMentionDropdown(true);
                setActiveTextarea(textareaType);
            } else {
                setShowMentionDropdown(false);
            }
        } else {
            setShowMentionDropdown(false);
        }
    };

    // Inserir menção selecionada
    const insertMention = (page) => {
        const currentText = activeTextarea === 'quick' ? quickReplyContent : messageContent;
        const beforeMention = currentText.substring(0, mentionStartPos);
        const afterMention = currentText.substring(mentionStartPos + mentionSearch.length + 1);
        const newText = `${beforeMention}@${page}${afterMention}`;

        if (activeTextarea === 'quick') {
            setQuickReplyContent(newText);
        } else {
            setMessageContent(newText);
        }

        setShowMentionDropdown(false);
        setMentionSearch('');
    };

    // Filtrar páginas baseado na busca
    const filteredPages = pages.filter(page =>
        page.toLowerCase().includes(mentionSearch)
    );

    const handleUserSelection = (userId) => {
        // Encontrar ou criar a conversa com o utilizador selecionado
        const groupedByCompany = messages.reduce((acc, msg) => {
            const company = msg.company || 'Sem Empresa';
            if (!acc[company]) {
                acc[company] = {};
            }

            let userGroupKey;
            if (msg.isFromMe) {
                userGroupKey = msg.recipients.map(r => r.userName).sort().join(',');
            } else {
                userGroupKey = msg.senderName;
            }

            if (!acc[company][userGroupKey]) {
                acc[company][userGroupKey] = [];
            }
            acc[company][userGroupKey].push(msg);
            return acc;
        }, {});

        // Procurar conversa existente com este utilizador
        let foundConversation = null;
        Object.entries(groupedByCompany).forEach(([company, userGroups]) => {
            Object.entries(userGroups).forEach(([userGroupKey, groupMessages]) => {
                const conversationKey = `${company}-${userGroupKey}`;
                // Verificar se esta conversa é com o utilizador selecionado
                if (userId === 'all') {
                    // Organização: 5 recipients
                    if (groupMessages[0].isFromMe && groupMessages[0].recipients.length === 5) {
                        foundConversation = conversationKey;
                    }
                } else {
                    const userName = users.find(u => u.id === userId)?.name;
                    if (userGroupKey === userName || groupMessages[0].recipients.some(r => r.userName === userName)) {
                        foundConversation = conversationKey;
                    }
                }
            });
        });

        if (foundConversation) {
            // Ir para a conversa existente
            setActiveConversation(foundConversation);
        } else {
            // Mostrar prompt para criar nova mensagem
            setNewMessageTarget(userId);
            setShowNewMessagePrompt(true);
        }

        setIsUserDropdownOpen(false);
    };

    const handleSendNewMessage = () => {
        if (!messageContent.trim() || !newMessageTarget) return;

        let recipients;
        if (newMessageTarget === 'all') {
            recipients = users.map((user) => ({
                userId: user.id,
                userName: user.name,
                isRead: false,
            }));
        } else {
            recipients = [{
                userId: newMessageTarget,
                userName: users.find((u) => u.id === newMessageTarget)?.name,
                isRead: false,
            }];
        }

        const newMessage = {
            id: Date.now(),
            content: messageContent,
            senderName: "",
            company: selectedCompany,
            recipients,
            timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            isFromMe: true,
        };

        setMessages((prev) => [...prev, newMessage]);
        setMessageContent('');
        setShowNewMessagePrompt(false);
        setNewMessageTarget(null);

        // Ativar a nova conversa
        setTimeout(() => {
            const userGroupKey = recipients.map(r => r.userName).sort().join(',');
            setActiveConversation(`${selectedCompany}-${userGroupKey}`);
        }, 100);
    };

    const handlePublish = () => {
        if (!messageContent.trim() || !selectedUser) return;

        // Determinar destinatários
        let recipients;
        if (selectedUser === 'all') {
            // Organização: enviar para todos
            recipients = users.map((user) => ({
                userId: user.id,
                userName: user.name,
                isRead: false,
            }));
        } else {
            // Utilizador específico
            recipients = [{
                userId: selectedUser,
                userName: users.find((u) => u.id === selectedUser)?.name,
                isRead: false,
            }];
        }

        const newMessage = {
            id: Date.now(),
            content: messageContent,
            senderName: "",
            company: selectedCompany,
            recipients,
            timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            isFromMe: true,
        };

        setMessages((prev) => [...prev, newMessage]);
        setMessageContent('');
        setSelectedUser(null);
    };

    const handleQuickReply = () => {
        if (!quickReplyContent.trim() || !activeConversation) return;

        // Encontrar a conversa ativa para determinar os destinatários
        const groupedByCompany = messages.reduce((acc, msg) => {
            const company = msg.company || 'Sem Empresa';
            if (!acc[company]) {
                acc[company] = {};
            }

            let userGroupKey;
            if (msg.isFromMe) {
                userGroupKey = msg.recipients.map(r => r.userName).sort().join(',');
            } else {
                userGroupKey = msg.senderName;
            }

            if (!acc[company][userGroupKey]) {
                acc[company][userGroupKey] = [];
            }
            acc[company][userGroupKey].push(msg);
            return acc;
        }, {});

        // Encontrar a company e userGroupKey da conversa ativa
        let targetRecipients = [];
        let targetCompany = selectedCompany;

        Object.entries(groupedByCompany).forEach(([company, userGroups]) => {
            Object.entries(userGroups).forEach(([userGroupKey, groupMessages]) => {
                const conversationKey = `${company}-${userGroupKey}`;
                if (conversationKey === activeConversation) {
                    targetCompany = company;
                    // Se foi recebida, responder para o remetente
                    if (!groupMessages[0].isFromMe) {
                        const sender = groupMessages[0].senderName;
                        const senderUser = users.find(u => u.name === sender);
                        targetRecipients = [{
                            userId: senderUser?.id || 0,
                            userName: sender,
                            isRead: false,
                        }];
                    } else {
                        // Se foi enviada, usar os mesmos destinatários
                        targetRecipients = groupMessages[0].recipients.map(r => ({
                            userId: r.userId,
                            userName: r.userName,
                            isRead: false,
                        }));
                    }
                }
            });
        });

        const newMessage = {
            id: Date.now(),
            content: quickReplyContent,
            senderName: "",
            company: targetCompany,
            recipients: targetRecipients,
            timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            isFromMe: true,
        };

        setMessages((prev) => [...prev, newMessage]);
        setQuickReplyContent('');
    };

    const toggleMessageRead = (messageId, userId) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId
                    ? {
                        ...msg,
                        recipients: msg.recipients.map((r) =>
                            r.userId === userId ? { ...r, isRead: !r.isRead } : r
                        ),
                    }
                    : msg
            )
        );
    };

    const menuItems = [
        { id: 1, icon: Home, label: 'Menu', path: '/dashboards' },
        { id: 2, icon: Mail, label: 'Mensagem', modalKey: 'mensagem' },
        { id: 3, icon: Settings, label: 'Definições', modalKey: 'definicoes' },
        { id: 4, icon: LogOut, label: 'Sair', path: '/', action: 'logout' },
    ];

    const handleClick = (item) => {
        if (item.action === 'logout') {
            // TODO: Implementar logout
            localStorage.clear();
            navigate(item.path);
        } else if (item.modalKey) {
            setOpenModal(item.modalKey);
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <>
            <div className='h-full w-[5%] relative group'>
                <div className='h-[45%] absolute top-1/4 left-0 bg-transparent rounded-r-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out p-2 z-10 w-full group-hover:w-60 origin-left group-hover:bg-white/30 group-hover:backdrop-blur-sm group-hover:shadow-lg'>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-400/50 transition-all duration-200 group-hover:gap-4 group-hover:justify-start w-full'
                                title={item.label}
                            >
                                <Icon size={32} strokeWidth={2.5} className='text-slate-700 shrink-0' />
                                <span className='text-slate-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden group-hover:inline'>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={openModal === 'mensagem'}
                onClose={() => setOpenModal(null)}
                className='h-[50%] w-[60%]'
            >
                <div className="flex h-full gap-4">
                    {/* Lista de mensagens - 80% */}
                    <div className="w-[80%] flex flex-col relative">
                        {/* Tabs das conversas */}
                        <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
                            {(() => {
                                const groupedByCompany = messages.reduce((acc, msg) => {
                                    const company = msg.company || 'Sem Empresa';
                                    if (!acc[company]) {
                                        acc[company] = {};
                                    }

                                    let userGroupKey;
                                    if (msg.isFromMe) {
                                        // Para mensagens enviadas, usar os nomes dos destinatários
                                        userGroupKey = msg.recipients.map(r => r.userName).sort().join(',');
                                    } else {
                                        userGroupKey = msg.senderName;
                                    }

                                    if (!acc[company][userGroupKey]) {
                                        acc[company][userGroupKey] = [];
                                    }
                                    acc[company][userGroupKey].push(msg);
                                    return acc;
                                }, {});

                                return Object.entries(groupedByCompany).map(([company, userGroups]) =>
                                    Object.entries(userGroups).map(([userGroupKey, groupMessages]) => {
                                        const conversationKey = `${company}-${userGroupKey}`;
                                        const isActive = activeConversation === conversationKey || (activeConversation === null && Object.keys(groupedByCompany)[0] === company && Object.keys(userGroups)[0] === userGroupKey);

                                        let displayName;
                                        if (groupMessages[0].isFromMe) {
                                            const recipients = groupMessages[0].recipients;
                                            if (recipients.length === 5) {
                                                displayName = 'Organização';
                                            } else if (recipients.length === 1) {
                                                displayName = recipients[0].userName;
                                            } else {
                                                displayName = `${recipients[0].userName} +${recipients.length - 1}`;
                                            }
                                        } else {
                                            displayName = groupMessages[0].senderName;
                                        }

                                        return (
                                            <button
                                                key={conversationKey}
                                                onClick={() => setActiveConversation(conversationKey)}
                                                className={`px-3 py-1.5 border border-orange-300 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${isActive
                                                    ? 'bg-orange-500 text-white border-orange-500'
                                                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                                    }`}
                                            >
                                                {displayName}
                                            </button>
                                        );
                                    })
                                ).flat();
                            })()}
                        </div>

                        <div className="flex-1 overflow-auto space-y-3 border-t border-orange-200 pt-3">
                            {messages.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center mt-8">Nenhuma mensagem ainda</p>
                            ) : (
                                (() => {
                                    // Agrupar mensagens primeiro por empresa, depois por utilizador
                                    const groupedByCompany = messages.reduce((acc, msg) => {
                                        const company = msg.company || 'Sem Empresa';
                                        if (!acc[company]) {
                                            acc[company] = {};
                                        }

                                        let userGroupKey;
                                        if (msg.isFromMe) {
                                            // Para mensagens enviadas, usar os nomes dos destinatários
                                            userGroupKey = msg.recipients.map(r => r.userName).sort().join(',');
                                        } else {
                                            userGroupKey = msg.senderName;
                                        }

                                        if (!acc[company][userGroupKey]) {
                                            acc[company][userGroupKey] = [];
                                        }
                                        acc[company][userGroupKey].push(msg);
                                        return acc;
                                    }, {});

                                    // Filtrar apenas a conversa ativa
                                    return Object.entries(groupedByCompany).map(([company, userGroups], companyIndex) => (
                                        <div key={company}>
                                            {Object.entries(userGroups).map(([userGroupKey, groupMessages], userGroupIndex) => {
                                                const conversationKey = `${company}-${userGroupKey}`;
                                                const isActive = activeConversation === conversationKey || (activeConversation === null && companyIndex === 0 && userGroupIndex === 0);

                                                // Mostrar apenas a conversa ativa
                                                if (!isActive) return null;

                                                let displayName;
                                                if (groupMessages[0].isFromMe) {
                                                    const recipients = groupMessages[0].recipients;
                                                    if (recipients.length === 5) {
                                                        displayName = 'Organização';
                                                    } else if (recipients.length === 1) {
                                                        displayName = recipients[0].userName;
                                                    } else {
                                                        displayName = `${recipients[0].userName} +${recipients.length - 1}`;
                                                    }
                                                } else {
                                                    displayName = groupMessages[0].senderName;
                                                }

                                                return (
                                                    <div key={userGroupKey}>
                                                        <div className="space-y-2">
                                                            {groupMessages.map((msg) => {
                                                                const allRead = msg.recipients.every((r) => r.isRead);
                                                                const isReceivedUnread = !msg.isFromMe && !allRead;
                                                                const isReceivedRead = !msg.isFromMe && allRead;
                                                                const isSentUnread = msg.isFromMe && !allRead;

                                                                // Cores para mensagens recebidas (verde)
                                                                const receivedUnreadColor = 'bg-green-50 border-2 border-green-300 shadow-sm';
                                                                const receivedReadColor = 'bg-gray-50 border border-gray-200';

                                                                // Cores para mensagens enviadas (azul)
                                                                const sentUnreadColor = 'bg-blue-50 border-2 border-blue-300 shadow-sm';
                                                                const sentReadColor = 'bg-gray-50 border border-gray-200';

                                                                const containerColor = isReceivedUnread ? receivedUnreadColor : isReceivedRead ? receivedReadColor : isSentUnread ? sentUnreadColor : sentReadColor;

                                                                const textColor = isReceivedUnread ? 'text-green-800' : isReceivedRead ? 'text-gray-600' : isSentUnread ? 'text-blue-800' : 'text-gray-600';
                                                                const timeColor = isReceivedUnread ? 'text-green-600' : isReceivedRead ? 'text-gray-500' : isSentUnread ? 'text-blue-600' : 'text-gray-500';

                                                                return (
                                                                    <div
                                                                        key={msg.id}
                                                                        className={`p-4 rounded-lg transition-all ${containerColor} hover:shadow-md`}
                                                                    >
                                                                        <div className="flex justify-between items-start gap-2 mb-3">
                                                                            <div className="flex-1">
                                                                                <div className="flex items-baseline gap-2">
                                                                                    <p className={`text-xs break-words font-medium ${textColor}`}>
                                                                                        {msg.content}
                                                                                    </p>
                                                                                    <span className={`text-xs shrink-0 ${timeColor}`}>
                                                                                        ({msg.timestamp})
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Minicards com utilizadores - só para grupos */}
                                                                        {msg.recipients.length > 1 && (
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {msg.recipients.map((recipient) => {
                                                                                    const isReceivedMinicard = !msg.isFromMe;
                                                                                    const miniUnreadColor = isReceivedMinicard
                                                                                        ? 'bg-green-100 border border-green-200 hover:bg-green-150'
                                                                                        : 'bg-blue-100 border border-blue-200 hover:bg-blue-150';
                                                                                    const miniTextColor = isReceivedMinicard
                                                                                        ? 'text-green-900'
                                                                                        : 'text-blue-900';
                                                                                    const miniBorderColor = isReceivedMinicard
                                                                                        ? 'border-green-400 bg-green-200'
                                                                                        : 'border-blue-400 bg-blue-200';

                                                                                    return (
                                                                                        <div
                                                                                            key={recipient.userId}
                                                                                            onClick={() => toggleMessageRead(msg.id, recipient.userId)}
                                                                                            className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors whitespace-nowrap text-xs ${recipient.isRead
                                                                                                ? 'bg-white border border-gray-200 hover:bg-gray-50'
                                                                                                : miniUnreadColor
                                                                                                }`}
                                                                                        >
                                                                                            <span className={`font-medium ${recipient.isRead ? 'text-gray-600' : miniTextColor}`}>
                                                                                                {recipient.userName}
                                                                                            </span>
                                                                                            <div className={`w-2 h-2 rounded-full border-1.5 shrink-0 ${recipient.isRead ? 'border-gray-300 bg-white' : miniBorderColor}`} />
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))
                                })()
                            )}
                        </div>

                        {/* Resposta rápida - só aparece se houver conversa ativa */}
                        {activeConversation && (
                            <div className="border-t border-orange-200 pt-3 mt-3 relative">
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={quickReplyContent}
                                            onChange={(e) => handleTextChange(e.target.value, 'quick')}
                                            placeholder="Escrever resposta..."
                                            className="w-full p-2 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none text-sm"
                                            rows={2}
                                            maxLength={500}
                                        />
                                        {/* Dropdown de menções para quick reply */}
                                        {showMentionDropdown && activeTextarea === 'quick' && filteredPages.length > 0 && (
                                            <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-30">
                                                {filteredPages.map((page, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => insertMention(page)}
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                                                    >
                                                        @{page}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleQuickReply}
                                        disabled={!quickReplyContent.trim()}
                                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 rounded-md text-sm font-medium transition-colors self-end"
                                    >
                                        <Check size={18} />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-500 mt-1 inline-block">{quickReplyContent.length}/500</span>
                            </div>
                        )}

                        {/* Prompt para nova mensagem */}
                        {showNewMessagePrompt && (
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-20">
                                <div className="bg-white rounded-lg shadow-2xl p-6 w-[80%] max-w-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-base font-semibold text-slate-700">
                                            Nova mensagem para {newMessageTarget === 'all' ? 'Organização' : users.find(u => u.id === newMessageTarget)?.name}
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setShowNewMessagePrompt(false);
                                                setMessageContent('');
                                                setNewMessageTarget(null);
                                            }}
                                            className="text-gray-500 hover:text-gray-700 text-xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div className="relative mb-3">
                                        <textarea
                                            value={messageContent}
                                            onChange={(e) => handleTextChange(e.target.value, 'new')}
                                            placeholder="Escreva sua mensagem..."
                                            className="w-full p-3 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none text-sm"
                                            rows={4}
                                            maxLength={500}
                                            autoFocus
                                        />
                                        {/* Dropdown de menções para nova mensagem */}
                                        {showMentionDropdown && activeTextarea === 'new' && filteredPages.length > 0 && (
                                            <div className="absolute top-0 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-30">
                                                {filteredPages.map((page, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => insertMention(page)}
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                                                    >
                                                        @{page}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">{messageContent.length}/500</span>
                                        <button
                                            onClick={handleSendNewMessage}
                                            disabled={!messageContent.trim()}
                                            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                                        >
                                            <Check size={16} />
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Lista de utilizadores - 20% */}
                    <div className="w-[20%] border-l border-gray-200 pl-4 flex flex-col">
                        <h3 className="text-base font-semibold mb-3 text-slate-700">Utilizadores</h3>
                        <div className="flex-1 overflow-auto space-y-2">
                            {/* Botão Organização */}
                            <button
                                onClick={() => handleUserSelection('all')}
                                className={`w-full text-left px-3 py-1.5 rounded-lg border transition-colors ${hasReceivedMessageFrom('all')
                                    ? 'border-red-300 bg-red-50 hover:bg-red-100'
                                    : hasConversationWith('all')
                                        ? 'border-green-300 bg-green-50 hover:bg-green-100'
                                        : 'border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300'
                                    }`}
                            >
                                <span className={`text-xs font-medium ${hasReceivedMessageFrom('all')
                                    ? 'text-red-700'
                                    : hasConversationWith('all')
                                        ? 'text-green-700'
                                        : 'text-gray-700'
                                    }`}>Organização</span>
                            </button>

                            {/* Lista de utilizadores individuais */}
                            {users.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleUserSelection(user.id)}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg border transition-colors ${hasReceivedMessageFrom(user.id)
                                        ? 'border-red-300 bg-red-50 hover:bg-red-100'
                                        : hasConversationWith(user.id)
                                            ? 'border-green-300 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300'
                                        }`}
                                >
                                    <span className={`text-xs font-medium ${hasReceivedMessageFrom(user.id)
                                        ? 'text-red-700'
                                        : hasConversationWith(user.id)
                                            ? 'text-green-700'
                                            : 'text-gray-700'
                                        }`}>{user.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={openModal === 'definicoes'}
                onClose={() => setOpenModal(null)}
                className='h-[50%] w-[60%]'
            >
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold mb-4">Definições</h2>
                    <p className="text-gray-600 text-center">Configurações do sistema</p>
                </div>
            </Modal>
        </>
    );
}

export default SideBarMenu;
