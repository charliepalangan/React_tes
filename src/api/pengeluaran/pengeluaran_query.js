import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";


export const addPengeluaran = async ({data}) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.PENGELUARAN, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editPengeluaran = async ({ data, id }) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.PENGELUARAN}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deletePengeluaran = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.PENGELUARAN}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const getPengeluaran = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.PENGELUARAN, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
