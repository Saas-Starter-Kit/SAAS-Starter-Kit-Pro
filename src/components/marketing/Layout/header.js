import styled from 'styled-components';
import { useState } from 'react';
import FlyoutMenu from './flyoutMenu';

const Header = () => {
  const [menu, toggleMenu] = useState(false);

  const menuHandler = () => (menu ? toggleMenu(false) : toggleMenu(true));

  return (
    <div className='relative bg-white'>
      <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
        {/*Logo*/}
        <div className='lg:w-0 lg:flex-1'>
          <a href='#' className='flex'>
            <img
              className='h-8 w-auto sm:h-10'
              src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
              alt='Workflow'
            />
          </a>
        </div>
        {/*Mobile menu icon*/}
        <div className='-mr-2 -my-2 md:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
          >
            <img className='w-10 h-10' src='/icons/menu.svg' alt='menu' />
          </button>
        </div>

        <nav className='hidden md:flex space-x-10'>
          <div className='relative'>
            {/*<!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->*/}
            <button
              onClick={menuHandler}
              type='button'
              className={`group text-gray-500 inline-flex items-center 
                        space-x-2 text-base leading-6 font-medium 
                        hover:text-gray-900 focus:outline-none focus:text-gray-900 
                        transition ease-in-out duration-150'`}
            >
              <span>Solutions</span>
              <img
                className={`text-gray-400 h-5 w-5 group-hover:text-gray-500
                            group-focus:text-gray-500 
                            transition ease-in-out duration-150`}
                src='/icons/chevron-down.svg'
                alt='down arrow'
              />
            </button>
            {menu ? (
              <div className='fadeInUp'>
                <FlyoutMenu />
              </div>
            ) : null}
          </div>
          <a
            href='#'
            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150'
          >
            Pricing
          </a>
          <a
            href='#'
            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150'
          >
            Docs
          </a>
        </nav>

        <div className='hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0'>
          <a
            href='#'
            className='whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900'
          >
            Sign in
          </a>
          <span className='inline-flex rounded-md shadow-sm'>
            <a
              href='#'
              className='whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
            >
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
