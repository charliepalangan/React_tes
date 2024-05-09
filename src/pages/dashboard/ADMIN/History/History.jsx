import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getCustomer } from "../../../../api/customer/customer_query";
import { useEffect } from "react";
import { setItem, setOpen } from "../../../../slicer/slicer_history";
import { useDispatch } from "react-redux";
import { resetState } from "../../../../slicer/slicer_history";
import Modal_History from "../../../../components/Modal_History";

const History = () => {

  const dispatch = useDispatch();

  const {
    data: customerData,
    isLoading,
    refetch,
  } = useQuery("customer", getCustomer);
    
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (customerData && customerData.data) {
      const filtered = customerData.data.filter((customer) =>
        customer.Nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCustomer(filtered);
      setPage(1);
    }
  }, [customerData, searchQuery]);

  const openHistory = (item) => {
    dispatch(setItem(item));
    dispatch(setOpen(true));
  };

 

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredCustomer.length);

  const currentData = filteredCustomer.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCustomer.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">History Pesanan Customer</h1>
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
                      <th>Email</th>
                      <th>Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((customer, index) => (
                      <tr key={index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>{customer.Email}</td>
                        <td>{customer.Nama}</td>
                        <td>
                        <button
                            className="btn btn-sm btn-primary text-white ml-2 w-40"
                            onClick={() => openHistory(customer)}
                          >
                            History Pesanan
                          </button>
                          <Modal_History />  
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

export default History;