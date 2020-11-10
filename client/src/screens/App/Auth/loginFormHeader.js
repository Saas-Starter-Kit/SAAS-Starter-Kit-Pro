const LoginFormHeader = () => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='mx-auto h-12 w-auto'
        src='https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg'
        alt='Workflow'
      />
      <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
        Sign-In or Sign-Up for an account
      </h2>
    </div>
  );
};

export default LoginFormHeader;
