/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  MdDateRange,
  MdAttachMoney,
  
  MdAccessTime,
  MdArrowForward
} from 'react-icons/md';

const JobCard = ({ job }) => {
  const {job_title, deadline, max_price, min_price, category, description, _id} = job;

  return (
    <div className="group relative">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>

      <Link
        to={`/job-details/${_id}`}
        className="relative block w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-transparent"
      >
        {/* Header Section */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MdDateRange className="w-4 h-4 mr-1.5" />
              <span className="font-medium">{deadline}</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
              {category}
            </span>
          </div>

          {/* Job Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {job_title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {description.slice(0, 120)}...
          </p>

          {/* Price Range */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-green-600 dark:text-green-400">
              <MdAttachMoney className="w-5 h-5 mr-1" />
              <span className="font-bold text-lg">
                ${min_price} - ${max_price}
              </span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <MdAccessTime className="w-4 h-4 mr-1" />
              <span>Remote</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {job_title.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Posted by</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Client</p>
              </div>
            </div>

            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
              <span>View Details</span>
              <MdArrowForward className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
    </div>
  );
};

export default JobCard;
