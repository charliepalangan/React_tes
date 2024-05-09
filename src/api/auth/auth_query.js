import Axios from "axios";
import { ROUTES } from "../../constant/Routes";

export const loginKaryawan = async ({ Nama, Password }) => {
    try {
        const res = await Axios.post(ROUTES.LOGIN, { Nama, Password });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const loginPelanggan = async ({ Email, Password }) => {
    try {
        const res = await Axios.post(ROUTES.LOGIN, { Email, Password });
        return res.data;
    } catch (error) {
        return error;
    }
}

export const registerCustomer = async (data) => {
    try {
        const res = await Axios.post(ROUTES.SIGNUPCUSTOMER, data);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const Logout = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await Axios.post(ROUTES.LOGOUT, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        return error;
    }
}
