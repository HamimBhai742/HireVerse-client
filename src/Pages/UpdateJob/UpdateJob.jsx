import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [load,setLoad]=useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  // if (loading) return "Loading...";
  const { data: updateJob = {}, isPending } = useQuery({
    queryKey: ["updateJob"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/update-job/${id}`);
      return res.data;
    },
  });
  console.log(updateJob);
  const parseDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    setStartDate(parseDate(updateJob?.deadline));
  }, [updateJob?.deadline]);
  const { register, handleSubmit ,setValue} = useForm({
    defaultValues: {
      email: user?.email,
      job_title: updateJob?.job_title,
      category: updateJob?.category,
      min_price: updateJob?.min_price,
      max_price: updateJob?.max_price,
      deadline: updateJob?.deadline,
      description: updateJob?.description,
    },
  });
  useEffect(() => {
    setValue("email", updateJob?.email);
  })
  const onSubmit = async (data) => {
    setLoad(true);
    const formattedDate = startDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const jj = { ...data, deadline: formattedDate };
    console.log(jj);
    try {
      const res = await axiosPublic.put(`/update-job/${id}`, jj);
      if (res.data.acknowledged) {
        toast.success("Job updated successfully");
        window.location.replace("/my-posted-jobs");
        // navigate("/my-posted-jobs");
        setLoad(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoad(false);
    }
  };
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Job
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                type="text"
                defaultValue={updateJob?.job_title}
                {...register("job_title")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={updateJob?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
              <input type="hidden" {...register("email")} />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date picker input field */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                defaultValue={updateJob?.category}
                {...register("category")}
                className="border p-2 rounded-md"
                required
              >
                <option disabled value="">
                  Select Category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                defaultValue={updateJob?.min_price}
                {...register("min_price", { required: true, valueAsNumber: true })}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                {...register("max_price",{ required: true, valueAsNumber: true })}
                defaultValue={updateJob?.max_price}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              {...register("description")}
              defaultValue={updateJob?.description}
              id="description"
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {load ? <ImSpinner9 className="animate-spin m-auto " /> : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
