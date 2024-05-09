import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";


export const getHistoryByEmail = async (customerEmail) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${ADMIN_ROUTES.HISTORY}/${customerEmail}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getAllHistory = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.HISTORY, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
