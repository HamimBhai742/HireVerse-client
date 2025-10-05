import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import TableRowData from "./TableRowData";
import Swal from "sweetalert2";

const MyPostedJobs = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: jobs = [],
    refetch,
    isPending,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-posted-jobs/${user?.email}`);
      return res.data;
    },
  });
  console.log(jobs);
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Item deleted!", id);

        try {
          const res = await axiosPublic.delete(`/delete-job/${id}`);
          console.log(res);
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your job post has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Failed!",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };
  console.log(user?.email)
  return (
    <div>
      {loading ? (
        "Loading............."
      ) : (
        <section className="container px-4 mx-auto pt-12">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 ">
              My Posted Jobs
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              {jobs?.length > 9 ? "" : 0}
              {jobs?.length} Jobs
            </span>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Title</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <span>Deadline</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Price Range</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Description
                        </th>

                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {jobs.map((job) => (
                        <TableRowData
                          key={job._id}
                          job={job}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPostedJobs;
