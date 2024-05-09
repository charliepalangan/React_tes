import Axios from "axios";

import { ROUTES } from "../../constant/Routes";


export const forgotPassword = async ({ email }) => {
    try {
        const response = await Axios.post(`${ROUTES.FORGOT}`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}
