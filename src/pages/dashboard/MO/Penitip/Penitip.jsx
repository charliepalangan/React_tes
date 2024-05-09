import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getPenitip } from "../../../../api/penitip/penitip_query";
import { useEffect } from "react";
import Modal_Delete from "../../../../components/Modal_Delete";

import {
  setItems,
  setModal,
  setModalKey,
} from "../../../../slicer/slicer_modal";

import { useDispatch } from "react-redux";
import { setIsEdit } from "../../../../slicer/slicer_IsEdit";
import { setItem as setPenitip } from "../../../../slicer/slicer_IsEdit";
import { resetState } from "../../../../slicer/slicer_IsEdit";


const Penitip = () => {

  const dispatch = useDispatch();

  const {
    data: penitipData,
    isLoading,
    refetch,
  } = useQuery("penitip", getPenitip);
    
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPenitip, setFilteredPenitip] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (penitipData && penitipData.data) {
      const filtered = penitipData.data.filter((penitip) =>
        penitip.Nama_Penitip.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPenitip(filtered);
      setPage(1);
    }
  }, [penitipData, searchQuery]);

  
  const openModal = (item) => {
    dispatch(setModal(true));
    dispatch(setItems(item));
    dispatch(setModalKey("penitip"));
  };



  const isEdit = (item) => {
    dispatch(setPenitip(item));
    dispatch(setIsEdit(true));
  };



  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredPenitip.length);

  const currentData = filteredPenitip.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPenitip.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Penitip</h1>
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
        <div>
        <Link to="/dashboard/MO/penitip/tambah">
          <button className="btn btn-success text-white mt-5">
            Tambah Penitip
          </button>
        </Link>
        </div>
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%", height: "70vh" }}>
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
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Komisi</th>
                      <th>Email</th>
                      <th>No Telpon</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((penitip, index) => (
                      <tr key={index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>{penitip.Id}</td>
                        <td>{penitip.Nama_Penitip}</td>
                        <td>{penitip.komisi}</td>
                        <td>{penitip.email}</td>
                        <td>{penitip.no_telp}</td>
                        <td>
                        <Link to={`/dashboard/MO/penitip/${penitip.id}`}>
                            <button
                              className="btn btn-sm btn-primary text-base-100 ml-2 w-20"
                              onClick={() => isEdit(penitip)}
                            >
                              Edit
                            </button>
                          </Link>
                        <button
                            className="btn btn-sm btn-error text-base-100 ml-2 w-20"
                            onClick={() => openModal(penitip)}
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
}

export default Penitip;