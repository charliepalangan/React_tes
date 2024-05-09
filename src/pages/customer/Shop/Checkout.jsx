import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeProduk, sortProduk } from "../../../slicer/slicer_checkout";
import { Poin } from "../../../utils/Poin";
import { getTanggalLahir } from "../../../api/customer/customer_query";
import { useQuery } from "react-query";
import { removeProduk as removeCart } from "../../../slicer/slicer_cartProduk";
import {
  getLatestNota,
  generateNoNota,
} from "../../../api/pesanan/pesanan_query";
import { pesanProduk } from "../../../api/pesanan/pesanan_query";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { AddDetailPemesanan } from "../../../api/detail_pesanan/detail_pesanan_query";

const Checkout = () => {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state?.checkout.Produk);
  const today = new Date();

  const month = today.getMonth() + 1;

  const { data: NoNota } = useQuery(["NoNota", month], () =>
    generateNoNota(month)
  );

  const customer = JSON.parse(localStorage.getItem("customer"));

  const { data: TanggalLahirData } = useQuery(
    ["tanggalLahir", customer.Email],
    () => getTanggalLahir(customer.Email)
  );

  const PoinCustomer = new Poin(TanggalLahirData?.Tanggal_Lahir);

  const isDoublePoin = PoinCustomer.doublePoints();

  useEffect(() => {
    dispatch(sortProduk());
  }, [dispatch]);

  const handleRemoveProduk = (date, index, itemToRemove) => {
    const itemsForDate = groupedByDate[date];

    if (itemsForDate) {
      if (itemsForDate[index]?.Id === itemToRemove.Id) {
        const globalIndex = checkout.findIndex(
          (item) =>
            item.Id === itemToRemove.Id && item.Tanggal_Pengiriman === date
        );
        console.log("Global index:", globalIndex);

        dispatch(removeProduk(globalIndex));
      }
    }
  };

  const groupedByDate = checkout.reduce((groups, item) => {
    const date = item.Tanggal_Pengiriman;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const calculateCostAndPoints = (items) => {
    const totalCost = items.reduce(
      (acc, curr) => acc + curr.Harga * curr.Jumlah,
      0
    );

    if (isDoublePoin) {
      const totalPoints = Poin.count(totalCost) * 2;
      return { totalCost, totalPoints };
    }

    const totalPoints = Poin.count(totalCost);
    return { totalCost, totalPoints };
  };

  const [openDates, setOpenDates] = useState({});
  const mutatePesanan = useMutation(pesanProduk, {
    onSuccess: () => {
      toast.success("Berhasil menambahkan pesanan");
    },
    onError: (error) => {
      toast.error("Gagal menambahkan pesanan");
    },
  });

  const mutateDetailPesanan = useMutation(AddDetailPemesanan, {
    onSuccess: () => {
      toast.success("Berhasil menambahkan detail pesanan");
    },
    onError: (error) => {
      toast.error("Gagal menambahkan detail pesanan");
      console.log(error);
    },
  });

  const toggleDateGroup = (date) => {
    setOpenDates((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };
  const toStringDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handlePesanan = (date, items, index) => {
    console.log(NoNota?.no_nota);
    console.log(`Handling order for date: ${date}`);
    console.log(`Items:`, items);
    const JsonItem = JSON.stringify(items);
    console.log(JsonItem);
    const dataToSend = {
      Id: NoNota?.no_nota,
      Total: calculateCostAndPoints(items).totalCost,
      Tanggal_Diambil: date,
      Tanggal_Pesan: toStringDate(today),
      Customer_Email: customer.Email,
      Poin_Didapat: calculateCostAndPoints(items).totalPoints,
    };
    console.log(dataToSend);

    mutatePesanan.mutate(dataToSend);

    for (let i = 0; i < items.length; i++) {
      if (items[i].key === "produk") {
        const dataDetail = {
          Pesanan_Id: NoNota?.no_nota,
          SubTotal: items[i].Harga * items[i].Jumlah,
          Total_Produk: items[i].Jumlah,
          Produk_Id: items[i].Id,
        };

        console.log(dataDetail);
        mutateDetailPesanan.mutate(dataDetail);
      }
      if (items[i].key === "Hampers") {
        const dataDetail = {
          Pesanan_Id: NoNota?.no_nota,
          SubTotal: items[i].Harga * items[i].Jumlah,
          Total_Produk: items[i].Jumlah,
          Hampers_Id: items[i].Id,
        };

        console.log(dataDetail);
        mutateDetailPesanan.mutate(dataDetail);
      }
    }

    for (let i = 0; i < items.length; i++) {
      dispatch(removeProduk(index));
    }

    for (let i = 0; i < items.length; i++) {
      dispatch(removeCart(items[i].Id));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4">
      <div className="p-2 lg:p-0 flex flex-col gap-4 w-full lg:w-1/3">
        {Object.entries(groupedByDate).map(([date, items], dateIndex) => {
          const { totalCost, totalPoints } = calculateCostAndPoints(items);

          return (
            <div
              key={dateIndex}
              className="collapse border border-base-300 bg-base-200 collapse-arrow"
            >
              <input
                type="checkbox"
                id={`collapse-${date}`}
                defaultChecked={openDates[date]}
                onChange={() => toggleDateGroup(date)}
                className="hidden"
              />
              <label
                htmlFor={`collapse-${date}`}
                className="collapse-title text-xl font-medium"
              >
                Pengiriman : <span className="font-bold">{date}</span>
              </label>

              <div className="collapse-content">
                {items.map((item, index) => (
                  <div key={index} className="card p-4 bg-gray-100 my-4">
                    <div className="flex flex-row items-center w-full">
                      <img
                        src={item.Gambar}
                        alt="gambar produk"
                        className="w-40"
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="text-md font-semibold">{item.Nama}</h3>
                        <h3 className="text-md font-normal">
                          Rp. {item.Harga}
                        </h3>
                        <h3 className="text-md font-normal">
                          Jumlah: {item.Jumlah} produk
                        </h3>
                      </div>
                      <div className="ml-auto">
                        <FaTrashAlt
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemoveProduk(date, index, item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex flex-row justify-between items-end">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold">
                      Total Pembayaran: Rp. {totalCost}
                    </h3>
                    <h3 className="text-md font-normal">{totalPoints} Poin</h3>
                  </div>
                  <button
                    className="btn btn-primary text-white"
                    onClick={() => handlePesanan(date, items, dateIndex)}
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
