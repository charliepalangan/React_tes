import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";


export const addPenitip = async ({data}) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.PENITIP, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editPenitip = async ({ data, id }) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.PENITIP}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deletePenitip = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.PENITIP}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const getPenitip = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.PENITIP, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
