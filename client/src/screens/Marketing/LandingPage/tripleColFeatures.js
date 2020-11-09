//Triple column features

const TripleColFeatures = () => {
  return (
    <div className='pt-12 bg-gray-50'>
      <div className='pb-20'>
        <h3 className='text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
          A better way to send money
        </h3>
        <p className='mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum
          cupiditate veritatis in, accusamus quisquam.
        </p>
      </div>
      <div className='max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-3 lg:gap-8'>
          <div>
            <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
              {/*<!-- Heroicon name: globe-alt -->*/}
            </div>
            <div className='mt-5'>
              <h5 className='text-lg leading-6 font-medium text-gray-900'>
                Competitive exchange rates
              </h5>
              <p className='mt-2 text-base leading-6 text-gray-500'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </p>
            </div>
          </div>
          <div className='mt-10 lg:mt-0'>
            <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
              {/*<!-- Heroicon name: scale -->*/}
            </div>
            <div className='mt-5'>
              <h5 className='text-lg leading-6 font-medium text-gray-900'>No hidden fees</h5>
              <p className='mt-2 text-base leading-6 text-gray-500'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </p>
            </div>
          </div>
          <div className='mt-10 lg:mt-0'>
            <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
              {/*<!-- Heroicon name: lightning-bolt -->*/}
            </div>
            <div className='mt-5'>
              <h5 className='text-lg leading-6 font-medium text-gray-900'>Transfers are instant</h5>
              <p className='mt-2 text-base leading-6 text-gray-500'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripleColFeatures;
