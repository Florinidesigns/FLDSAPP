import React, { useState } from 'react';
import { Home, Mail, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './center/Modal';

function SideBarMenu() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(null);

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
                <div className='h-[45%] absolute top-1/4 left-0 bg-slate-200 rounded-r-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out p-2 z-10 w-full group-hover:w-60 origin-left'>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-300 transition-all duration-200 group-hover:gap-4 group-hover:justify-start w-full'
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
                <div className="flex flex-col items-center justify-center ">
                    <h2 className="text-lg font-bold mb-4">Mensagens</h2>
                    <p className="text-gray-600 text-center">Nenhuma mensagem nova</p>
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
