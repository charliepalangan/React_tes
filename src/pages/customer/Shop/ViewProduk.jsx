import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { useQuery } from "react-query";
import {
  getKuotaProdukByIdAndDate,
  getProdukByIdWithQuota,
} from "../../../api/produk/produk_query";
import { FaCartPlus } from "react-icons/fa";
import { setProduk } from "../../../slicer/slicer_cartProduk";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { setProduk as setProdukCheckout } from "../../../slicer/slicer_checkout";

const ViewProduk = () => {
  const [Produk_Provider, setProduk_Provider] = useState(null);
  const Produk = useSelector((state) => state.customer_view_produk.produk);
  const type = useSelector((state) => state.customer_view_produk.type);
  const customer = localStorage.getItem("customer");

  const [jumlah, setJumlah] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    if (type === "produkPenitip" || type === "Add to cart") {
      return today;
    }
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    return twoDaysAfterToday;
  });

  const cart = useSelector((state) => state.cartProduk);
  const [kuotaProduk_, setKuotaProduk] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // Convert date to string in YYYY-MM-DD format
  const toStringDate = (date) => date.toISOString().split("T")[0];

  // Query for ProdukData
  const { data: ProdukData } = useQuery(
    ["produk", id, toStringDate(startDate)],
    () => getProdukByIdWithQuota(id, toStringDate(startDate)),
    {
      enabled: Produk?.Id ? false : true, // Enable query if Produk is empty
    }
  );

  // Use effect to update Produk_Provider when ProdukData or Produk changes
  useEffect(() => {
    if (ProdukData) {
      setProduk_Provider(ProdukData.data);
    } else if (Produk) {
      setProduk_Provider(Produk);
    }
  }, [ProdukData, Produk]);

  // Query for kuotaProduk
  const { data: kuotaProduk } = useQuery(
    ["kuota", Produk_Provider?.Id || id, toStringDate(startDate)],
    () =>
      getKuotaProdukByIdAndDate(
        Produk_Provider?.Id || id,
        toStringDate(startDate)
      ),
    {
      //enable when customer is not null
      enabled:
        !(type === "produkPenitip" || type === "Add to cart") || !customer,
    }
  );

  // Update kuotaProduk_ state
  useEffect(() => {
    if (kuotaProduk) {
      setKuotaProduk(kuotaProduk.Kuota);
      if (kuotaProduk.Kuota === 0) {
        toast.error("Produk sudah habis");
      }
    }
  }, [kuotaProduk]);

  const handleCheckoutProduk = () => {
    dispatch(
      setProdukCheckout({
        key: "produk",
        Id: Produk_Provider.Id || Produk_Provider.Id_Produk,
        Nama: Produk_Provider.Nama || Produk_Provider.Nama_Produk,
        Harga: Produk_Provider.Harga || Produk_Provider.Harga_Produk,
        Gambar: Produk_Provider.Gambar || Produk_Provider.Gambar_Produk,
        Jumlah: jumlah,
        Tanggal_Pengiriman: toStringDate(startDate),
      })
    );

    navigate("/Checkout");
  };

  const handlePreOrderorOrder = (Produk) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    if (Produk_Provider.Stok === 0) {
      if (startDate < twoDaysAfterToday) {
        toast.error("Tanggal pengiriman harus lebih dari 2 hari dari hari ini");
        return;
      }
      if (jumlah > kuotaProduk_) {
        toast.error("Kuota Produk Sudah Habis");
        return;
      }
      if (jumlah <= 0) {
        toast.error("Jumlah Produk Tidak Boleh 0 atau Kurang dari 0");
        return;
      }
      handleCheckoutProduk();
    } else {
      if (jumlah <= 0) {
        toast.error("Jumlah Produk Tidak Boleh 0 atau Kurang dari 0");
        return;
      }
      if (Produk_Provider.Stok < jumlah || Produk_Provider.Stok_Produk < jumlah) {
        toast.error("Stok Produk Tidak Cukup");
        return;
      }
      toast.success("Order Berhasil");
      handleCheckoutProduk();
    }
  };

  const handleAddToCart = (Produk_Provider) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    const cartProduk = {
      key: "produk",
      Id: Produk_Provider.Id || Produk_Provider.Id_Produk,
      Nama: Produk_Provider.Nama || Produk_Provider.Nama_Produk,
      Harga: Produk_Provider.Harga || Produk_Provider.Harga_Produk,
      Gambar: Produk_Provider.Gambar || Produk_Provider.Gambar_Produk,
      Jumlah: jumlah,
      Tanggal_Pengiriman: toStringDate(startDate),
    };

    // Check if the product is already in the cart
    const isProdukInCart = cart.Produk.some(
      (item) => item.Id === cartProduk.Id
    );
    if (isProdukInCart) {
      toast.error("Produk sudah ada di keranjang");
      return;
    }
    if (type === "Pre Order") {
      if (jumlah > kuotaProduk_) {
        toast.error("Kuota Produk Sudah Habis");
        return;
      }
      if (jumlah <= 0) {
        toast.error("Jumlah Produk Tidak Boleh 0 atau Kurang dari 0");
        return;
      }
      if (startDate < twoDaysAfterToday) {
        toast.error("Tanggal pengiriman harus lebih dari 2 hari dari hari ini");
        return;
      }
    } else {
      if (jumlah <= 0) {
        toast.error("Jumlah Produk Tidak Boleh 0 atau Kurang dari 0");
        return;
      }
    }
    toast.success("Produk berhasil ditambahkan ke keranjang");
    dispatch(setProduk(cartProduk));
  };

  const navigate = useNavigate();

  // Render view
  return (
    <div>
      <div className="container mx-auto px-6">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a>Produk</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-row-2 gap-6 sm:grid-rows-2 lg:grid-cols-2">
          <div className="grid grid-span-1">
            <img
              src={Produk_Provider?.Gambar}
              alt="gambar produk"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="grid grid-span-1">
            <div className="flex flex-col justify-between">
              <div>
                {type === "produkPenitip" || type === "Add to cart" ? (
                  <div className="badge badge-success text-white p-4">
                    Stok {Produk_Provider?.Stok_Produk || Produk_Provider?.Stok}{" "}
                    Produk
                  </div>
                ) : (
                  <div className="badge badge-success text-white p-4">
                    Kuota {kuotaProduk_} Produk
                  </div>
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {Produk_Provider?.Nama || Produk_Provider?.Nama_Produk}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800 my-4">
                  Rp. {Produk_Provider?.Harga || Produk_Provider?.Harga_Produk}
                </h2>
              </div>
              {customer ? (
                <div className="flex flex-col xl:flex-row gap-4">
                  <div className="flex flex-col gap-4">
                    <label className="text-gray-700">Jumlah</label>
                    <input
                      type="number"
                      className="p-2 border border-gray-300 rounded-md"
                      value={jumlah}
                      onChange={(e) => setJumlah(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-gray-700">Tanggal Pengiriman</label>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-start items-start md:justify-end md:items-end">
                    <div className="grid grid-cols-2 gap-2">
                      {Produk_Provider?.Stok === 0 ? (
                        <button
                          className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                          onClick={() => handlePreOrderorOrder(Produk_Provider)}
                        >
                          Pre Order
                        </button>
                      ) : (
                        <button
                          className="block text-center w-full p-3 mt-4 bg-primary text-white uppercase font-semibold rounded"
                          onClick={() => handlePreOrderorOrder(Produk_Provider)}
                        >
                          Buy
                        </button>
                      )}
                      <button
                        className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                        onClick={() => handleAddToCart(Produk_Provider)}
                      >
                        <FaCartPlus className="inline-block" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduk;
