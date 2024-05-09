import { CUSTOMER_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getLatestNota = async (month) => {
    const token = localStorage.getItem("token");

    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_LATEST_NOTA}/${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const generateNoNota = async (month) => {
    const token = localStorage.getItem("token");

    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_NO_NOTA}/${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const pesanProduk = async (data) => {
    const token = localStorage.getItem("token");

    const res = await Axios.post(CUSTOMER_ROUTES.PESAN_PRODUK, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    return res.data;

}

