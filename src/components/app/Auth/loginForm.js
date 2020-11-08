export const LoginForm = () => {
  return (
    <form action='#' method='POST'>
      <div>
        <label for='email' className='block text-sm font-medium leading-5 text-gray-700'>
          Email address
        </label>
        <div className='mt-1 rounded-md shadow-sm'>
          <input
            id='email'
            type='email'
            required
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
        </div>
      </div>

      <div className='mt-6'>
        <label for='password' className='block text-sm font-medium leading-5 text-gray-700'>
          Password
        </label>
        <div className='mt-1 rounded-md shadow-sm'>
          <input
            id='password'
            type='password'
            required
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
        </div>
      </div>

      <div className='mt-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            id='remember_me'
            type='checkbox'
            className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
          />
          <label for='remember_me' className='ml-2 block text-sm leading-5 text-gray-900'>
            Remember me
          </label>
        </div>

        <div className='text-sm leading-5'>
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div className='mt-6'>
        <span className='block w-full rounded-md shadow-sm'>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
          >
            Sign in
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
