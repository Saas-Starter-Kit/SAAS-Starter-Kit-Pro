import React from 'react';
import styled from 'styled-components';
import Button from './button';
import { colors, breakpoints } from '../../../styles/theme';
import Cash from '../../../components/App/svgs/cash';

const Wrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.small}) {
    display: block;
  }
  margin-top: 0.5rem;
  vertical-align: middle;
  min-width: 100%;
  overflow-x: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const Table = styled.table`
  min-width: 100%;
`;

const ThBase = styled.th`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.coolGray50};
  font-weight: medium;
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  color: ${colors.coolGray500};
  letter-spacing: 0.05em;
`;

const StyledTh1 = styled(ThBase)`
  text-align: left;
`;

const StyledTh2 = styled(ThBase)`
  text-align: right;
`;

const StyledTh3 = styled(ThBase)`
  text-align: left;
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const TableBody = styled.tbody`
  background-color: ${colors.white};
`;

const TdBase = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const StyledTd1 = styled(TdBase)`
  color: ${colors.gray900};
  max-width: 0rem;
  width: 100%;
`;

const TransactionName = styled.div`
  display: flex;
`;

const StyledTd2 = styled(TdBase)`
  color: ${colors.coolGray500};
  text-align: right;
`;

const StyledTd3 = styled(TdBase)`
  color: ${colors.coolGray500};
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const PaymentButton = styled.a`
  display: inline-flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Title = styled.p`
  color: ${colors.coolGray500};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 12px;
  ${PaymentButton}:hover {
    color: ${colors.gray900};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  background-color: ${colors.green100};
  color: ${colors.green800};
  text-transform: capitalize;
`;

const Number = styled.span`
  color: ${colors.gray900};
  font-weight: 500;
`;

const Nav = styled.nav`
  background-color: ${colors.white};
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.coolGray200};
`;

const NavText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.coolGray700};
`;

const Span = styled.span`
  font-weight: 500;
  padding: 0 3px;
`;

const ButtonsWrapper = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  margin-left: 0.75rem;
`;

const DesktopActivityList = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <StyledTh1>Transaction</StyledTh1>
          <StyledTh2>Amount</StyledTh2>
          <StyledTh3>Status</StyledTh3>
          <StyledTh2>Date</StyledTh2>
        </tr>
      </thead>
      <TableBody>
        <tr>
          <StyledTd1>
            <TransactionName>
              <PaymentButton>
                <Cash />
                <Title>Payment to Molly Sanders</Title>
              </PaymentButton>
            </TransactionName>
          </StyledTd1>
          <StyledTd2>
            <Number>$20,000 </Number>
            USD
          </StyledTd2>
          <StyledTd3>
            <Status>success</Status>
          </StyledTd3>
          <StyledTd2>July 11, 2020</StyledTd2>
        </tr>
      </TableBody>
    </Table>
    <Nav>
      <NavText>
        Showing
        <Span>1</Span>
        to
        <Span>10</Span>
        of
        <Span>20</Span>
        results
      </NavText>
      <ButtonsWrapper>
        <Button label="Previous" />
        <StyledButton label="Next" />
      </ButtonsWrapper>
    </Nav>
  </Wrapper>
);

export default DesktopActivityList;
