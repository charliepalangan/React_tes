import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addHampers, editHampers } from "../../../../api/hampers/hampers_query";
import toast from "react-hot-toast";

const Tambah_Edit_Hampers = () => {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(addHampers);
  const Navigate = useNavigate();
  const hampers = useSelector((state) => state.isEdit.item);
  const isEdit = useSelector((state) => state.isEdit.isEdit);




  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Hampers", data.Nama_Hampers);
    formData.append("Harga", data.Harga);
    formData.append("Gambar", data.Gambar[0]);

    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Hampers Berhasil Ditambahkan");
      Navigate("/dashboard/Admin/hampers");
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("Nama_Hampers", data.Nama_Hampers);
    formData.append("Harga", data.Harga);
    if(data.Gambar[0] != undefined){
      formData.append("Gambar", data.Gambar[0]);
    }
    formData.append("_method", "PUT");
    
    

    try {
      await editHampers({ data: formData, id: hampers.Id }).then(() => {
        toast.success("Hampers berhasil diubah");
        Navigate("/dashboard/Admin/hampers");
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
          {isEdit ? 'Edit Hampers' : 'Tambah Hampers'}
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
                placeholder="Input Nama Hampers"
                className="input input-bordered w-full"
                required
                {...register("Nama_Hampers", { required: true })}
                defaultValue={isEdit ? hampers.Nama_Hampers : ""}
              />
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
                {...register("Harga", { required: true })}
                defaultValue={isEdit ? hampers.Harga : 0}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-bold">Gambar</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("Gambar")}

              />
              
            </label>

            <div className="flex justify-end mt-5">
              <button className="btn btn-error text-white mr-2" onClick={() => Navigate("/dashboard/Admin/hampers")}>
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
