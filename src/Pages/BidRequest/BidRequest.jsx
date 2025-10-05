import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TableDataRow from "./TableDataRow";
import Swal from "sweetalert2";
const BidRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: bidsRequests = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["bid-requests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bid-requests/${user?.email}`);
      return res.data;
    },
  });
  console.log(bidsRequests);
  const handelAcceptBtn = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want accept this bid!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const res = await axiosPublic.patch(`/update-bid-request/${id}`,{status:"Accepted"});
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Accepted!",
              text: "Your bid has been accepted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Failed!",
            text: "Your bid has been accepted failed.",
            icon: "error",
          });
        }
      }
    });
  };
  const handelRejectBtn = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want reject this bid!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.patch(`/update-bid-request/${id}`,{status:"Rejected"});
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Your bid has been rejected.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Failed!",
            text: "Your bid has been rejected failed.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bidsRequests?.length > 9 ? "" : 0}
          {bidsRequests?.length} Requests
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
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
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
                        <span>Price</span>
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
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {bidsRequests.map((bidRequest) => (
                    <TableDataRow
                      key={bidRequest._id}
                      bidRequest={bidRequest}
                      handelAcceptBtn={handelAcceptBtn}
                      handelRejectBtn={handelRejectBtn}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BidRequests;
