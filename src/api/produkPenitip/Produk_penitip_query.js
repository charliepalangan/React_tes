import  Axios  from "axios";
import { CUSTOMER_ROUTES } from "../../constant/Routes";

export const getProdukPenitip = async () => {
  const response = await Axios.get(CUSTOMER_ROUTES.PRODUK_PENITIP);
  return response.data;
}