import React from 'react';
import Joyride from 'react-joyride';
import styled from 'styled-components';

const StyledStep = styled.div`
  margin: 8rem;
`;

const StyledStepAlt = styled.div`
  margin: 2rem;
`;

const steps = [
  {
    target: '.step-1',
    content: 'This is the 1st awesome feature!'
  },
  {
    target: '.step-2',
    content: 'This is another awesome feature!'
  },
  {
    target: '.step-3',
    content: 'This is another awesome feature!'
  },
  {
    target: '.step-4',
    content: 'This is the last awesome feature!'
  }
];

const Onboarding = () => {
  return (
    <div>
      <div>
        <Joyride
          steps={steps}
          continuous={true}
          showSkipButton={true}
          locale={{
            last: 'End tour',
            skip: 'Close tour'
          }}
          styles={{
            tooltipContainer: {
              textAlign: 'left'
            },
            buttonNext: {
              backgroundColor: 'green'
            },
            buttonBack: {
              marginRight: 10
            }
          }}
        />
      </div>
      <div>Onboarding</div>
      <StyledStep className="step-1">Step 1</StyledStep>
      <StyledStepAlt className="step-2">Step 2</StyledStepAlt>
      <StyledStep className="step-3">Step 3</StyledStep>
      <StyledStepAlt className="step-4">Step 4</StyledStepAlt>
    </div>
  );
};

export default Onboarding;
