//loading animation
import styled, { keyframes } from 'styled-components';

const rotateOne = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
`;

const rotateTwo = keyframes`
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
`;

const rotateThree = keyframes`
 0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
`;

const StyledOverlay = styled.div`
  z-index: 9;
  background-color: black;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Loader = styled.div`
  position: relative;
  top: 50%;
  left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  perspective: 480px;
`;

const WaveOne = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  left: 0%;
  top: 0%;
  animation: ${rotateOne} 1.15s linear infinite;
  border-bottom: 8px solid ${(props) => props.theme.primary}; ;
`;

const WaveTwo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  right: 0%;
  top: 0%;
  animation: ${rotateTwo} 1.15s linear infinite;
  border-right: 8px solid ${(props) => props.theme.primary}; ;
`;

const WaveThree = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  right: 0%;
  bottom: 0%;
  animation: ${rotateThree} 1.15s linear infinite;
  border-top: 8px solid ${(props) => props.theme.primary}; ;
`;

const LoadingOverlay = () => (
  <div>
    <Loader>
      <WaveOne />
      <WaveTwo />
      <WaveThree />
    </Loader>
    <StyledOverlay />
  </div>
);

export default LoadingOverlay;
