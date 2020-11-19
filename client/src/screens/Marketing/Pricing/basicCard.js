import styled from 'styled-components';
import ListItem from '../../../components/marketing/Pricing/ListItem';
import { colors, breakpoints } from '../../../styles/theme';

const StyledListItem = styled(ListItem)`
  margin-top: 1rem;
`;

const getWrapper1Class = (left) =>
  left
    ? 'mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3'
    : 'mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3';

const getWrapper2Class = (left) =>
  left
    ? 'h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg'
    : 'h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg';

const BasicCard = ({ title, price, left }) => {
  const id = 'tier-' + title.toLowerCase();
  return (
    <div className={getWrapper1Class(left)}>
      <div className={getWrapper2Class(left)}>
        <div className='flex-1 flex flex-col'>
          <div className='bg-white px-6 py-10'>
            <div>
              <h3 className='text-center text-2xl leading-8 font-medium text-gray-900' id={id}>
                {title}
              </h3>
              <div className='mt-4 flex items-center justify-center'>
                <span className='px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900'>
                  <span className='mt-2 mr-2 text-4xl font-medium'>$</span>
                  <span className='font-extrabold'>{price}</span>
                </span>
                <span className='text-xl leading-7 font-medium text-gray-500'>/month</span>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10'>
            <ul>
              <ListItem text='Pariatur quod similique' />
              <StyledListItem text='Sapiente libero doloribus' />
              <StyledListItem text='Vel ipsa esse repudiandae' />
            </ul>
            <div className='mt-8'>
              <div className='rounded-lg shadow-md'>
                <a
                  href='#'
                  className='block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base leading-6 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150'
                  aria-describedby={id}
                >
                  Start your trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
