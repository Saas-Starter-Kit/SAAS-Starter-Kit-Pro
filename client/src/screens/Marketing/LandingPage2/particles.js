import React from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import { landingPage2Breakpoints as breakpoints } from '../../../styles/theme';
import Particle1 from '../../../assets/images/LandingPage2/particles/particle-1.png';
import Particle2 from '../../../assets/images/LandingPage2/particles/particle-2.png';
import Particle3 from '../../../assets/images/LandingPage2/particles/particle-3.png';
import Particle4 from '../../../assets/images/LandingPage2/particles/particle-4.png';
import Particle5 from '../../../assets/images/LandingPage2/particles/particle-5.png';
import Particle6 from '../../../assets/images/LandingPage2/particles/particle-6.png';

const StyledParticles = styled(Particles)`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  @media only screen and (max-width: ${breakpoints.extraSmall}) {
    width: 100%;
  }
`;

const ParticlesComponent = () => (
  <StyledParticles
    params={{
      particles: {
        number: {
          value: 6,
          density: { enable: true, value_area: 800 }
        },

        shape: {
          type: ['images'],
          images: [
            {
              src: `${Particle1}`,
              width: 25,
              height: 25
            },
            {
              src: `${Particle2}`,
              width: 18,
              height: 18
            },
            {
              src: `${Particle3}`,
              width: 32,
              height: 32
            },
            {
              src: `${Particle4}`,
              width: 41,
              height: 41
            },
            {
              src: `${Particle5}`,
              width: 22,
              height: 22
            },
            {
              src: `${Particle6}`,
              width: 22,
              height: 22
            }
          ]
        },
        opacity: {
          value: 1.5,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 1.5, sync: false }
        },
        size: {
          value: 10,
          random: false
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: false,
          straight: false,
          bounce: true,
          attract: { enable: true, rotateX: 100, rotateY: 400 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    }}
  />
);

export default ParticlesComponent;
