import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import Button from './button';
import Chevron from '../../../components/svgs/chevron';
import Cash from '../../../components/svgs/cash';

const Wrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    display: none;
  }
`;

const List = styled.ul`
  margin-top: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    display: none;
  }
`;

const Card = styled.a`
  background-color: ${colors.white};
  display: block;
  padding: 1rem;
  &:hover {
    background-color: ${colors.coolGray50};
  }
`;

const TextWrapper1 = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper2 = styled.div`
  flex: 1 1 0%;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Text = styled.div`
  color: ${colors.coolGray500};
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 12px;
`;

const Title = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Number = styled.span`
  color: ${colors.coolGray900};
  font-weight: 500;
`;

const Nav = styled.nav`
  background-color: ${colors.white};
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.coolGray200};
`;

const ButtonsWrapper = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-left: 0.75rem;
`;

const MobileActivityList = () => (
  <Wrapper>
    <List>
      <li>
        <Card href='#'>
          <TextWrapper1>
            <TextWrapper2>
              <Cash />
              <Text>
                <Title>Payment to Molly Sanders</Title>
                <p>
                  <Number>$20,000</Number> USD
                </p>
                <p>July 11, 2020</p>
              </Text>
            </TextWrapper2>
            <Chevron />
          </TextWrapper1>
        </Card>
      </li>
    </List>
    <Nav>
      <ButtonsWrapper>
        <Button label='Previous' />
        <StyledButton label='Next' />
      </ButtonsWrapper>
    </Nav>
  </Wrapper>
);

export default MobileActivityList;
