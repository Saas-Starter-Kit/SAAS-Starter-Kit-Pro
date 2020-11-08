import LoginForm from './loginForm';
import SocialBar from './socialBar';

const LoginSignup = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm leading-5 text-gray-600 max-w'>
          Or
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
          >
            start your 14-day free trial
          </a>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <LoginForm />
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm leading-5'>
                <span className='px-2 bg-white text-gray-500'>Or continue with</span>
              </div>
            </div>
            <SocialBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
