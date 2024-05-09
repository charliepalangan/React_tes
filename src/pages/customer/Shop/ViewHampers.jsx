import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { FaCartPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getHampersByIdWithKuota,
  getHampersKuota,
} from "../../../api/hampers/hampers_query";
import { getProdukByHampers } from "../../../api/produk/produk_query";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Hampers from "../../dashboard/ADMIN/Hampers/Hampers";
import { setProduk } from "../../../slicer/slicer_cartProduk";
import { setProduk as setProdukCheckout } from "../../../slicer/slicer_checkout";

const ViewHampers = () => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    return twoDaysAfterToday;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toStringDate = (date) => date.toISOString().split("T")[0];
  const location = useLocation();
  const [jumlah, setJumlah] = useState(0);
  const id = location.pathname.split("/")[2];

  const customer = localStorage.getItem("customer");

  const { data: ProdukData, isLoading: isLoadingProduk } = useQuery(
    ["produkInHampers", id],
    () => getProdukByHampers(id, toStringDate(startDate))
  );

  const { data: HampersData, isLoading: isLoadingHampers } = useQuery(
    ["hampers", id],
    () => getHampersByIdWithKuota(id, toStringDate(startDate))
  );

  const { data: kuotaHampers, isLoading: isLoadingKuotaHampers } = useQuery(
    ["kuotaHampers", id, toStringDate(startDate)],
    () => getHampersKuota(id, toStringDate(startDate))
  );

  const cart = useSelector((state) => state.cartProduk);
  const handleAddToCart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    const cartProduk = {
      key: "Hampers",
      Id: HampersData?.data.Id,
      Nama: HampersData?.data.Nama_Hampers,
      Harga: HampersData?.data.Harga,
      Gambar: HampersData?.data.Gambar,
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
    if (jumlah <= 0) {
      toast.error("Jumlah tidak boleh kurang dari 1");
      return;
    } else if (jumlah > HampersData?.data.Kuota) {
      toast.error("Melebihi kuota produk");
      return;
    } else if (startDate < twoDaysAfterToday) {
      toast.error("Tanggal pengiriman harus lebih dari 2 hari dari hari ini");
      return;
    }
    toast.success("Hampers berhasil ditambahkan ke keranjang");
    dispatch(setProduk(cartProduk));
  };

  console.log("Produk:", HampersData);

  const handlePreOrderorOrder = () => {
    dispatch(
      setProdukCheckout({
        key: "Hampers",
        Id: HampersData?.data.Id,
        Nama: HampersData?.data.Nama_Hampers,
        Harga: HampersData?.data.Harga,
        Gambar: HampersData?.data.Gambar,
        Jumlah: jumlah,
        Tanggal_Pengiriman: toStringDate(startDate),
      })
    );

    if (kuotaHampers?.Kuota === 0) {
      toast.error("Kuota Hampers Sudah Habis");
      return;
    }

    if (jumlah <= 0) {
      toast.error("Jumlah Hampers Tidak Boleh 0 atau Kurang dari 0");
      return;
    }

    if (jumlah > kuotaHampers?.Kuota) {
      toast.error("Jumlah Hampers Melebihi Kuota");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div>
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
                <a>Hampers</a>
              </li>
            </ul>
          </div>
          <div className="grid grid-row-2 gap-6 sm:grid-rows-2 lg:grid-cols-3">
            <div className="grid grid-span-1">
              {isLoadingHampers ? (
                <div className="skeleton w-full h-96"></div>
              ) : (
                <img
                  src={HampersData?.data.Gambar}
                  alt="gambar produk"
                  className="w-full h-96 object-cover"
                />
              )}
            </div>
            <div className="grid grid-span-1">
              <div className="flex flex-col">
                <div>
                  {isLoadingKuotaHampers ? (
                    <div className="skeleton h-4 w-28"></div>
                  ) : (
                    <div className="badge badge-success text-white p-4">
                      Kuota {kuotaHampers?.Kuota} Hampers
                    </div>
                  )}

                  {isLoadingHampers ? (
                    <div className="skeleton h-4 w-20 my-2"></div>
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {HampersData?.data.Nama_Hampers}
                    </h2>
                  )}

                  {isLoadingHampers ? (
                    <div className="skeleton h-4 w-24 my-2"></div>
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-800 my-4">
                      Rp. {HampersData?.data.Harga}
                    </h2>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700 font-bold">Deskripsi</label>

                  {isLoadingProduk ? (
                    <div className="flex flex-col gap-4">
                      <div className="skeleton h-4 w-40"></div>
                      <div className="skeleton h-4 w-48"></div>
                      <div className="skeleton h-4 w-36"></div>
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      {HampersData?.data.Deskripsi}
                    </p>
                  )}

                  {ProdukData?.data.map((item, index) => (
                    <div key={index} className="flex flex-row justify-between">
                      <label className="text-gray-700">{item.Nama}</label>
                      <label className="text-gray-700">{item.Jumlah}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {customer ? (
              <div className="grid grid-span-1">
                <div className="flex flex-col xl:flex-col gap-4 xl:justify-between">
                  <div>
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
                      <label className="text-gray-700">
                        Tanggal Pengiriman
                      </label>
                      <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start items-start md:justify-end md:items-end">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                        onClick={handlePreOrderorOrder}
                      >
                        Pre Order
                      </button>

                      <button
                        className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                        onClick={() => handleAddToCart()}
                      >
                        <FaCartPlus className="inline-block" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHampers;
