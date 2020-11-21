import styled from 'styled-components';

const MobileDropdownItem = ({ onClick, title }) => (
  <div
    onClick={onClick}
    className='cursor-pointer block px-4 py-4 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
    role='menuitem'
  >
    {title}
  </div>
);

export default MobileDropdownItem;
