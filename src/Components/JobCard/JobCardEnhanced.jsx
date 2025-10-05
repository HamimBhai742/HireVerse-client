/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  MdDateRange,
  MdAttachMoney,
  MdLocationOn,
  MdArrowForward,
  MdBookmark,
  MdBookmarkBorder,
  MdTrendingUp,
  MdVerified
} from 'react-icons/md';
import { useState } from 'react';

const JobCardEnhanced = ({ job, onBookmark, isBookmarked = false }) => {
  const {job_title, deadline, max_price, min_price, category, description, _id} = job;
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmark && onBookmark(_id);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': 'from-blue-500 to-cyan-500',
      'Mobile Development': 'from-green-500 to-emerald-500',
      'Design': 'from-purple-500 to-pink-500',
      'Marketing': 'from-orange-500 to-red-500',
      'Writing': 'from-indigo-500 to-purple-500',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="group relative w-full max-w-sm">
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm animate-pulse"></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-transparent transform group-hover:-translate-y-1">

        {/* Header with bookmark */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <MdDateRange className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Due: {deadline}</span>
              </div>

              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-lg`}>
                <MdVerified className="w-3 h-3 mr-1" />
                {category}
              </div>
            </div>

            <button
              onClick={handleBookmark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {bookmarked ? (
                <MdBookmark className="w-5 h-5 text-blue-500" />
              ) : (
                <MdBookmarkBorder className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              )}
            </button>
          </div>

          {/* Job Title with trending indicator */}
          <div className="flex items-start gap-2 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
              {job_title}
            </h2>
            <MdTrendingUp className="w-5 h-5 text-green-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {description.slice(0, 140)}...
          </p>

          {/* Price and location */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                <MdAttachMoney className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                <p className="font-bold text-lg text-green-600 dark:text-green-400">
                  ${min_price} - ${max_price}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
              <MdLocationOn className="w-4 h-4 mr-1" />
              <span>Remote</span>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(category)} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white text-sm font-bold">
                  {job_title.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Posted by</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Professional Client</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                </div>
              </div>
            </div>

            <Link
              to={`/job-details/${_id}`}
              className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Apply Now</span>
              <MdArrowForward className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default JobCardEnhanced;
