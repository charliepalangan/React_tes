import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { addProduk } from "../../../../api/produk/produk_query";
import { getKategori } from "../../../../api/kategori/kategori_query";
import { getPenitip } from "../../../../api/penitip/penitip_query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { editProduk } from "../../../../api/produk/produk_query";
import { resetState } from "../../../../slicer/slicer_IsEdit";

const Tambah_Edit_Produk = () => {
  const { register, handleSubmit } = useForm();

  const { data: kategori } = useQuery("kategori", getKategori);
  const { data: penitip } = useQuery("penitip", getPenitip);

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const produk = useSelector((state) => state.isEdit);

  console.log(produk);

  const mutation = useMutation(addProduk);
  const mutateEdit = useMutation(editProduk);

  const onSubmit = async (data) => {
    // console.log(data);
    if (data.Penitip_Id != "" && data.Stok == 0) {
      toast.error("Stok tidak boleh 0");
      return;
    }
    const formData = new FormData();
    formData.append("Nama", data.Nama);
    formData.append("Harga", data.Harga);
    formData.append("Stok", data.Stok);
    formData.append("Satuan", data.Satuan);
    formData.append("Kategori_Id", data.Kategori_Id);
    formData.append("Penitip_Id", data.Penitip_Id);
    formData.append("Gambar", data.Gambar[0]);

    console.log(formData);

    try {
      await mutation.mutateAsync({ data: formData });
      toast.success("Produk berhasil ditambahkan");
      Navigate("/dashboard/Admin/produk");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    // console.log(data);
    if (data.Penitip_Id != "" && data.Stok == 0) {
      toast.error("Stok tidak boleh 0");
      return;
    }
    const formData = new FormData();
    formData.append("Nama", data.Nama);
    formData.append("Harga", data.Harga);
    formData.append("Stok", data.Stok);
    formData.append("Satuan", data.Satuan);
    formData.append("Kategori_Id", data.Kategori_Id);
    formData.append("Penitip_Id", data.Penitip_Id);
    if (data.Gambar[0]) {
      formData.append("Gambar", data.Gambar[0]);
    }
    formData.append("_method", "PUT");

    try {
      await mutateEdit.mutateAsync({ data: formData, id: produk.item.Id });
      toast.success("Produk berhasil diubah");
      Navigate("/dashboard/Admin/produk");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const batalEdit = () => {
    dispatch(resetState());
    Navigate("/dashboard/Admin/produk");
  };

  console.log(kategori?.data);

  return (
    <div>
      <div className="card shadow-lg bg-base-100">
        <div className="card-header">
          <h2 className="card-title text-xl font-semibold ml-4 mt-5">
            {produk.isEdit ? "Edit Produk" : "Tambah Produk"}
          </h2>
        </div>
        <div className="card-body">
          <form
            onSubmit={
              produk.isEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)
            }
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Nama Produk</span>
              </div>
              <input
                type="text"
                placeholder="Input Nama Produk"
                className="input input-bordered w-full"
                defaultValue={produk.isEdit ? produk.item.Nama_Produk : ""}
                {...register("Nama", { required: true })}
                required
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
                defaultValue={produk.isEdit ? produk.item.Harga_Produk : 0}
                {...register("Harga", { required: true })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Stok</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                defaultValue={produk.isEdit ? produk.item.Stok_Produk : 0}
                {...register("Stok", { required: true })}
              />
            </label>

            <div className="grid grid-cols-3 gap-4 w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Satuan</span>
                </div>
                <input
                  type="text"
                  placeholder="Input Satuan"
                  className="input input-bordered w-full"
                  required
                  {...register("Satuan", { required: true })}
                  defaultValue={produk.isEdit ? produk.item.Satuan_Produk : ""}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Penitip</span>
                </div>
                <select
                  id="penitip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("Penitip_Id")}
                >
                  {!produk.isEdit || !produk.item.Penitip_Id ? (
                    <option value="">Pilih Penitip</option>
                  ) : (
                    <option value={produk.item.Penitip_Id}>
                      {produk.item.Penitip}
                    </option>
                  )}

                  {penitip?.data
                    .filter((item) => item.Id !== produk.item.Penitip_Id)
                    .map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.Nama_Penitip}
                      </option>
                    ))}
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Kategori</span>
                </div>
                <select
                  id="Kategori"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("Kategori_Id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option value={produk.item.Kategori_Id}>
                    {produk.isEdit
                      ? produk.item.Kategori
                        ? produk.item.Kategori
                        : "Pilih Kategori"
                      : "Pilih Kategori"}
                  </option>
                  {kategori?.data
                    .filter((item) => item.Id !== produk.item.Kategori_Id)
                    .map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.Kategori}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Gambar</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("Gambar")}
              />
            </label>

            <div className="flex justify-end mt-5">
              <button
                className="btn btn-error text-white mr-2"
                onClick={
                  produk.isEdit
                    ? batalEdit
                    : () => Navigate("/dashboard/Admin/produk")
                }
              >
                Batal
              </button>
              <button className="btn btn-primary text-white">
                {produk.isEdit ? "Edit" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Edit_Produk;
