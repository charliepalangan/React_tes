import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getKategori } from "../../../api/kategori/kategori_query";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProdukNonPenitipWithKuota } from "../../../api/produk/produk_query";
import { updateFilter } from "../../../slicer/slicer_FIltered";
import { Link, useNavigate } from "react-router-dom";
import {
  setProduk,
  setType,
  resetStateView,
} from "../../../slicer/slicer_customer_view_produk";

import { Custom_Date } from "../../../utils/Date";

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filteredProdukData, setFilteredProdukData] = useState(null); // State to hold filtered products
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: KategoriData,
    isLoading: kategoriLoading,
    isError: kategoriError,
  } = useQuery("kategori", getKategori);
  const filter = useSelector((state) => state.Filter);

  useEffect(() => {
    dispatch(resetStateView());
  }, [dispatch]);

  const CustomerDate = new Custom_Date();

  const TwodaysAfterToday = CustomerDate.twoDaysAfterTodayToString();

  const {
    data: ProdukData,
    isLoading: produkLoading,
    isError: produkError,
  } = useQuery(["produk", TwodaysAfterToday], getProdukNonPenitipWithKuota);

  useEffect(() => {
    let filteredData = ProdukData?.data;

    if (filter.isFiltered) {
      filteredData = ProdukData?.data?.filter(
        (produk) => produk.Nama_Kategori === filter.Value
      );
    }

    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter((produk) =>
        produk.Nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProdukData(filteredData);
  }, [filter, ProdukData, searchQuery]);

  // Filter categories and products
  const Kategori = KategoriData?.data?.filter((item) => item.Id !== 4);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const handleCheckboxClick = (value) => {
    if (filter.Value === value) {
      dispatch(updateFilter({ isFiltered: false, Value: null }));
    } else {
      dispatch(updateFilter({ isFiltered: true, Value: value }));
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const loadingSkeleton = Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="w-full mx-auto rounded-md shadow-md overflow-hidden"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
        <div className=" w-2/3 h-4 bg-gray-300 animate-pulse px-5"></div>
        <div className=" w-1/2 h-4 bg-gray-300 animate-pulse mb-5"></div>
      </div>
    </div>
  ));

  const handleViewProduk = (id, Produk) => {
    console.log(id);
    dispatch(setProduk(Produk));

    if (Produk.Stok == 0) {
      dispatch(setType("Pre Order"));
    } else {
      dispatch(setType("Add to cart"));
    }

    navigate(`/Produk/${id}`);
  };

  return (
    <div className="flex justify-center content-center mx-2">
      <div className="container">
        <div className="relative mt-6 max-w-lg mx-auto">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <input
            className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-row-2 lg:grid-cols-6 gap-6 my-5">
          {/* Filter section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-4 rounded-md">
              <button
                onClick={toggleFilter}
                className="flex justify-between items-center w-full text-xl font-semibold"
              >
                <span>Filter</span>
                {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isFilterOpen && (
                <div className="mt-4">
                  <h1 className="text-lg font-semibold">Category</h1>
                  <div className="form-control">
                    {Kategori?.map((item, index) => (
                      <div key={index}>
                        <label className="cursor-pointer label">
                          <span className="label-text">{item.Kategori}</span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-secondary"
                            checked={filter.Value === item.Kategori}
                            onChange={() => handleCheckboxClick(item.Kategori)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:col-span-5 gap-6">
            {produkLoading
              ? loadingSkeleton
              : filteredProdukData?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full  mx-auto rounded-md shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105 focus:shadow-lg focus:scale-105"
                  >
                    <Link
                      to={`/Produk/${item.Id}`}
                      onClick={() => handleViewProduk(item.Id, item)}
                    >
                      <div
                        className="flex items-end justify-end h-56 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.Gambar})` }}
                      >
                        <button
                          className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md m-2"
                          onClick={() => handleViewProduk(item.Id, item)}
                        >
                          View
                        </button>
                      </div>
                      <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">{item.Nama}</h3>
                        <span className="text-gray-500 mt-2">
                          Rp. {item.Harga}
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-gray-500 mt-2">
                            Stok: {item.Stok}
                          </p>
                          <p className="text-gray-500 mt-2 ml-4">
                            Kuota: {item.Kuota}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
