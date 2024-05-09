import Axios from "axios";
import { CUSTOMER_ROUTES } from "../../constant/Routes";

export const AddDetailPemesanan = async (data) => {
    const token = localStorage.getItem("token");
    const res = await Axios.post(CUSTOMER_ROUTES.DETAIL_PESANAN, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}