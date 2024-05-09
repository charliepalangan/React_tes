import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addPenitip, editPenitip } from "../../../../api/penitip/penitip_query";
import toast from "react-hot-toast";

const Tambah_Edit_Penitip = () => {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(addPenitip);
  const Navigate = useNavigate();
  const penitip = useSelector((state) => state.isEdit.item);
  const isEdit = useSelector((state) => state.isEdit.isEdit);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Penitip", data.Nama_Penitip);
    formData.append("email", data.email);
    formData.append("no_telp", data.no_telp);

    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Penitip Berhasil Ditambahkan");
      Navigate("/dashboard/MO/penitip");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Penitip", data.Nama_Penitip);
    formData.append("email", data.email);
    formData.append("no_telp", data.no_telp);

    formData.append("_method", "PUT");

    try {
      await editPenitip({ data: formData, id: penitip.Id }).then(() => {
        toast.success("Penitip berhasil diubah");
        Navigate("/dashboard/MO/penitip");
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="card shadow-lg bg-base-100">
        <div className="card-header">
          <h2 className="card-title text-xl font-semibold ml-4 mt-5">
          {isEdit ? 'Edit Penitip' : 'Tambah Penitip'}
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
                placeholder="Nama Penitip"
                className="input input-bordered w-full"
                required
                {...register("Nama_Penitip", { required: true })}
                defaultValue={isEdit ? penitip.Nama_Penitip : ""}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Email</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
                {...register("email", { required: true })}
                defaultValue={isEdit ? penitip.email : ""}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Nomor Telepon</span>
              </div>
              <input
                type="text"
                placeholder="Nomor Telepon"
                className="input input-bordered w-full"
                required
                {...register("no_telp", { required: true })}
                defaultValue={isEdit ? penitip.no_telp : ""}
              />
            </label>
            {isEdit && (
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                  {...register("email", { required: true })}
                  defaultValue={isEdit ? penitip.email : ""}
                />
              </label>
            )}
            {isEdit && (
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Nomor Telepon</span>
                </div>
                <input
                  type="number"
                  placeholder="Nomor Telepon"
                  className="input input-bordered w-full"
                  required
                  {...register("no_telp", { required: true })}
                  defaultValue={isEdit ? penitip.no_telp : ""}
                />
              </label>
            )}
            <div className="flex justify-end mt-5">
              <button className="btn btn-error text-white mr-2" onClick={() => Navigate("/dashboard/MO/penitip")}>
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
  );
};

export default Tambah_Edit_Penitip;
