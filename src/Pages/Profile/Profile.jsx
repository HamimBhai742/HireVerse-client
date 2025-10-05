import {
  FaArrowLeft,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import {
  MdEdit,
  MdLocationOn,
  MdCalendarToday,
  MdVerified,
  MdSettings
} from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  animate,
  stagger,
} from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const Profile = () => {
  const { user } = useAuth();
  animate(".example a", { opacity: 1, y: [50, 0] }, { delay: stagger(0.05) });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cover Photo Section */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Navigation */}
        <div className="relative z-10 p-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Profile Avatar - Positioned to overlap */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            <button className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
              <MdEdit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mr-2">
              {user?.displayName || "User Name"}
            </h1>
            <MdVerified className="w-6 h-6 text-blue-500" />
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Web Developer || React & Tailwind CSS
          </p>

          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4">
            <MdLocationOn className="w-4 h-4 mr-1" />
            <span>San Francisco, CA</span>
            <span className="mx-2">•</span>
            <MdCalendarToday className="w-4 h-4 mr-1" />
            <span>Joined March 2024</span>
          </div>

          {/* Email */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">{user?.email}</p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Follow
            </button>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Message
            </button>
            <button className="p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <MdSettings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Connect With Me
          </h2>
          <div className="flex justify-center space-x-6 example">
            <a
              href="#"
              className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
