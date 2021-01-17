import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import Button from './button';
import Tick from './tick.svg';
import Minus from './minus.svg';

const Wrapper = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
`;

const Package1TitleWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Package2TitleWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 4rem;
`;

const Title = styled.h2`
  color: ${colors.gray900};
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5rem;
`;

const Price = styled.p`
  margin-top: 1rem;
`;

const Number = styled.span`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  color: ${colors.gray900};
`;

const Frequency = styled.span`
  font-weight: 500;
  color: ${colors.gray500};
  font-size: 1rem;
  line-height: 1.5rem;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  color: ${colors.gray500};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const TopButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

const BottomButtonWrapper = styled.div`
  border-top: 1px solid ${colors.gray200};
  padding: 1.25rem 1rem 0;
`;

const Table = styled.table`
  width: 100%;
`;

const FirstTable = styled(Table)`
  margin-top: 2rem;
`;

const Caption = styled.caption`
  background-color: ${colors.gray50};
  color: ${colors.gray900};
  text-align: left;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${colors.gray200};
  font-size: 0.875rem;
  line-height: 1.25rem;
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

const TBody = styled.tbody`
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
  --tw-divide-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-divide-opacity));
`;

const Tr = styled.tr`
  border-top: 1px solid ${colors.gray200};
`;

const Th = styled.th`
  padding: 1.25rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: ${colors.gray500};
  text-align: left;
`;

const Td = styled.td`
  padding: 1.25rem 1rem 1.25rem 0;
  text-align: right;
`;

const Icon = styled.img`
  margin-left: auto;
  height: 1.25rem;
  width: 1.25rem;
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

const TdSpan = styled.span`
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  text-align: right;
`;

const ComparisonTable = () => (
  <Wrapper>
    <Package1TitleWrapper>
      <Title>Basic</Title>
      <Price>
        <Number>$9</Number>
        <Frequency>/mo</Frequency>
      </Price>
      <Subtitle>Quis suspendisse ut fermentum neque vivamus non tellus.</Subtitle>
      <TopButtonWrapper>
        <Button href="#">Buy Basic</Button>
      </TopButtonWrapper>
    </Package1TitleWrapper>
    <FirstTable>
      <Caption>Features</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Molestie lobortis massa.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Urna purus felis.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Tellus pulvinar sit dictum.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Convallis.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>
      </TBody>
    </FirstTable>
    <Table>
      <Caption>Reporting</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Adipiscing.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Eget risus integer.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Gravida leo urna velit.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Elementum ut dapibus mi feugiat cras nisl.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>
      </TBody>
    </Table>
    <Table>
      <Caption>Support</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Sit dignissim.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Congue at nibh et.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Volutpat feugiat mattis.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Tristique pellentesque ornare diam sapien.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>
      </TBody>
    </Table>
    <BottomButtonWrapper>
      <Button href="#">Buy Basic</Button>
    </BottomButtonWrapper>
    <Package2TitleWrapper>
      <Title>Essential</Title>
      <Price>
        <Number>$29</Number>
        <Frequency>/mo</Frequency>
      </Price>
      <Subtitle>Quis eleifend a tincidunt pellentesque. A tempor in sed.</Subtitle>
      <TopButtonWrapper>
        <Button href="#">Buy Essential</Button>
      </TopButtonWrapper>
    </Package2TitleWrapper>
    <FirstTable>
      <Caption>Features</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Molestie lobortis massa.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Urna purus felis.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Tellus pulvinar sit dictum.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Convallis.</Th>
          <Td>
            <TdSpan>Up to 20 users</TdSpan>
          </Td>
        </Tr>
      </TBody>
    </FirstTable>
    <Table>
      <Caption>Reporting</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Adipiscing.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Eget risus integer.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Gravida leo urna velit.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Elementum ut dapibus mi feugiat cras nisl.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>
      </TBody>
    </Table>
    <Table>
      <Caption>Support</Caption>
      <thead>
        <tr>
          <ScreenReaderTh scope="col">Feature</ScreenReaderTh>
          <ScreenReaderTh scope="col">Included</ScreenReaderTh>
        </tr>
      </thead>
      <TBody>
        <Tr>
          <Th scope="row">Sit dignissim.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Congue at nibh et.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Volutpat feugiat mattis.</Th>
          <Td>
            <Icon src={Tick} />
            <ScreenReaderSpan>Yes</ScreenReaderSpan>
          </Td>
        </Tr>

        <Tr>
          <Th scope="row">Tristique pellentesque ornare diam sapien.</Th>
          <Td>
            <Icon src={Minus} />
            <ScreenReaderSpan>No</ScreenReaderSpan>
          </Td>
        </Tr>
      </TBody>
    </Table>
    <BottomButtonWrapper>
      <Button href="#">Buy Essential</Button>
    </BottomButtonWrapper>
  </Wrapper>
);

export default ComparisonTable;
