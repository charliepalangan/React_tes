import Axios from "axios";
import { MO_ROUTES } from "../../constant/Routes";


export const getPengadaanBahanBaku = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(MO_ROUTES.PENGADAAN_BAHAN_BAKU, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const createPengadaanBahanBaku = async ({data}) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(MO_ROUTES.PENGADAAN_BAHAN_BAKU, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updatePengadaanBahanBaku = async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.put(`${MO_ROUTES.PENGADAAN_BAHAN_BAKU}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const deletePengadaanBahanBaku = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${MO_ROUTES.PENGADAAN_BAHAN_BAKU}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


