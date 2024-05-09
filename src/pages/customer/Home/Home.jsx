import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../slicer/slicer_FIltered";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Roti from "../../../assets/roti.avif";
import Minuman from "../../../assets/minuman.avif";
import Cake from "../../../assets/cake.avif";
import { getProdukPenitip } from "../../../api/produkPenitip/Produk_penitip_query";
import { useSelector } from "react-redux";
import {
  resetStateView,
  setProduk,
  setType,
} from "../../../slicer/slicer_customer_view_produk";
import { Custom_Date } from "../../../utils/Date";
import { getHampersWithKuota } from "../../../api/hampers/hampers_query";

const Home = () => {
  const CustomerDate = new Custom_Date();
  const twoDaysAfterToday = CustomerDate.twoDaysAfterTodayToString();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States for search query and items to show
  const [searchQuery, setSearchQuery] = useState("");
  // Create separate state variables for items to show in hampers and produk penitip
  const [itemsToShowHampers, setItemsToShowHampers] = useState(5);
  const [itemsToShowProduk, setItemsToShowProduk] = useState(5);

  // Queries
  const { data: produkPenitipData, isLoading: isProdukLoading } = useQuery(
    "produkPenitip",
    getProdukPenitip
  );
  const { data: hampersData, isLoading: isHampersLoading } = useQuery(
    ["hampers", twoDaysAfterToday],
    () => getHampersWithKuota(twoDaysAfterToday)
  );

  // Filter the data based on the search query
  const filteredHampersData = hampersData?.data?.filter((hamper) =>
    hamper.Nama_Hampers.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProdukData = produkPenitipData?.data?.filter((produk) =>
    produk.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers for search and view actions
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handlers to load more items in hampers and produk penitip
  const loadMoreItemsHampers = () => {
    setItemsToShowHampers((prev) => prev + 5);
  };

  const loadMoreItemsProduk = () => {
    setItemsToShowProduk((prev) => prev + 5);
  };

  useEffect(() => {
    dispatch(setFilter({ isFiltered: false, Value: "" }));
    dispatch(resetStateView());
  }, [dispatch]);

  const handleViewProduk = (item, Type) => {
    dispatch(setType(Type));
    dispatch(setProduk(item));
    navigate(`/Produk/${item.Id}`);
  };

  const handleViewHampers = (item, Type) => {
    dispatch(setType(Type));
    dispatch(setProduk(item));
    navigate(`/Hampers/${item.Id}`);
  };

  const handleFilter = (Value) => {
    dispatch(setFilter({ isFiltered: true, Value: Value }));
    navigate("/shop");
  };

  return (
    <div>
      <div className="container mx-auto px-6">
        {/* Search bar */}
        <div className="relative mt-6 max-w-lg mx-auto mb-4">
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
            placeholder="Search Hampers & Penitip"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Hero section for Cake */}
        <div
          className="h-64 rounded-md overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${Cake})`,
            backgroundPosition: "center 25%",
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Cake</h2>
              <button
                className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                onClick={() => handleFilter("Cake")}
              >
                <span>Shop Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Minuman and Roti sections */}
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
            style={{
              backgroundImage: `url(${Minuman})`,
              backgroundPosition: "center 25%",
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Minuman</h2>
                <button
                  className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                  onClick={() => handleFilter("Minuman")}
                >
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
            style={{
              backgroundImage: `url(${Roti})`,
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Roti</h2>
                <button
                  className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                  onClick={() => handleFilter("Roti")}
                >
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hampers section */}
        <div className="mt-16">
          <h3 className="text-gray-600 text-2xl font-medium">Hampers</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
            {isHampersLoading
              ? // Show skeleton cards while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden p-4"
                  >
                    <div className="flex flex-col gap-4 w-52">
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  </div>
                ))
              : filteredHampersData
                  ?.slice(0, itemsToShowHampers)
                  .map((item, index) => (
                    <Link
                      to={`/Hampers/${item.Id}`}
                      key={index}
                      onClick={() => handleViewHampers(item, "hampers")}
                    >
                      <div
                        key={index}
                        className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden focus:shadow-lg focus:scale-105 transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <div
                          className="flex items-end justify-end h-56 w-full bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${item.Gambar})`,
                          }}
                        >
                          <button
                            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md m-2"
                            onClick={() => handleViewHampers(item, "hampers")}
                          >
                            View
                          </button>
                        </div>
                        <div className="px-5 py-3">
                          <h3 className="text-gray-700 uppercase">
                            {item.Nama_Hampers}
                          </h3>
                          <span className="text-gray-500 mt-2">
                            Rp. {item.Harga}
                          </span>
                          <p className="text-gray-500 mt-2">
                            Kuota PreOrder : {item.Kuota}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
          </div>
          {filteredHampersData?.length > itemsToShowHampers && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                onClick={loadMoreItemsHampers}
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Produk Lainnya (Produk Penitip) section */}
        <div className="mt-16">
          <h3 className="text-gray-600 text-2xl font-medium">Produk Penitip</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
            {isProdukLoading
              ? // Show skeleton cards while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden p-4"
                  >
                    <div className="flex flex-col gap-4 w-52">
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  </div>
                ))
              : filteredProdukData
                  ?.slice(0, itemsToShowProduk)
                  .map((item, index) => (
                    <Link
                      to={`/Produk/${item.Id}`}
                      key={index}
                      onClick={() => handleViewProduk(item, "produkPenitip")}
                    >
                      <div
                        key={index}
                        className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden focus:shadow-lg focus:scale-105 transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <div
                          className="flex items-end justify-end h-56 w-full bg-cover"
                          style={{
                            backgroundImage: `url(${item.Gambar})`,
                          }}
                        >
                          <button
                            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md m-2"
                            onClick={() =>
                              handleViewProduk(item, "produkPenitip")
                            }
                          >
                            View
                          </button>
                        </div>
                        <div className="px-5 py-3">
                          <h3 className="text-gray-700 uppercase">
                            {item.Nama_Produk}
                          </h3>
                          <span className="text-gray-500 mt-2">
                            Rp. {item.Harga_Produk}
                          </span>
                          <p className="text-gray-500 mt-2">
                            Stok: {item.Stok_Produk}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
          </div>
          {filteredProdukData?.length > itemsToShowProduk && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                onClick={loadMoreItemsProduk}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
