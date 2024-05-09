import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addPengeluaran, editPengeluaran } from "../../../../api/pengeluaran/pengeluaran_query";
import toast from "react-hot-toast";

const Tambah_Edit_Pengeluaran = () => {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(addPengeluaran);
  const Navigate = useNavigate();
  const pengeluaran = useSelector((state) => state.isEdit.item);
  const isEdit = useSelector((state) => state.isEdit.isEdit);



  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Pengeluaran", data.Nama_Pengeluaran);
    formData.append("Harga", data.Harga);
    formData.append("Satuan", data.Satuan);
    formData.append("Qty", data.Qty);
    
    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Pengeluaran Berhasil Ditambahkan");
      Navigate("/dashboard/Admin/pengeluaran");
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Pengeluaran", data.Nama_Pengeluaran);
    formData.append("Harga", data.Harga);
    formData.append("Satuan", data.Satuan);
    formData.append("Qty", data.Qty);

    formData.append("_method", "PUT");
    
    
    try {
      await editPengeluaran({ data: formData, id: pengeluaran.Id }).then(() => {
        toast.success("Pengeluaran berhasil diubah");
        Navigate("/dashboard/Admin/pengeluaran");
      });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <div className="card shadow-lg bg-base-100">
        <div className="card-header">
          <h2 className="card-title text-xl font-semibold ml-4 mt-5">
           {isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={isEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Nama</span>
              </div>
              <input
                type="text"
                placeholder="Nama Pengeluaran"
                className="input input-bordered w-full"
                required
                {...register("Nama_Pengeluaran", { required: true })}
                defaultValue={isEdit ? pengeluaran.Nama_Pengeluaran : ""}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Harga</span>
              </div>
              <input
                type="number"
                placeholder="Harga"
                className="input input-bordered w-full"
                required
                {...register("Harga", { required: true })}
                defaultValue={isEdit ? pengeluaran.Harga : 0}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Satuan</span>
              </div>
              <input
                type="text"
                placeholder="Satuan"
                className="input input-bordered w-full"
                required
                {...register("Satuan", { required: true })}
                defaultValue={isEdit ? pengeluaran.Satuan : ""}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Qty</span>
              </div>
              <input
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full"
                required
                {...register("Qty", { required: true })}
                defaultValue={isEdit ? pengeluaran.Qty : 0}
              />
            </label>

            <div className="flex justify-end mt-5">
              <button className="btn btn-error text-white mr-2" onClick={() => Navigate("/dashboard/Admin/pengeluaran")}>
                Batal</button>
              <button className="btn btn-primary text-white">{isEdit ? "Edit" : "Tambah"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Edit_Pengeluaran;