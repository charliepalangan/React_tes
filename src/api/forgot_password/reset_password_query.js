import Axios from "axios";

import { ROUTES } from "../../constant/Routes";


export const resetPassword = async ( data ) => {
    try {
        const response = await Axios.post(`${ROUTES.RESET}`, data );
        return response.data;
    } catch (error) {
        throw error;
    }
}
