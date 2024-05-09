import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";

export const addBahanBaku = async ({data}) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.BAHAN_BAKU, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editBahanBaku = async ({ data, id }) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.BAHAN_BAKU}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deleteBahanBaku = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.BAHAN_BAKU}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getBahanBaku = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.BAHAN_BAKU, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}