//loading animation
import styled from 'styled-components';

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
  animation: cssload-rotate-one 1.15s linear infinite;
  border-bottom: 8px solid var(--primary-color);
`;

const WaveTwo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  right: 0%;
  top: 0%;
  animation: cssload-rotate-two 1.15s linear infinite;
  border-right: 8px solid var(--primary-color);
`;

const WaveThree = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  right: 0%;
  bottom: 0%;
  animation: cssload-rotate-three 1.15s linear infinite;
  border-top: 8px solid var(--primary-color);
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
