

const Home = () => {
  return (
    <div>
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
              Find Your Dream
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                {' '}
                Job
              </span>
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto'>
              Connect with top employers and discover opportunities that match
              your skills and aspirations
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center'>
                Get Started
                {/* <ChevronRightIcon className='ml-2 h-5 w-5' /> */}
              </button>
              <button className='border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-500 px-8 py-4 rounded-lg font-semibold transition-colors'>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                {/* <BriefcaseIcon className='h-8 w-8 text-blue-600 dark:text-blue-400' /> */}
              </div>
              <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                10,000+
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>Active Jobs</p>
            </div>
            <div className='text-center'>
              <div className='bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                {/* <UsersIcon className='h-8 w-8 text-green-600 dark:text-green-400' /> */}
              </div>
              <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                50,000+
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>Job Seekers</p>
            </div>
            <div className='text-center'>
              <div className='bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                {/* <TrendingUpIcon className='h-8 w-8 text-purple-600 dark:text-purple-400' /> */}
              </div>
              <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                95%
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Why Choose Our Platform?
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Discover the features that make job searching and hiring
              effortless
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Smart Job Matching
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                AI-powered algorithm matches you with jobs that fit your skills
                and preferences perfectly.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-green-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Secure & Private
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Your data is protected with enterprise-grade security and
                privacy controls.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-orange-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Lightning Fast
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Apply to multiple jobs in seconds with our streamlined
                application process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-700'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl lg:text-4xl font-bold text-white mb-6'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join thousands of professionals who found their dream jobs through
            our platform
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors'>
              Create Account
            </button>
            <button className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors'>
              Browse Jobs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
