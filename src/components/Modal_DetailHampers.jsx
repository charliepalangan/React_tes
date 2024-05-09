import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../slicer/slicer_DetailHampers";
import { getDetailHampers } from "../api/detail_hampers/detail_hampers_query";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { getProduk } from "../api/produk/produk_query";

import { CiSquarePlus } from "react-icons/ci";
import { set, useForm } from "react-hook-form";
import { addDetailHampers } from "../api/detail_hampers/detail_hampers_query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteDetailHampers } from "../api/detail_hampers/detail_hampers_query";
import toast from "react-hot-toast";
import { setEdit } from "../slicer/slicer_tambahEditDetailHampers";
import { editDetailHampers } from "../api/detail_hampers/detail_hampers_query";

const Modal_DetailHampers = () => {
  const stateHampers = useSelector((state) => state.DetailHampers.item);
  const stateIsOpen = useSelector((state) => state.DetailHampers.isOpen);
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState(false);
  const [stateEdit, setStateEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});

  const doEdit = (item) => {
    setItemEdit(item);
    setStateEdit(true);
    console.log(itemEdit);
  };
  // console.log(stateEdit);
  const mutateDeleteDetailHampers = useMutation(deleteDetailHampers);
  const mutateEditDetailHampers = useMutation(editDetailHampers);

  const dispatch = useDispatch();
  const setOpen_Modal = (isOpen) => {
    dispatch(setOpen(isOpen));
    setState(isOpen);
    setStateEdit(false);
    reset();
  };

  const setIsInput = (state) => {
    setState(state);
    setStateEdit(false);
    reset();
  };

  const mutationAddDetailHampers = useMutation(addDetailHampers);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("Produk_Id", data.Produk_Id);
    formData.append("Jumlah", data.Jumlah);
    formData.append("Hampers_Id", stateHampers.Id);

    try {
      await mutationAddDetailHampers
        .mutateAsync({ data: formData })
        .then(() => {
          refetch();
        });
      reset();
      setState(false);
    } catch (error) {
      console.log(error);
    }
  };

  const hampers = stateHampers;

  const {
    data: detailHampers,
    refetch,
    isLoading,
  } = useQuery(["detailHampers", hampers.Id], () =>
    getDetailHampers(hampers.Id)
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { data: produk } = useQuery("produk", getProduk);

  const produkNonPenitip = produk?.data.filter(
    (item) => item.Penitip_Id == null || item.Penitip_Id == ""
  );

  const deleteDetail = async (id) => {
    await mutateDeleteDetailHampers
      .mutateAsync({
        Hampers_Id: hampers.Id,
        Produk_Id: id,
      })
      .then(() => {
        refetch();
      });
  };

  const updateDetail = async (data) => {
    console.log(data);
    const data_send = {
      Produk_Id: data.Produk_Id,
      Jumlah: data.Jumlah,
      Hampers_Id: hampers.Id,
    };
    await mutateEditDetailHampers
      .mutateAsync({
        data: data_send,
        Hampers_Id: hampers.Id,
        Produk_Id: itemEdit.Produk_Id,
      })
      .then(() => {
        refetch();
      }).catch((error) => {
        console.log(error);
      });
    setIsInput(false);
  };

  console.log(produkNonPenitip);
  console.log(detailHampers);

  if (stateIsOpen) {
    document.getElementById("modal_Detail_Hampers").showModal();
  }
  return (
    <dialog id="modal_Detail_Hampers" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen_Modal(false)}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Detail Isi Hampers</h3>
        <div className="overflow-y-auto h-80">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th className="text-center">Jumlah</th>
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
              ) : detailHampers && detailHampers.length > 0 ? (
                detailHampers.map((item) => (
                  <tr key={item.Id} className="hover">
                    <td>{item.Nama}</td>
                    <td className="text-center">{item.Jumlah}</td>
                    <td className="text-center">
                      <div className="flex flex-row justify-center items-center">
                        <button
                          className="btn btn-sm btn-success text-white"
                          onClick={() => {
                            doEdit(item);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-error text-white ml-2"
                          onClick={() => deleteDetail(item.Produk_Id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          {state || stateEdit ? (
            <form onSubmit={handleSubmit(stateEdit ? updateDetail : onSubmit)}>
              <div className="flex flex-row justify-end">
                <select
                  className="input input-ghost w-full"
                  required
                  {...register("Produk_Id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  defaultValue={stateEdit ? itemEdit.Id : ""}
                >
                  <option value={stateEdit ? itemEdit.Id : ""}>
                    {" "}
                    {stateEdit ? itemEdit.Nama : "Pilih Produk"}
                  </option>
                  {produkNonPenitip?.map((item) => {
                    const existingDetail = detailHampers?.find(
                      (detail) => detail.Produk_Id === item.Id
                    );

                    if (!existingDetail) {
                      return (
                        <option key={item.Id} value={item.Id}>
                          {item.Nama_Produk}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
                <input
                  type="number"
                  placeholder="Jumlah"
                  className="input input-bordered w-1/2 ml-2"
                  required
                  {...register("Jumlah", { required: true })}
                  defaultValue={stateEdit ? itemEdit.Jumlah : 0}
                />
              </div>

              <div>
                <button className="btn btn-sm btn-success text-white">
                  {stateEdit ? "Edit" : "Simpan"}
                </button>

                <button
                  className="btn btn-sm btn-error text-white ml-2 mt-2"
                  onClick={() => setIsInput(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <button
              // className="btn btn-sm btn-neutral text-white"
              onClick={() => setIsInput(true)}
            >
              <CiSquarePlus className="text-5xl btn btn-square " />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal_DetailHampers;
