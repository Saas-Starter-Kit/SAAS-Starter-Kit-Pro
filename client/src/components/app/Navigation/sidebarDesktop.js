import styled, { keyframes } from 'styled-components';
import { Link } from '@reach/router';
import { BiArrowFromRight } from 'react-icons/bi';
import Avatar from '../Avatar/avatarSidebarFull';
import { colors } from '../../../styles/theme';

const growSideBar = keyframes`
from {
  width: 5.2rem;
}
to {
  width: 14rem;
}`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  background-color: ${colors.indigo800};
  width: 14rem;
  overflow: hidden;
  animation: ${growSideBar} 0.3s ease-out forwards;
`;

const fadeInRight = keyframes`
from {
  opacity: 0;
  transform: translateX(-1.5rem);
}
to {
  opacity: 1;
  transform: translateX(0);
}`;

const StyledArrow = styled(BiArrowFromRight)`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 2rem;
  left: 13rem;
  color: ${colors.white};
  background-color: ${colors.indigo800};
  border-radius: 0.5rem;
  cursor: pointer;
  animation: ${fadeInRight} 0.7s ease-in forwards;
`;

const SidebarDesktop = ({ sidebarHandler }) => {
  return (
    <div className='hidden md:flex md:flex-shrink-0'>
      <div className='flex flex-col'>
        <Sidebar>
          <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
            <div className='flex pl-6'>
              <img className='h-8 w-auto' src='/logo/large_logo.svg' alt='Workflow' />
            </div>

            <Avatar />
            <nav className='mt-8 flex-1 px-2 bg-indigo-800 space-y-1'>
              <Link to='/app'>
                <div className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'>
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Dashboard
                </div>
              </Link>

              <Link to='/app/readupdate'>
                <div className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'>
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  Read Update
                </div>
              </Link>

              <Link to='/app/create'>
                <div className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'>
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                  Create
                </div>
              </Link>
            </nav>
          </div>
        </Sidebar>
        <div onClick={sidebarHandler}>
          <StyledArrow />
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
