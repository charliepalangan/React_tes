import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addBahanBaku, editBahanBaku } from "../../../../api/bahan_baku/bahan_baku_query";
import toast from "react-hot-toast";

const Tambah_Edit_Hampers = () => {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(addBahanBaku);
  const Navigate = useNavigate();
  const bahan = useSelector((state) => state.isEdit.item);
  const isEdit = useSelector((state) => state.isEdit.isEdit);



  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Nama", data.Nama);
    formData.append("Qty", data.Qty);
    formData.append("Satuan", data.Satuan);

    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Bahan Baku Berhasil Ditambahkan");
      Navigate("/dashboard/Admin/bahan_baku");
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("Nama", data.Nama);
    formData.append("Qty", data.Qty);
    formData.append("Satuan", data.Satuan);

    formData.append("_method", "PUT");
    
    
    try {
      await editBahanBaku({ data: formData, id: bahan.Id }).then(() => {
        toast.success("Bahan Baku berhasil diubah");
        Navigate("/dashboard/Admin/bahan_baku");
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
          {isEdit ? 'Edit Bahan Baku' : 'Tambah Bahan Baku'}
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
                placeholder="Nama Bahan Baku"
                className="input input-bordered w-full"
                required
                {...register("Nama", { required: true })}
                defaultValue={isEdit ? bahan.Nama : ""}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Stok</span>
              </div>
              <input
                type="number"
                placeholder="Stok Bahan Baku"
                className="input input-bordered w-full"
                required
                {...register("Qty", { required: true })}
                defaultValue={isEdit ? bahan.Qty : 0}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Satuan</span>
              </div>
              <input
                type="text"
                placeholder="Satuan Bahan Baku"
                className="input input-bordered w-full"
                required
                {...register("Satuan", { required: true })}
                defaultValue={isEdit ? bahan.Satuan : ""}
              />
            </label>

            <div className="flex justify-end mt-5">
              <button className="btn btn-error text-white mr-2" onClick={() => Navigate("/dashboard/Admin/bahan_baku")}>
                Batal</button>
              <button className="btn btn-primary text-white">{isEdit ? "Edit" : "Tambah"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Edit_Hampers;
