import { useState } from 'react';
import SidebarDesktop from '../Navigation/sidebarDesktop';
import SidebarMobile from '../Navigation/sidebarMobile';
import SidebarIcons from '../Navigation/sidebarIcons';
import MobileHeader from '../Navigation/mobileHeader';

const App = () => {
  const [isSidebar, toggleSidebar] = useState(false);
  const sidebarHandler = () => (isSidebar ? toggleSidebar(false) : toggleSidebar(true));

  const [mobileMenu, toggleMobileMenu] = useState(false);
  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      {/*<!-- Static sidebar for desktop -->*/}
      {isSidebar ? <SidebarDesktop /> : <SidebarIcons />}
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <MobileHeader mobileMenuHandler={mobileMenuHandler} />
        {mobileMenu ? <SidebarMobile toggleMobileMenu={toggleMobileMenu} /> : null}
        <main className='flex-1  z-0 overflow-y-auto focus:outline-none' tabindex='0'>
          <div className='pt-2 pb-6 md:py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {/*<!-- Replace with your content -->*/}
              <div className='py-4'>
                <div>
                  <button onClick={sidebarHandler}>Open</button>
                </div>
              </div>
              {/*<!-- /End replace -->*/}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
