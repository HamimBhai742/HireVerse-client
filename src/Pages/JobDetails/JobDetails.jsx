import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import {
  MdDateRange,
  MdAttachMoney,
  MdLocationOn,
  MdPerson,
  MdEmail,
  MdComment,
  MdGavel,
  MdVerified,
  MdStar,
  MdBookmark,
  MdShare,
  MdArrowBack,
} from 'react-icons/md';

const JobDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { email: user?.email },
  });
  const { id } = useParams();
  const { data: job = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/job/${id}`);
      return res.data;
    },
  });

  // Ensure disabled email is included in the form
  useEffect(() => {
    setValue('email', user?.email);
  }, [user, setValue]);

  // Ensure deadline is included
  const formattedDate = startDate
    .toLocaleDateString('en-GB')
    .replace(/\//g, '-');
  useEffect(() => {
    setValue('deadline', formattedDate);
    setValue('job_title', job?.job_title);
    setValue('category', job?.category);
    setValue('buyer_name', job?.name);
    setValue('buyer_email', job?.email);
    setValue('status', 'Pending');
  }, [formattedDate, job, setValue]);

  const onSubmit = async (data) => {
    setLoad(true);
    console.log(data);
    if (job?.email === user?.email) {
      setLoad(false);
      toast.error("You can't apply for your own job");
      return;
    }
    try {
      const res = await axiosPublic.post('/apply-job', data);
      if (res.data.acknowledged) {
        toast.success('Bid placed successfully');
        setLoad(false);
        navigate('/my-bids');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoad(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': 'from-blue-500 to-cyan-500',
      'Mobile Development': 'from-green-500 to-emerald-500',
      Design: 'from-purple-500 to-pink-500',
      Marketing: 'from-orange-500 to-red-500',
      Writing: 'from-indigo-500 to-purple-500',
      default: 'from-gray-500 to-gray-600',
    };
    return colors[category] || colors.default;
  };

  if (!user) {
    return navigate('/login');
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='flex items-center justify-between mb-8'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center text-white hover:text-gray-200 transition-colors'
            >
              <MdArrowBack className='w-6 h-6 mr-2' />
              <span className='font-medium'>Back to Jobs</span>
            </button>

            <div className='flex items-center space-x-4'>
              <button className='p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors'>
                <MdBookmark className='w-6 h-6' />
              </button>
              <button className='p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors'>
                <MdShare className='w-6 h-6' />
              </button>
            </div>
          </div>

          <div className='text-center text-white'>
            <div className='flex items-center justify-center mb-4'>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getCategoryColor(
                  job?.category
                )} shadow-lg`}
              >
                <MdVerified className='w-4 h-4 mr-2' />
                {job?.category}
              </span>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
              {job?.job_title}
            </h1>

            <div className='flex items-center justify-center space-x-6 text-lg'>
              <div className='flex items-center'>
                <MdDateRange className='w-5 h-5 mr-2' />
                <span>Due: {job?.deadline}</span>
              </div>
              <div className='flex items-center'>
                <MdAttachMoney className='w-5 h-5 mr-2' />
                <span>
                  ${job?.min_price} - ${job?.max_price}
                </span>
              </div>
              <div className='flex items-center'>
                <MdLocationOn className='w-5 h-5 mr-2' />
                <span>Remote</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Job Details - Left Column */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Job Description Card */}
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
                <MdGavel className='w-6 h-6 mr-3 text-blue-600' />
                Job Description
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-lg'>
                {job?.description}
              </p>
            </div>

            {/* Buyer Details Card */}
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
                <MdPerson className='w-6 h-6 mr-3 text-blue-600' />
                Client Information
              </h2>

              <div className='flex items-center space-x-6'>
                <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
                  <span className='text-white text-2xl font-bold'>
                    {job?.name?.charAt(0)?.toUpperCase() || 'C'}
                  </span>
                </div>

                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                    {job?.name}
                  </h3>
                  <div className='flex items-center text-gray-600 dark:text-gray-300 mb-2'>
                    <MdEmail className='w-5 h-5 mr-2' />
                    <span>{job?.email}</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='flex text-yellow-400 mr-2'>
                      {[...Array(5)].map((_, i) => (
                        <MdStar key={i} className='w-4 h-4' />
                      ))}
                    </div>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      (4.9) • Professional Client
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form - Right Column */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
                  <MdGavel className='w-6 h-6 mr-3 text-green-600' />
                  Place Your Bid
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  {/* Price Input */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Your Bid Amount
                    </label>
                    <div className='relative'>
                      <MdAttachMoney className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                      <input
                        id='price'
                        type='number'
                        {...register('price', {
                          required: true,
                          valueAsNumber: true,
                        })}
                        className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                        placeholder='Enter your bid amount'
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Email Address
                    </label>
                    <div className='relative'>
                      <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                      <input
                        type='email'
                        defaultValue={user?.email}
                        disabled
                        className='w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      />
                      <input type='hidden' {...register('email')} />
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Cover Letter
                    </label>
                    <div className='relative'>
                      <MdComment className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
                      <textarea
                        {...register('comment')}
                        rows={4}
                        className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none'
                        placeholder="Tell the client why you're the best fit for this job..."
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Delivery Date
                    </label>
                    <div className='relative'>
                      <MdDateRange className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10' />
                      <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                        dateFormat='dd-MM-yyyy'
                        minDate={new Date()}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={load}
                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none flex items-center justify-center'
                  >
                    {load ? (
                      <ImSpinner9 className='animate-spin w-6 h-6' />
                    ) : (
                      <>
                        <MdGavel className='w-5 h-5 mr-2' />
                        Place Bid
                      </>
                    )}
                  </button>
                </form>

                {/* Price Range Info */}
                <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Budget Range:
                    </span>
                    <span className='font-bold text-blue-600 dark:text-blue-400'>
                      ${job?.min_price} - ${job?.max_price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
