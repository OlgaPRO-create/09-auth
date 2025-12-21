import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const nextServer = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default nextServer;