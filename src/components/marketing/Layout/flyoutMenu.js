import styled from 'styled-components';

{
  /*
        <!--
          'Solutions' flyout menu, show/hide based on flyout menu state.

          Entering: "transition ease-out duration-200"
            From: "opacity-0 translate-y-1"
            To: "opacity-100 translate-y-0"
          Leaving: "transition ease-in duration-150"
            From: "opacity-100 translate-y-0"
            To: "opacity-0 translate-y-1"
        -->*/
}

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
`;

const FlyoutMenu = () => {
  return (
    <div className='absolute -ml-4 mt-3 transform w-screen max-w-md md:max-w-3xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'>
      <div className='rounded-lg shadow-lg'>
        <div className='rounded-lg shadow-xs overflow-hidden'>
          <div className='z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2'>
            <a
              href='#'
              className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
            >
              <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
              </div>
              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-gray-900'>Analytics</p>
                <p className='text-sm leading-5 text-gray-500'>
                  Get a better understanding of where your traffic is coming from.
                </p>
              </div>
            </a>
            <a
              href='#'
              className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
            >
              <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                {/*<!-- Heroicon name: cursor-click -->*/}
                <MenuImg src='/icons/cursor-click.svg' alt='click' />
              </div>
              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-gray-900'>Engagement</p>
                <p className='text-sm leading-5 text-gray-500'>
                  Speak directly to your customers in a more meaningful way.
                </p>
              </div>
            </a>
            <a
              href='#'
              className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
            >
              <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                <MenuImg src='/icons/shield-check.svg' alt='click' />
              </div>
              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-gray-900'>Security</p>
                <p className='text-sm leading-5 text-gray-500'>
                  Your customers data will be safe and secure.
                </p>
              </div>
            </a>
            <a
              href='#'
              className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
            >
              <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                <MenuImg src='/icons/view-grid.svg' alt='click' />
              </div>
              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-gray-900'>Integrations</p>
                <p className='text-sm leading-5 text-gray-500'>
                  Connect with third-party tools that you’re already using.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyoutMenu;
