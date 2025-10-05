import { ImSpinner9 } from "react-icons/im";
import JobCard from "../../Components/JobCard/JobCard";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const AllJobs = () => {
  const axiosPublic = useAxiosPublic();
  const {loading}=useAuth()
  const [categories, setCategories] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  let itemPerPage = parseInt(8);
  const [count, setCount] = useState(0);
  const handelPreviousBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handelNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];
  console.log(pages);

  useEffect(() => {
    async function getAllJobs() {
      const res = await axiosPublic.get(
        `/all-jobs?category=${categories}&&search=${search}&&order=${order}&&page=${currentPage}&&size=${itemPerPage}`
      );
      console.log(res.data);
      setAllJobs(res.data.jobs);
      setCount(res.data.count);
    }
    getAllJobs();
  }, [categories, search, order, currentPage, itemPerPage]);

  if(loading){
    return (
      <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
        <div className="flex justify-center items-center h-[50vh]">
          <ImSpinner9 className="text-4xl animate-spin" />  
        </div>
      </div>
    ) 
  }
  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-lg"
              onChange={(e) => setCategories(e.target.value)}
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form
            onSubmit={(e) => e.preventDefault(setSearch(e.target.search.value))}
          >
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button
                type="submit"
                className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-md"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="">Sort By Deadline</option>
              <option value="desc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button onClick={() => window.location.reload()} className="btn">
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handelPreviousBtn}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white ${
              currentPage === p && "bg-blue-500 text-white"
            }`}
            onClick={() => setCurrentPage(p)}
          >
            {p + 1}
          </button>
        ))}

        <button
          onClick={handelNextBtn}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
