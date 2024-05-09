import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getKategori = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.KATEGORI, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
