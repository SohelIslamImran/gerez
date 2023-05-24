import api from "../api";
import useAsync from "./useAsync";

const useFetch = (url, options = {}, dependencies = [], asyncOptions) => {
    return useAsync(
        () => api.request({ url, method: "get", ...options }),
        dependencies,
        asyncOptions
    );
};

export default useFetch;
