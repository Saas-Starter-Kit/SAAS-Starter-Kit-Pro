import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import Button from './button';
import Tick from './tick.svg';
import Minus from './minus.svg';

const LargeScreenWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  height: 1px;
`;

const Caption = styled.caption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Header = styled.th`
  width: 25%;
  padding: 0 1.5rem 1rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
  text-align: left;
`;

const Plans = styled(Header)`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const ScreenReaderSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Body = styled.tbody`
  border-top: 1px solid ${colors.gray200};
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
  --tw-divide-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-divide-opacity));
`;

const Pricing = styled.th`
  padding: 2rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: ${colors.gray900};
  text-align: left;
  vertical-align: top;
`;

const PriceTd = styled.td`
  height: 100%;
  padding: 2rem 1.5rem;
  vertical-align: top;
`;

const PriceWrapper = styled.div`
  position: relative;
  height: 100%;
  display: table;
`;

const Price = styled.p`
  margin-bottom: 2rem;
`;

const Number = styled.span`
  font-size: 2.25rem;
  line-height: 3.5rem;
  font-weight: 800;
  color: ${colors.gray900};
`;

const Frequency = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray500};
`;

const Description = styled.p`
  margin-top: 1rem;
  margin-bottom: 4rem;
  color: ${colors.gray500};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const TopButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  flex-grow: 1;
`;

const Th = styled.th`
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: ${colors.gray500};
  text-align: left;
`;

const Td = styled.td`
  padding: 1.25rem 1.5rem;
`;

const Icon = styled.img`
  height: 1.25rem;
  width: 1.25rem;
`;

const TdSpan = styled.span`
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`;

const TitleTh = styled.th`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: ${colors.gray900};
  text-align: left;
`;

const ScreenReaderTh = styled.th`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const FooterRow = styled.tr`
  border-top: 1px solid ${colors.gray200};
`;

const BottomButtonWrapper = styled.td`
  padding: 1.25rem 1.5rem 0;
`;

const ComparisonTable = () => (
  <LargeScreenWrapper>
    <Table>
      <Caption>Pricing plan comparison</Caption>
      <thead>
        <tr>
          <Plans scope="col">
            <ScreenReaderSpan>Feature by</ScreenReaderSpan>
            <span>Plans</span>
          </Plans>
          <Header scope="col">Basic</Header>
          <Header scope="col">Essential</Header>
        </tr>
      </thead>
      <Body>
        <tr>
          <Pricing scope="row">Pricing</Pricing>
          <PriceTd>
            <PriceWrapper>
              <Price>
                <Number>$9</Number>
                <Frequency>/mo</Frequency>
              </Price>
              <Description>Quis suspendisse ut fermentum neque vivamus non tellus.</Description>
              <TopButton href="#">Buy Basic</TopButton>
            </PriceWrapper>
          </PriceTd>
          <PriceTd>
            <PriceWrapper>
              <Price>
                <Number>$29</Number>
                <Frequency>/mo</Frequency>
              </Price>
              <Description>Quis eleifend a tincidunt pellentesque. A tempor in sed.</Description>
              <TopButton href="#">Buy Essential</TopButton>
            </PriceWrapper>
          </PriceTd>
        </tr>
        <tr>
          <TitleTh colspan="3" scope="colgroup">
            Features
          </TitleTh>
        </tr>

        <tr>
          <Th scope="row">Molestie lobortis massa.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Urna purus felis.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Tellus pulvinar sit dictum.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Convallis.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <TdSpan>Up to 20 users</TdSpan>
          </Td>
        </tr>

        <tr>
          <TitleTh colspan="3" scope="colgroup">
            Reporting
          </TitleTh>
        </tr>

        <tr>
          <Th scope="row">Adipiscing.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Eget risus integer.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Gravida leo urna velit.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Elementum ut dapibus mi feugiat cras nisl.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <TitleTh colspan="3" scope="colgroup">
            Support
          </TitleTh>
        </tr>

        <tr>
          <Th scope="row">Sit dignissim.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Congue at nibh et.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Volutpat feugiat mattis.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Included in Essential</ScreenReaderSpan>
          </Td>
        </tr>

        <tr>
          <Th scope="row">Tristique pellentesque ornare diam sapien.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Basic</ScreenReaderSpan>
          </Td>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>Not included in Essential</ScreenReaderSpan>
          </Td>
        </tr>
      </Body>
      <tfoot>
        <FooterRow>
          <ScreenReaderTh scope="row">Choose your plan</ScreenReaderTh>
          <BottomButtonWrapper>
            <Button href="#">Buy Basic</Button>
          </BottomButtonWrapper>
          <BottomButtonWrapper>
            <Button href="#">Buy Essential</Button>
          </BottomButtonWrapper>
        </FooterRow>
      </tfoot>
    </Table>
  </LargeScreenWrapper>
);

export default ComparisonTable;
