import "./pages/auth/Layout_Auth.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Layout from "./pages/auth/Layout_Auth.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NotFound from "./pages/not_found/NotFound.jsx";
import Index_Owner from "./pages/dashboard/OWNER/Index.jsx";
import Index_MO from "./pages/dashboard/MO/Index.jsx";
import Index_Admin from "./pages/dashboard/ADMIN/Index.jsx";
import Pengadaan_Bahan_Baku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/PengadaanBahanBaku.jsx";
import Hampers from "./pages/dashboard/ADMIN/Hampers/Hampers.jsx";
import Produk from "./pages/dashboard/ADMIN/Produk/Produk.jsx";
import Bahan_Baku from "./pages/dashboard/ADMIN/Bahan_Baku/Bahan_Baku.jsx";
import Penitip from "./pages/dashboard/MO/Penitip/Penitip.jsx";
import AdminRoutes from "./utils/AdminRoutes.jsx";
import MORoutes from "./utils/MORoutes.jsx";
import OwnerRoutes from "./utils/OwnerRoutes.jsx";
import Tambah_Edit_Hampers from "./pages/dashboard/ADMIN/Hampers/Tambah_Edit_Hampers.jsx";
import Tambah_Edit_PengadaanBahanBaku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/Tambah_Edit_PengadaanBahanBaku.jsx";
import Tambah_Edit_Bahan_Baku from "./pages/dashboard/ADMIN/Bahan_Baku/Tambah_Edit_Bahan_Baku.jsx";
import Tambah_Edit_Produk from "./pages/dashboard/ADMIN/Produk/Tambah_Edit_Produk.jsx";
import IsAuthRoute from "./utils/IsAuthRoute.jsx";
import Tambah_Edit_Penitip from "./pages/dashboard/MO/Penitip/Tambah_Edit_Penitip.jsx";
import Pengeluaran from "./pages/dashboard/MO/Pengeluaran/Pengeluaran.jsx";
import Tambah_Edit_Pengeluaran from "./pages/dashboard/MO/Pengeluaran/Tambah_Edit_Pengeluaran.jsx";
import Customer from "./pages/dashboard/ADMIN/Customer/Customer.jsx";
import History from "./pages/dashboard/ADMIN/History/History.jsx";
import HomePage_layout from "./pages/customer/HomePage_layout.jsx";
import Home from "./pages/customer/Home/Home.jsx";
import Shop from "./pages/customer/Shop/Shop.jsx";
import About from "./pages/customer/About/About.jsx";
import Contact from "./pages/customer/Contact/Contact.jsx";
import ViewProduk from "./pages/customer/Shop/ViewProduk.jsx";
import Checkout from "./pages/customer/Shop/Checkout.jsx";
import ForgotPassword from "./pages/customer/Forgot_Password/Forgot_Password.jsx";
import VerifyOTP from "./pages/customer/Forgot_Password/Verify_OTP.jsx";
import ResetPassword from "./pages/customer/Forgot_Password/Reset_Password.jsx";
import ViewHampers from "./pages/customer/Shop/ViewHampers.jsx";
import Pembelian from "./pages/customer/Pembelian/Pembelian.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage_layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Produk/:id" element={<ViewProduk />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Hampers/:id" element={<ViewHampers />} />
            <Route path="/Pembelian" element={<Pembelian />} />
          </Route>
          <Route path="/auth" element={<IsAuthRoute />}>
            <Route element={<Layout />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signinKaryawan" element={<SignIn />} />
            </Route>
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/Admin" element={<AdminRoutes />}>
              <Route path="/dashboard/Admin/" element={<Index_Admin />} />
              <Route path="/dashboard/Admin/produk" element={<Produk />} />
              <Route
                path="/dashboard/Admin/produk/:id"
                element={<Tambah_Edit_Produk />}
              />
              <Route
                path="/dashboard/Admin/produk/tambah"
                element={<Tambah_Edit_Produk />}
              />

              <Route path="/dashboard/Admin/hampers" element={<Hampers />} />
              <Route
                path="/dashboard/Admin/hampers/:id"
                element={<Tambah_Edit_Hampers />}
              />
              <Route
                path="/dashboard/Admin/hampers/tambah"
                element={<Tambah_Edit_Hampers />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku"
                element={<Bahan_Baku />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku/tambah"
                element={<Tambah_Edit_Bahan_Baku />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku/:id"
                element={<Tambah_Edit_Bahan_Baku />}
              />

        

              <Route path="/dashboard/Admin/customer" element={<Customer />} />
            </Route>

            <Route path="/dashboard/MO" element={<MORoutes />}>
              <Route path="/dashboard/MO/" element={<Index_MO />} />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku"
                element={<Pengadaan_Bahan_Baku />}
              />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku/:id"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />

              <Route
                path="/dashboard/MO/pengadaanBahanBaku/tambah"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />

              <Route path="/dashboard/MO/penitip" element={<Penitip />} />

              <Route
                path="/dashboard/MO/Penitip/tambah"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/MO/Penitip/:id"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/MO/pengeluaran"
                element={<Pengeluaran />}
              />

              <Route
                path="/dashboard/MO/pengeluaran/tambah"
                element={<Tambah_Edit_Pengeluaran />}
              />

              <Route
                path="/dashboard/MO/pengeluaran/:id"
                element={<Tambah_Edit_Pengeluaran />}
              />
            </Route>

            <Route path="/dashboard/Owner" element={<OwnerRoutes />}>
              <Route path="/dashboard/Owner/" element={<Index_Owner />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
