import React from 'react';
import { Home, Mail, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SideBarMenu() {
    const navigate = useNavigate();

    const menuItems = [
        { id: 1, icon: Home, label: 'Menu', path: '/dashboards' },
        { id: 2, icon: Mail, label: 'Mensagem', path: '/vendas' },
        { id: 3, icon: Settings, label: 'Definições', path: '/settings' },
        { id: 4, icon: LogOut, label: 'Sair', path: '/', action: 'logout' },
    ];

    const handleClick = (item) => {
        if (item.action === 'logout') {
            // TODO: Implementar logout
            localStorage.clear();
        }
        navigate(item.path);
    };

    return (
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
                            <Icon size={24} className='text-slate-700 shrink-0' />
                            <span className='text-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden group-hover:inline'>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SideBarMenu;
