import { useState } from "react";

export const useGetApiRequestLoading = <T = unknown,>() => {
    const [loading, setLoading] = useState(false);

    const makeRequest = async (requestFn: () => Promise<T>) => {
        setLoading(true);
        try {
            return await requestFn();
        } finally {
            setLoading(false);
        }
    };

    return { makeRequest, loading };
};