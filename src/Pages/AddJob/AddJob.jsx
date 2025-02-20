import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { email: user?.email },
  });

  // Ensure disabled email is included in the form
  useEffect(() => {
    setValue("email", user?.email);
  }, [user, setValue]);

  // Ensure deadline is included
  useEffect(() => {
    setValue("deadline", startDate);
  }, [startDate, setValue]);

  const onSubmit = async (data) => {
    setLoad(true);
    console.log("Form Data:", data); // ✅ Now shows all values
    console.log("Selected Date:", startDate);
    delete data.deadline;
    const formattedDate = startDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    console.log("Formatted Date:", formattedDate);
    // const jj={...data, date: formattedDate}
    try {
      const res = await axiosPublic.post("/add-job", {
        ...data,
        deadline: formattedDate,
      });
      if (res.data.acknowledged) {
        navigate("/my-posted-jobs");
        toast.success("Job posted successfully");
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Job Title</label>
              <input
                {...register("job_title", { required: true })}
                type="text"
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Disabled Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Email Address</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="border p-2 w-full bg-gray-200 cursor-not-allowed rounded-md"
              />
              <input type="hidden" {...register("email")} />
            </div>

            {/* Deadline Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Deadline</label>
              <DatePicker selected={startDate} onChange={setStartDate} />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Category</label>
              <select
                {...register("category", { required: true })}
                className="border p-2 rounded-md"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Minimum Price */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Minimum Price</label>
              <input
                {...register("min_price", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Maximum Price */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Maximum Price</label>
              <input
                {...register("max_price", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                className="border p-2 w-full rounded-md"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 mt-4 ">
            <label className="text-gray-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="border p-2 w-full rounded-md"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gray-700 text-white px-8 py-2.5 rounded-md hover:bg-gray-600"
            >
              {load ? <ImSpinner9 className="animate-spin m-auto " /> : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
