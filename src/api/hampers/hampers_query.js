import Axios from "axios";
import { ADMIN_ROUTES, CUSTOMER_ROUTES } from "../../constant/Routes";


export const getHampers = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.HAMPERS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const addHampers = async ({ data }) => {



    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.HAMPERS, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editHampers = async ({ data, id }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.HAMPERS}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const deleteHampers = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.HAMPERS}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getHampersWithKuota = async (date) => {
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_HAMPERSWITHKUOTA}/${date}`)
    return response.data;
}

export const getHampersByIdWithKuota = async (id, date) => {
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_HAMPERSBYIDWITHKUOTA}/${id}/${date}`)
    return response.data;
}

export const getProdukInHampersWithKuota = async (id, date) => {
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_PRODUKBYHAMPERS}/${id}/${date}`)
    return response.data;
}

export const getHampersKuota = async (id, date) => {
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_HAMPERSBYIDKUOTA}/${id}/${date}`)
    return response.data;
}
