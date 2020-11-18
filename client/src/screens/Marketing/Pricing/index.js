import styled from 'styled-components';
import ProCard from './proCard';
import BasicCard from './basicCard';
import PricingHeader from './pricingHeader';
import Layout from '../../../components/marketing/Layout';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper1 = styled.div`
  background-color: ${colors.gray900};
`;

const Wrapper2 = styled.div`
  background-color: ${colors.white};
  margin-top: 4rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 5rem;
    padding-bottom: 5rem;
  }
`;

const Wrapper3 = styled.div`
  position: relative;
  z-index: 0;
`;

const Div = styled.div`
  position: absolute;
  background-color: ${colors.gray900};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 83.3%;
  @media (min-width: ${breakpoints.large}) {
    height: 66.6%;
  }
`;

const Wrapper4 = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Wrapper5 = styled.div`
  position: relative;
  @media (min-width: ${breakpoints.large}) {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
`;

const Pricing = () => (
  <Layout>
    <Wrapper1>
      <PricingHeader />
      <Wrapper2>
        <Wrapper3>
          <Div />
          <Wrapper4>
            <Wrapper5>
              <BasicCard title='Hobby' price='79' left />
              <ProCard />
              <BasicCard title='Scale' price='349' left={false} />
            </Wrapper5>
          </Wrapper4>
        </Wrapper3>
      </Wrapper2>
    </Wrapper1>
  </Layout>
);

export default Pricing;
