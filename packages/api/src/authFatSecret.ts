import axios, { AxiosBasicCredentials } from "axios";

export const authFatSecret = () => {
    const auth: AxiosBasicCredentials = {
        username: process.env.FATSECRET_CLIENT_ID ?? "",
        password: process.env.FATSECRET_CLIENT_SECRET ?? "",
    };
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const form = {
        grant_type: "client_credentials",
        scope: "basic premier barcode",
    };

    return axios.post("https://oauth.fatsecret.com/connect/token", form, {
        headers,
        auth,
    });
};
