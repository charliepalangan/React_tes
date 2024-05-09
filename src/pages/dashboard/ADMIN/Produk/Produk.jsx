import { useEffect, useState } from "react";
import { getProduk } from "../../../../api/produk/produk_query";
import { useQuery } from "react-query";
import {
  setItems,
  setModal,
  setModalKey,
} from "../../../../slicer/slicer_modal";
import { useDispatch } from "react-redux";
import Modal_Delete from "../../../../components/Modal_Delete";
import { Link } from "react-router-dom";
import { setIsEdit, setItem } from "../../../../slicer/slicer_IsEdit";
import { resetState } from "../../../../slicer/slicer_IsEdit";
const Produk = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "produk",
    queryFn: getProduk,
  });

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const set_Items = (data) => dispatch(setItems(data));
  const set_Modal = (data) => dispatch(setModal(data));
  const set_ModalKey = (data) => dispatch(setModalKey(data));

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const openModal = (item) => {
    set_Modal(true);
    set_Items(item);
    set_ModalKey("produk");
  };

  const set_setIsEdit = (data) => dispatch(setIsEdit(data));
  const set_setItem = (data) => dispatch(setItem(data));

  const Edit = (data) => {
    set_setIsEdit(true);
    set_setItem(data);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log(data?.data);

  const cake = data?.data?.filter(
    (item) => item.Kategori === "Cake" && item.Penitip == null
  );
  const minuman = data?.data?.filter(
    (item) => item.Kategori === "Minuman" && item.Penitip == null
  );
  const roti = data?.data?.filter(
    (item) => item.Kategori === "Roti" && item.Penitip == null
  );
  const titipan = data?.data?.filter((item) => item.Penitip !== null);

  const filterCake = cake?.filter((item) =>
    item.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterMinuman = minuman?.filter((item) =>
    item.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterRoti = roti?.filter((item) =>
    item.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterTitipan = titipan?.filter((item) =>
    item.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Produk</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-60 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Link to="/dashboard/Admin/produk/tambah">
          <button className="btn btn-success text-white mt-5">
            Tambah Produk
          </button>
        </Link>
      </div>
      <div className="w-full mt-5 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-3">
        <div
          className="card shadow-lg bg-base-100 overflow-hidden lg:mt-5 lg:row-span-2"
          style={{ height: "100vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">Cake</h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filterCake?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga_Produk}</td>
                        <td>{item.Stok_Produk}</td>
                        <td className="flex justify-center">
                          <Link to={`/dashboard/Admin/produk/${item.Id}`}>
                            <button
                              className="btn btn-sm btn-primary text-white mr-2"
                              onClick={() => Edit(item)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => openModal(item)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5 "
          style={{ height: "50vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">
              Minuman
            </h2>
          </div>

          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filterMinuman?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga_Produk}</td>
                        <td>{item.Stok_Produk}</td>
                        <td className="flex justify-center">
                          <Link to={`/dashboard/Admin/produk/${item.Id}`}>
                            <button
                              className="btn btn-sm btn-primary text-white mr-2"
                              onClick={() => Edit(item)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-white "
                            onClick={() => openModal(item)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5"
          style={{ height: "50vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">Roti</h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama_Produk</th>
                      <th>Harga_Produk</th>
                      <th>Stok_Produk</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filterRoti?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga_Produk}</td>
                        <td>{item.Stok_Produk}</td>
                        <td className="flex justify-center">
                          <Link to={`/dashboard/Admin/produk/${item.Id}`}>
                            <button
                              className="btn btn-sm btn-primary text-white mr-2"
                              onClick={() => Edit(item)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => openModal(item)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5 lg:mt-0 lg:col-span-2"
          style={{ height: "49vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">
              Produk Titip
            </h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th>Penitip</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filterTitipan?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga_Produk}</td>
                        <td>{item.Stok_Produk}</td>
                        <td>{item.Penitip}</td>
                        <td className="flex justify-center">
                          <Link to={`/dashboard/Admin/produk/${item.Id}`}>
                            <button
                              className="btn btn-sm btn-primary text-white mr-2"
                              onClick={() => Edit(item)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => openModal(item)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produk;
