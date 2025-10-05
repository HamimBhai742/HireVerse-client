import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
  MdWork,
  MdEmail,
  MdDateRange,
  MdCategory,
  MdAttachMoney,
  MdDescription,
  MdAdd,
  MdArrowBack,
  MdPublish,
  MdVerified
} from 'react-icons/md';

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
    console.log("Form Data:", data);
    console.log("Selected Date:", startDate);
    delete data.deadline;
    const formattedDate = startDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    console.log("Formatted Date:", formattedDate);
    try {
      const res = await axiosPublic.post("/add-job", {
        ...data,
        deadline: formattedDate,
        name: user?.displayName
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <MdArrowBack className="w-6 h-6 mr-2" />
              <span className="font-medium">Back</span>
            </button>
          </div>

          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <MdAdd className="w-12 h-12" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Post a New Job
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find the perfect freelancer for your project. Create a detailed job posting to attract top talent.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <MdWork className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Job Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the information below to create your job posting
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Job Title & Email Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Job Title *
                  </label>
                  <div className="relative">
                    <MdWork className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("job_title", { required: true })}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g. Full Stack Developer"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                    <input type="hidden" {...register("email")} />
                  </div>
                </div>
              </div>

              {/* Deadline & Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Deadline */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Project Deadline *
                  </label>
                  <div className="relative">
                    <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      placeholderText="Select deadline"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <div className="relative">
                    <MdCategory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register("category", { required: true })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
                    >
                      <option value="">Select a category</option>
                      <option value="Web Development">💻 Web Development</option>
                      <option value="Graphics Design">🎨 Graphics Design</option>
                      <option value="Digital Marketing">📱 Digital Marketing</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Range Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Minimum Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Minimum Budget *
                  </label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("min_price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Maximum Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Maximum Budget *
                  </label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("max_price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project Description *
                </label>
                <div className="relative">
                  <MdDescription className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    {...register("description", { required: true })}
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe your project in detail. Include requirements, expectations, and any specific skills needed..."
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minimum 50 characters. Be specific about your requirements to attract the right freelancers.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MdVerified className="w-4 h-4 mr-2 text-green-500" />
                  <span>All fields marked with * are required</span>
                </div>

                <button
                  type="submit"
                  disabled={load}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
                >
                  {load ? (
                    <ImSpinner9 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <MdPublish className="w-5 h-5 mr-2" />
                  )}
                  {load ? "Publishing..." : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            💡 Tips for a Great Job Post
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Write a clear, descriptive title that explains what you need</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Include specific requirements and deliverables in your description</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Set a realistic budget range based on project complexity</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Choose an appropriate deadline that allows quality work</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
