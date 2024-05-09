import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";

export const getDetailHampers = async ( id ) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${ADMIN_ROUTES.DETAIL_HAMPERS}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const addDetailHampers = async ({ data }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.DETAIL_HAMPERS, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editDetailHampers = async ({ data, Hampers_Id, Produk_Id }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.put(`${ADMIN_ROUTES.DETAIL_HAMPERS}/${Hampers_Id}/${Produk_Id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.data;
}


export const deleteDetailHampers = async ({ Hampers_Id, Produk_Id }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.DETAIL_HAMPERS}/${Hampers_Id}/${Produk_Id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
