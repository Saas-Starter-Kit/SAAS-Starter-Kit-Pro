import { useState } from 'react';
import SidebarDesktop from '../Navigation/sidebarDesktop';
import SidebarMobile from '../Navigation/sidebarMobile';
import SidebarIcons from '../Navigation/sidebarIcons';
import MobileHeader from '../Navigation/mobileHeader';

const AppLayout = ({ children }) => {
  const [isSidebar, toggleSidebar] = useState(true);
  const sidebarHandler = () => (isSidebar ? toggleSidebar(false) : toggleSidebar(true));

  const [mobileMenu, toggleMobileMenu] = useState(false);
  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      {isSidebar ? (
        <SidebarDesktop sidebarHandler={sidebarHandler} />
      ) : (
        <SidebarIcons sidebarHandler={sidebarHandler} />
      )}
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <MobileHeader mobileMenuHandler={mobileMenuHandler} />
        {mobileMenu ? <SidebarMobile toggleMobileMenu={toggleMobileMenu} /> : null}
        <main className='flex-1  z-0 overflow-y-auto focus:outline-none' tabindex='0'>
          {/*App Screens Here*/}
          <div className='my-6 mx-14'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
