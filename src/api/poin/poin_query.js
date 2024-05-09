import Axios from "axios";
import { CUSTOMER_ROUTES } from "../../constant/Routes";
export const getPoinPerCustomer = async (email) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_POINPERCUSTOMER}/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}