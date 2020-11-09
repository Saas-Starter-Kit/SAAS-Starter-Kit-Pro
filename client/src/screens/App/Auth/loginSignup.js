import LoginForm from './loginForm';
import LoginFormHeader from './loginFormHeader';
import SocialBar from './socialBar';

const LoginSignup = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {/*<LoginFormHeader />*/}
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {/*<LoginForm />*/}
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
