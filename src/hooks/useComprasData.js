import { useState, useEffect } from 'react';

function useComprasData() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setData({});
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return { isLoading, data, error };
}

export default useComprasData;
