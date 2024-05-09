import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "react-query";
import { getBahanBaku } from "../../../../api/bahan_baku/bahan_baku_query";
import {
  createPengadaanBahanBaku,
  updatePengadaanBahanBaku,
} from "../../../../api/pengadaan_bahan_baku/pengadaan_bahan_baku_query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../../slicer/slicer_IsEdit";

const Tambah_Edit_PengadaanBahanBaku = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const isEdit = useSelector((state) => state.isEdit.isEdit);
  const Pengadaan_edit = useSelector((state) => state.isEdit.item);

  const { data, isLoading } = useQuery("bahan_baku", getBahanBaku);

  const mutation = useMutation(createPengadaanBahanBaku);
  const mutationEdit = useMutation(updatePengadaanBahanBaku);
  const Navigate = useNavigate();
  const bahan_baku = data?.data;

  const changeDateFormate = (date) => {
    const newDate = new Date(date);
    const formatedDate = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
    return formatedDate;
  };

  const dispatch = useDispatch();

  const batalEdit = () => {
    dispatch(resetState());
    Navigate("/dashboard/MO/pengadaanBahanBaku");
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("BahanBaku_Id", data.BahanBaku_Id);
    formData.append("Harga", data.Harga);
    formData.append("Qty", data.Qty);
    formData.append("Satuan", data.Satuan);
    formData.append("Tanggal_Pengadaan", changeDateFormate(startDate));

    console.log(formData.get("Tanggal_Pengadaan"));

    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Pengadaan berhasil ditambahkan");
      Navigate("/dashboard/MO/pengadaanBahanBaku");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    console.log(data);
    data.Tanggal_Pengadaan = changeDateFormate(startDate);

    try {
      await mutationEdit.mutateAsync({ id: Pengadaan_edit.Id, data });
      toast.success("Pengadaan berhasil diubah");
      Navigate("/dashboard/MO/pengadaanBahanBaku");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setStartDate(new Date(Pengadaan_edit.Tanggal_Pengadaan));
    }
  }, []);

  return (
    <div>
      <div>
        <div className="card shadow-lg bg-base-100">
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">
              Tambah Hampers
            </h2>
          </div>
          <div className="card-body">
            <form
              onSubmit={isEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
            >
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Bahan Baku</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  required
                  defaultValue={isEdit ? Pengadaan_edit.BahanBaku_Id : ""}
                  {...register("BahanBaku_Id")}
                >
                  <option value={isEdit ? Pengadaan_edit.BahanBaku_Id : ""}>
                    {isEdit
                      ? Pengadaan_edit.BahanBaku_Nama
                      : "Pilih Bahan Baku"}
                  </option>
                  {bahan_baku?.map((item) => {
                    if (isEdit) {
                      if (item.Id != Pengadaan_edit.BahanBaku_Id) {
                        return (
                          <option key={item.Id} value={item.Id}>
                            {item.Nama}
                          </option>
                        );
                      }
                    } else {
                      return (
                        <option key={item.Id} value={item.Id}>
                          {item.Nama}
                        </option>
                      );
                    }
                  })}
                </select>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Harga</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                  defaultValue={isEdit ? Pengadaan_edit.Harga : 0}
                  {...register("Harga", { required: true })}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Jumlah</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                  defaultValue={isEdit ? Pengadaan_edit.Qty : 0}
                  {...register("Qty", { required: true })}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Satuan</span>
                </div>
                <input
                  type="text"
                  placeholder="Input Satuan"
                  className="input input-bordered w-full"
                  required
                  defaultValue={isEdit ? Pengadaan_edit.Satuan : ""}
                  {...register("Satuan", { required: true })}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold">
                    Tanggal Pengadaan
                  </span>
                </div>

                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="input input-bordered w-full"
                  dateFormat="dd/MM/yyyy"
                />
              </label>
              <div className="flex justify-end mt-5">
                <button
                  className="btn btn-error text-white mr-2"
                  onClick={
                    isEdit
                      ? batalEdit
                      : () => Navigate("/dashboard/MO/pengadaanBahanBaku")
                  }
                >
                  Batal
                </button>
                <button className="btn btn-primary text-white">
                  {isEdit ? "Edit" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Edit_PengadaanBahanBaku;
