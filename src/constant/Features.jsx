import { FcViewDetails } from "react-icons/fc";
import { GiCakeSlice } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { BsFillBoxFill } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa"
import { FaHistory } from "react-icons/fa";
import { PiEggCrackFill } from "react-icons/pi"

export const ADMIN_FEATURES = {
  DASHBOARD: {
    name: "Dashboard",
    logo: <RxDashboard />,
    route: "/dashboard/admin/",
  },
  PRODUK: {
    name: "Produk",
    logo: <GiCakeSlice />,
    route: "/dashboard/admin/produk",
  },
  HAMPERS: {
    name: "Hampers",
    logo: <IoBag />,
    route: "/dashboard/admin/hampers",
  },
  BAHAN_BAKU: {
    name: "Bahan Baku",
    logo: <PiEggCrackFill />,
    route: "/dashboard/admin/bahan_baku",
  },
 
  CUSTOMER:{
    name: "Customer",
    logo: <IoPerson />,
    route: "/dashboard/admin/customer",
  },
  
};

export const MO_FEATURES = {
  DASHBOARD: {
    name: "Dashboard",
    logo: <RxDashboard />,
    route: "/dashboard/MO/",
  },
  PENGADAAN_BAHAN_BAKU: {
    name: "Pengadaan bahan baku",
    logo: <IoReceiptOutline />,
    route: "/dashboard/MO/pengadaanBahanBaku",
  },

  PENITIP: {
    name: "Penitip",
    logo: <BsFillBoxFill />,
    route: "/dashboard/MO/penitip",
  },
  PENGELUARAN:{
    name: "Pengeluaran",
    logo: <FaMoneyBillAlt/>,
    route: "/dashboard/MO/pengeluaran",
  },
};

export const OWNER_FEATURES = {
  LAPORAN: "Laporan",
};
