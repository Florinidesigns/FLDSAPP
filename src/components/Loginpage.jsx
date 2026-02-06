import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useModal } from '../hooks/useModal.js';
import Modal from './center/Modal.jsx';
import Modalsenha from './center/Modais/Modalsenha';

function Loginpage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();
    const { isOpen, openModal, closeModal } = useModal();

    const handleManterSenha = (senha) => {
        setPassword(senha);
        closeModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result.success) {
            console.log('Login realizado com sucesso:', result.user);
            navigate('/dashboards');
        } else {
            console.log('Erro no login:', result.error);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-row bg-white">
            <div className="w-[80%] h-full flex">
                <img
                    className="w-full h-full object-cover"
                    src="florinids.png"
                    alt="Florinids login"
                />
            </div>

            <div className="w-[20%] h-full flex flex-col justify-center items-center bg-white px-8">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
                        Login
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder-slate-400"
                                placeholder="Um email válido"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder-slate-400"
                                placeholder="Sua senha"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? 'A Entrar...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={openModal}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Recuperar Senha
                        </button>
                    </div>

                    <Modal isOpen={isOpen} onClose={closeModal}>
                        <Modalsenha onManterSenha={handleManterSenha} />
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
