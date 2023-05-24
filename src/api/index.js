import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";
const baseURL = isDevelopment ? process.env.DEV_BASE_URL : process.env.BASE_URL;

axios.defaults.baseURL = baseURL;

const handler = (callback) => callback.then(({ data }) => data);

const httpRequests = {
    get: (url) => handler(axios.get(url)),
    post: (url, body) => handler(axios.post(url, body)),
    patch: (url, body) => handler(axios.patch(url, body)),
    put: (url, body) => handler(axios.put(url, body)),
    delete: (url) => handler(axios.delete(url)),
    request: (options) => handler(axios.request(options)),
};

export default httpRequests;
