import Axios from "axios";
import { ADMIN_ROUTES, CUSTOMER_ROUTES } from "../../constant/Routes";

export const getProduk = async () => {

  const token = localStorage.getItem("token");
  const response = await Axios.get(ADMIN_ROUTES.PRODUK, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addProduk = async ({ data }) => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(ADMIN_ROUTES.PRODUK, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const editProduk = async ({ data, id }) => {
  const token = localStorage.getItem("token");

  const response = await Axios.post(`${ADMIN_ROUTES.PRODUK}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const deleteProduk = async (id) => {
  const token = localStorage.getItem("token");
  const response = await Axios.delete(`${ADMIN_ROUTES.PRODUK}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getProdukNonPenitipWithKuota = async (date) => {
  const date_ = date.queryKey[1];
  console.log(date_);
  const response = await Axios.get(`${CUSTOMER_ROUTES.GET_PRODUKNONPENITIPWITHKUOTA}/${date_}`);
  return response.data;
}

export const getKuotaProdukByIdAndDate = async (id, date) => {
  const response = await Axios.get(`${CUSTOMER_ROUTES.GET_KUOTAPRODUKBYIDANDDATE}/${id}/${date}`);
  return response.data;
}


export const getProdukByIdWithQuota = async (id, date) => {
  console.log(id, date);
  const response = await Axios.get(`${CUSTOMER_ROUTES.GET_GETPRODUKBYIDBYDATE}/${id}/${date}`);
  return response.data;
}

export const getProdukByHampers = async (id,date) => {
  const response = await Axios.get(`${CUSTOMER_ROUTES.GET_PRODUKBYHAMPERS}/${id}/${date}`);
  return response.data;
}


