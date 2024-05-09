import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getHampers } from "../../../../api/hampers/hampers_query";
import { useEffect } from "react";
import Modal_Delete from "../../../../components/Modal_Delete";
import {
  setItems,
  setModal,
  setModalKey,
} from "../../../../slicer/slicer_modal";
import { useDispatch } from "react-redux";
import { setItem, setOpen } from "../../../../slicer/slicer_DetailHampers";
import Modal_DetailHampers from "../../../../components/Modal_DetailHampers";
import { setIsEdit } from "../../../../slicer/slicer_IsEdit";
import { setItem as sethampers } from "../../../../slicer/slicer_IsEdit";
import { resetState } from "../../../../slicer/slicer_IsEdit";

const Hampers = () => {
  const {
    data: hampersData,
    isLoading,
    refetch,
  } = useQuery("hampers", getHampers);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHampers, setFilteredHampers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (hampersData && hampersData.data) {
      const filtered = hampersData.data.filter((hampers) =>
        hampers.Nama_Hampers.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHampers(filtered);
      setPage(1);
    }
  }, [hampersData, searchQuery]);

  const openModal = (item) => {
    dispatch(setModal(true));
    dispatch(setItems(item));
    dispatch(setModalKey("hampers"));
  };

  const openDetail = (item) => {
    dispatch(setItem(item));
    dispatch(setOpen(true));
  };

  const isEdit = (item) => {
    dispatch(sethampers(item));
    dispatch(setIsEdit(true));
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredHampers.length);

  const currentData = filteredHampers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredHampers.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Hampers</h1>
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
        <Link to="/dashboard/Admin/hampers/tambah">
          <button className="btn btn-success text-white mt-5">
            Tambah Hampers
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%", height:"70vh" }}>
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Gambar</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((hampers, index) => (
                      <tr key={index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>
                          <img
                            src={hampers.Gambar}
                            alt="gambar"
                            className="object-cover h-20 w-20 mx-auto"
                          />
                        </td>
                        <td>{hampers.Nama_Hampers}</td>
                        <td>{hampers.Harga}</td>
                        <td className="flex flex-col items-center justify-center flex-wrap space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:text-center">
                          <button
                            className="btn btn-sm btn-secondary text-white ml-2 w-20"
                            onClick={() => openDetail(hampers)}
                          >
                            Detail
                          </button>
                          <Link to={`/dashboard/Admin/hampers/${hampers.id}`}>
                            <button
                              className="btn btn-sm btn-primary text-base-100 ml-2 w-20"
                              onClick={() => isEdit(hampers)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-base-100 ml-2 w-20"
                            onClick={() => openModal(hampers)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                          <Modal_DetailHampers />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="join flex justify-center mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`join-item btn btn-square ${
                  index + 1 === page ? "btn-primary text-white" : ""
                }`}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hampers;