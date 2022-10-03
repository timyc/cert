import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true, // may or may not need this
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default {
    // sample GET request
    /*
    getThing(a: string, b: number) {
        return apiClient.get("/PATH", {params: {p: a, q: b}});
    }
    */
    // sample POST request
    /*
    postThing(a: string, b: number) {
        return apiClient.post("/PATH", {p: a, q: b});
    }
    */
}