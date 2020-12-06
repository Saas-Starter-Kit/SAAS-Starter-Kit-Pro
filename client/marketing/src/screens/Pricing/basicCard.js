import styled from 'styled-components';
import ListItem from '../../components/Pricing/ListItem';
import { colors, breakpoints } from '../../styles/theme';

const OuterWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  margin-top: ${({ left }) => (left ? '0' : '2.3rem;')};
  @media (min-width: ${breakpoints.large}) {
    grid-row-start: 2;
    grid-row-end: 3;
    max-width: none;
    grid-column-start: ${({ left }) => (left ? '1' : '6')};
    grid-column-end: ${({ left }) => (left ? '3' : '8')};
    margin: 0;
  }
`;

const InnerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  @media (min-width: ${breakpoints.large}) {
    border-radius: 0;
    border-top-right-radius: ${({ left }) => (left ? '0' : '0.5rem')};
    border-bottom-right-radius: ${({ left }) => (left ? '0' : '0.5rem')};
    border-top-left-radius: ${({ left }) => (left ? '0.5rem' : '0')};
    border-bottom-left-radius: ${({ left }) => (left ? '0.5rem' : '0')};
  }
`;

const CardHeader = styled.div`
  background-color: ${colors.white};
  padding: 2.5rem 1.5rem;
`;

const Title = styled.h3`
  text-align: center;
  color: ${colors.gray900};
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Price = styled.span`
  display: flex;
  align-items: flex-start;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: ${colors.gray900};
  font-size: 4rem;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const Currency = styled.span`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  font-size: 2.25rem;
  font-weight: 500;
`;

const Number = styled.div`
  font-weight: 800;
`;

const TimePeriod = styled.span`
  color: ${colors.gray500};
  font-weight: 500;
  line-height: 1.75rem;
  font-size: 1.25rem;
`;

const CardBody = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-width: 2px;
  border-color: ${colors.gray100};
  background-color: ${colors.gray50};
  padding: 1.5rem;
  @media (min-width: ${breakpoints.small}) {
    padding: 2.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding: 1.5rem;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    padding: 2.5rem;
  }
`;

const LinkWrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: 2rem;
`;

const StyledListItem = styled(ListItem)`
  margin-top: 1rem;
`;

const Link = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.indigo600};
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: transparent;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(118, 169, 250, 0.45);
  }
`;

const BasicCard = ({ title, price, left }) => {
  const id = 'tier-' + title.toLowerCase();
  return (
    <OuterWrapper left={left}>
      <InnerWrapper left={left}>
        <CardHeader>
          <div>
            <Title id={id}>{title}</Title>
            <PriceWrapper>
              <Price>
                <Currency>$</Currency>
                <Number>{price}</Number>
              </Price>
              <TimePeriod>/month</TimePeriod>
            </PriceWrapper>
          </div>
        </CardHeader>
        <CardBody>
          <ul>
            <ListItem text='Pariatur quod similique' />
            <StyledListItem text='Sapiente libero doloribus' />
            <StyledListItem text='Vel ipsa esse repudiandae' />
          </ul>
          <LinkWrapper>
            <Link href='#' aria-describedby={id}>
              Start your trial
            </Link>
          </LinkWrapper>
        </CardBody>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default BasicCard;
