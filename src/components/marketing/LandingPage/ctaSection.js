const CTASection = () => {
  return (
    <div className='bg-indigo-700'>
      <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10'>
          <span className='block'>Boost your productivity.</span>
          <span className='block'>Start using Workflow today.</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-indigo-200'>
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing
          sagittis vel nulla nec.
        </p>
        <a
          href='#'
          className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 hover:bg-indigo-50 transition duration-150 ease-in-out sm:w-auto'
        >
          Sign up for free
        </a>
      </div>
    </div>
  );
};

export default CTASection;
