import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAsync = (
    callback,
    dependencies = [],
    { immediate = true, handleError = true, onSuccess, onError }
) => {
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const callbackMemoized = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const res = await callback();
            setData(res);
            onSuccess?.(res);
        } catch (err) {
            setError(err);
            if (handleError) {
                toast.error(err.message);
            }
            onError?.(err);
        } finally {
            setLoading(false);
        }
    }, [callback, ...dependencies]);

    useEffect(() => {
        if (immediate) callbackMemoized();
    }, [callbackMemoized, immediate]);

    return { callback: callbackMemoized, loading, error, data };
};

export default useAsync;
