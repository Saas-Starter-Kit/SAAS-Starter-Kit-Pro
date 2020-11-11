import EnterpriseCard from './enterpriseCard';
import ProCard from './proCard';
import FreeCard from './freeCard';
import PricingHeader from './pricingHeader';
import Layout from '../../../components/marketing/Layout';

const Pricing = () => {
  return (
    <Layout>
      <div className='bg-gray-900'>
        <PricingHeader />
        <div className='mt-16 bg-white pb-12 lg:mt-20 lg:pb-20'>
          <div className='relative z-0'>
            <div className='absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3'></div>
            <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='relative lg:grid lg:grid-cols-7'>
                <FreeCard />
                <ProCard />
                <EnterpriseCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
