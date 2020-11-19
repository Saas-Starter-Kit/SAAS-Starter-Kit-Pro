import styled from 'styled-components';
import ListItem from '../../../components/marketing/Pricing/ListItem';
import { colors, breakpoints } from '../../../styles/theme';

const StyledListItem = styled(ListItem)`
  margin-top: 1rem;
`;

const GrowthCard = () => (
  <div className='mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4'>
    <div className='relative z-10 rounded-lg shadow-xl'>
      <div className='pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600'></div>
      <div className='absolute inset-x-0 top-0 transform translate-y-px'>
        <div className='flex justify-center transform -translate-y-1/2'>
          <span className='inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white'>
            Most popular
          </span>
        </div>
      </div>
      <div className='bg-white rounded-t-lg px-6 pt-12 pb-10'>
        <div>
          <h3
            className='text-center text-3xl leading-9 font-semibold text-gray-900 sm:-mx-6'
            id='tier-growth'
          >
            Growth
          </h3>
          <div className='mt-4 flex items-center justify-center'>
            <span className='px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl'>
              <span className='mt-2 mr-2 text-4xl font-medium'>$</span>
              <span className='font-extrabold'>149</span>
            </span>
            <span className='text-2xl leading-8 font-medium text-gray-500'>/month</span>
          </div>
        </div>
      </div>
      <div className='border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10'>
        <ul>
          <ListItem text='Quia rem est sed impedit magnam' />
          <StyledListItem text='Dolorem vero ratione voluptates' />
          <StyledListItem text='Qui sed ab doloribus voluptatem dolore' />
          <StyledListItem text='Laborum commodi molestiae id et fugiat' />
          <StyledListItem text='Nam ut ipsa nesciunt culpa modi dolor' />
        </ul>
        <div className='mt-10'>
          <div className='rounded-lg shadow-md'>
            <a
              href='#'
              className='block w-full text-center rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150'
              aria-describedby='tier-growth'
            >
              Start your trial
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GrowthCard;
