import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../slicer/slicer_history";
import { getHistoryByEmail } from "../api/history/history_query";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";


const Modal_History = () => {
  const stateHistory = useSelector((state) => state.History.item);
  const stateIsOpen = useSelector((state) => state.History.isOpen);

  const dispatch = useDispatch();

  const setOpen_Modal = (isOpen) => {
    dispatch(setOpen(isOpen));
  };

  const history = stateHistory;

  const {
    data: historyData,
    refetch,
    isLoading,
  } = useQuery(["detailHampers", history.Email], () =>
    getHistoryByEmail(history.Email)
  );

  console.log(historyData?.data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (stateIsOpen) {
    document.getElementById("modal_history").showModal();
  }
  return (
    <dialog id="modal_history" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen_Modal(false)}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">History Pesanan</h3>
        <div className="overflow-y-auto h-80">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Pesanan</th>
                <th>Status Pesanan </th>
                <th>Nama Customer</th>
                <th>Tanggal Pemesanan</th>
                <th>Tanggal Pelunasan</th>
                <th>Tanggal Pengambilan</th>
                <th>Bukti Pembayaran </th>
                <th>Status Pembayaran </th>
                <th>Alamat</th>
                <th>Nama Produk</th>
                <th>Nama Hampers</th>
                <th>Total</th>
                <th>Ongkos Kirim</th>
                <th>Tip</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="2">
                    <div className="h-full w-full flex justify-center items-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : historyData.data && historyData.data.length > 0 ? (
                historyData.data.map((history, index) => (
                  <tr key={history.Id} className="hover">
                    <td>{index + 1}</td>
                    <td>{history.Id}</td>
                    <td>{history.Status ? history.Status : "-"}</td>
                    <td>{history.Nama ? history.Nama : "-"}</td>
                    <td>
                      {history.Tanggal_Pesan ? history.Tanggal_Pesan : "-"}
                    </td>
                    <td>
                      {history.Tanggal_Pelunasan
                        ? history.Tanggal_Pelunasan
                        : "-"}
                    </td>
                    <td>
                      {history.Tanggal_Diambil ? history.Tanggal_Diambil : "-"}
                    </td>
                    <td>
                      {history.Bukti_Pembayaran
                        ? history.Bukti_Pembayaran
                        : "-"}
                    </td>
                    <td>
                      {history.Status_Pembayaran
                        ? history.Status_Pembayaran
                        : "-"}
                    </td>
                    <td>{history.Alamat ? history.Alamat : "-"}</td>
                    <td>{history.Nama_Produk ? history.Nama_Produk : "-"}</td>
                    <td>{history.Nama_Hampers ? history.Nama_Hampers : "-"}</td>
                    <td>{history.Total ? history.Total : "-"}</td>
                    <td>{history.Ongkos_Kirim ? history.Ongkos_Kirim : "-"}</td>
                    <td>{history.Tip ? history.Tip : "-"}</td>
                  </tr>
                ))
              ) : (
                // center the content if there is no data
                <tr>
                  <td colSpan="2">
                    <div className="h-full w-full flex justify-center items-center">
                      <span className="text-base-content-secondary">
                        No data
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default Modal_History;
