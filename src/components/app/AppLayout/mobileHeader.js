//Mobile App header

const MobileHeader = ({ mobileMenuHandler }) => {
  return (
    <div className='md:hidden bg-blue-500 pl-1 pt-1 sm:pl-3 sm:pt-3'>
      <button
        onClick={mobileMenuHandler}
        className='-ml-0.5 -mt-0.5 h-12 w-12 font-semibold inline-flex items-center justify-center rounded-md text-white focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150'
        aria-label='Open sidebar'
      >
        {/*<!-- Heroicon name: menu -->*/}
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileHeader;
