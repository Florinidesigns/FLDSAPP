import { useState, useEffect } from 'react';

function useVendasData() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simular carregamento de dados (2 segundos)
        const timer = setTimeout(() => {
            setIsLoading(false);
            setData({});
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return { isLoading, data, error };
}

export default useVendasData;
