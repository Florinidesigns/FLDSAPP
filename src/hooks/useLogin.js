import { useState } from 'react';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            // Simular chamada à API
            // await new Promise(resolve => setTimeout(resolve, 1000));

            // Validações básicas
            if (!email || !password) {
                setError('Por favor, preencha todos os campos');
                setLoading(false);
                return { success: false, error: 'Campos vazios' };
            }

            // TODO: Implementar chamada real à API
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     setError(data.message || 'Email ou senha incorretos');
            //     setLoading(false);
            //     return { success: false, error: data.message };
            // }

            // Simular sucesso por enquanto
            const user = { email, id: '1' };

            setLoading(false);
            return { success: true, user };

        } catch (err) {
            setError('Erro ao fazer login: ' + err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    return {
        login,
        loading,
        error
    };
};
