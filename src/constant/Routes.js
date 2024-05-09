

const BASEURL = "http://localhost:8000";
export const TOKEN = localStorage.getItem("token");

export const ROUTES = {
    LOGIN: BASEURL + "/api/login",
    REGISTER: BASEURL + "/api/register",
    FORGOT: BASEURL + "/api/forgot-password",
    VERIFY: BASEURL + "/api/verify/pin",
    RESET: BASEURL + "/api/reset-password",
    SIGNUPCUSTOMER: BASEURL + "/api/register_customer",
    LOGOUT: BASEURL + "/api/logout",
}


export const ADMIN_ROUTES = {
    PRODUK: BASEURL + "/api/produk",
    HAMPERS: BASEURL + "/api/hampers",
    DETAIL_HAMPERS: BASEURL + "/api/detail_hampers",
    PENITIP: BASEURL + "/api/penitip",
    KATEGORI: BASEURL + "/api/kategori",
    BAHAN_BAKU: BASEURL + "/api/bahan_baku",
    PENGELUARAN: BASEURL + "/api/pengeluaran",
    CUSTOMER: BASEURL + "/api/customer",
    HISTORY: BASEURL + "/api/history"
}

export const MO_ROUTES = {
    PENGADAAN_BAHAN_BAKU: BASEURL + "/api/pengadaan_bahan_baku",
}


export const CUSTOMER_ROUTES = {
    PRODUK_PENITIP: BASEURL + "/api/ProdukPenitip",
    GET_PRODUKNONPENITIPWITHKUOTA: BASEURL + "/api/produkNonPenitipWithKuota",
    GET_KUOTAPRODUKBYIDANDDATE: BASEURL + "/api/produkKuota",
    GET_GETPRODUKBYIDBYDATE: BASEURL + "/api/getProdukByIdWithQuota",
    GET_HAMPERSWITHKUOTA: BASEURL + "/api/getHampersWithProdukAndKuota",
    GET_PRODUKBYHAMPERS: BASEURL + "/api/getProdukInHampersWithKuota",
    GET_HAMPERSBYIDWITHKUOTA: BASEURL + "/api/getHampersByIdWithKuota",
    GET_HAMPERSBYIDKUOTA: BASEURL + "/api/getKuotaHampersById",
    GET_POINPERCUSTOMER: BASEURL + "/api/poin",
    GET_TanggalLahir: BASEURL + "/api/Tanggal_Lahir_Customer",
    GET_LATEST_NOTA: BASEURL + "/api/latestNota",
    GET_NO_NOTA: BASEURL + "/api/generateNoNota",
    PESAN_PRODUK: BASEURL + "/api/pesanProduk",
    DETAIL_PESANAN: BASEURL + "/api/AddDetailPemesanan",
}

export const OWNER_ROUTES = {
    LAPORAN: BASEURL + "/api/laporan",
}


export const ROUTES_HOMEPAGE = {
    HOME: {
        name: "Home",
        route: "/"
    },
    Shop: {
        name: "Shop",
        route: "/shop",
    },
    CONTACT: {
        name: "Contact",
        route: "/contact",
    },
    ABOUT: {
        name: "About",
        route: "/about",
    }
}