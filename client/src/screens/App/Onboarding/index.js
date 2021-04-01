import React, { useState } from 'react';
//import Tour from 'reactour';
import styled from 'styled-components';
import PrimaryButton from '../../../components/Common/buttons/PrimaryButton';
import DoneButton from '../../../components/Common/buttons/CancelButton';
import Loadable from 'react-loadable';

//solves reactour ssr issue
const Tour = Loadable({
  loader: () => import('reactour'),
  loading: () => null
});

const StyledStep = styled.div`
  margin: 8rem;
  width: 5rem;
`;

const StyledStepAlt = styled.div`
  margin: 2rem;
  width: 5rem;
`;

const steps = [
  {
    selector: '.step-1',
    content: 'This is the 1st awesome feature!'
  },
  {
    selector: '.step-2',
    content: 'This is another awesome feature!'
  },
  {
    selector: '.step-3',
    content: 'This is another awesome feature!'
  },
  {
    selector: '.step-4',
    content: 'This is the last awesome feature!'
  }
];

const Onboarding = () => {
  const [isTourOpen, setTourOpen] = useState(false);

  return (
    <div>
      <h1>Onboarding</h1>
      <h2>Click Below To Start Tour</h2>
      <PrimaryButton onClick={() => setTourOpen(true)}>Start</PrimaryButton>
      <div>
        <Tour
          lastStepNextButton={<DoneButton>Done!</DoneButton>}
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={() => setTourOpen(false)}
        />
      </div>

      <StyledStep className="step-1">Step 1</StyledStep>
      <StyledStepAlt className="step-2">Step 2</StyledStepAlt>
      <StyledStep className="step-3">Step 3</StyledStep>
      <StyledStepAlt className="step-4">Step 4</StyledStepAlt>
    </div>
  );
};

export default Onboarding;
