import Axios from "axios";

import { ROUTES } from "../../constant/Routes";


export const verifyOTP = async (data) => {
    try {
        const response = await Axios.post(ROUTES.VERIFY, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

