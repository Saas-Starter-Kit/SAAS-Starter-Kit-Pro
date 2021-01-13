import { createGlobalStyle, css } from 'styled-components';

export const theme = {
  primary: '#42389D',
  primaryHover: '#5145CD',
  backgroundLanding: 'lightblue'
};

export const colors = {
  blue300: '#A4CAFE',
  blue800: '#1E429F',
  blue900: '#233876',
  coolGray50: '#F8FAFC',
  coolGray100: '#F1F5F9',
  coolGray200: '#E2E8F0',
  coolGray300: '#CFD8E3',
  coolGray400: '#97A6BA',
  coolGray500: '#64748B',
  coolGray700: '#364152',
  coolGray900: '1A202E',
  gray50: '#F9FAFB',
  gray100: '#F4F5F7',
  gray200: '#E2E8F0',
  gray300: '#D2D6DC',
  gray400: '#97A6BA',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray900: '#161E2E',
  green100: '#DEf7EC',
  green500: '#0E9F6E',
  green800: '#03543F',
  indigo200: '#CDDBFE',
  indigo300: '#B4C6FC',
  indigo400: '#8DA2FB',
  indigo500: '#6875F5',
  indigo600: '#5850EC',
  indigo700: '#5145CD',
  indigo800: '#42389D',
  indigo900: '42389D',
  red100: '#FDE8E8',
  red500: '#F05252',
  red800: '#9B1C1C',
  white: '#FFFFFF'
};

export const landingPage2Colors = {
  athensGray: '#F1F4F6',
  cinnabar: '#EB4D4B',
  firefly: '#0F2137',
  brightGray: '#343D48CC',
  royalBlue: '#5167DB',
  royalBlue20: 'rgba(82, 104, 219, 0.2)',
  white: '#FFFFFF',
  feijo: '#93D26E'
};

export const breakpoints = {
  small: '640px',
  medium: '768px',
  large: '1024px',
  extraLarge: '1280px'
};

export const landingPage2Breakpoints = {
  extraSmall: '480px',
  small: '575px',
  medium: '768px',
  large: '990px',
  extraLarge: '1220px',
  xxl: '1440px'
};

export const transform = css`
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y))
    rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))
    scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
`;

export const fieldStyles = css`
  appearance: none;
  background-color: #ffffff;
  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 0.375rem;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: ${breakpoints.small}) {
    font-size: 0.875rem;
  }
  line-height: 1.25rem;
`;

// Create global styles for Landing page 2
export const LandingPage2GlobalStyle = createGlobalStyle`
.drawer-content-wrapper {
  @media (max-width: ${landingPage2Breakpoints.medium}) {
    width: 300px !important;
  }
  .drawer-content {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: ${landingPage2Breakpoints.medium}) {
      padding: 50px 40px 30px 40px;
    }
    ul {
      padding-inline-start: 0px;
      margin-bottom: 40px;
      flex-grow: 1;
      @media (max-width: ${landingPage2Breakpoints.medium}) {
        margin-bottom: 30px;
      }
      li {
        margin-bottom: 35px;
        @media (max-width: ${landingPage2Breakpoints.medium}) {
          margin-bottom: 25px;
        }
        a {
          font-size: 20px;
          font-weight: 400;
          line-height: 20px;
          position: relative;
          transition: 0.15s ease-in-out;
          @media (max-width: ${landingPage2Breakpoints.medium}) {
            font-size: 18px;
          }
          &:hover {
            color: ${landingPage2Colors.cinnabar};
          }
          &:before {
            content: '';
            width: 7px;
            height: 7px;
            background: ${landingPage2Colors.cinnabar};
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: -15px;
            transform: translateY(-50%);
            opacity: 0;
          }
        }
        &.is-current {
          a {
            color: ${landingPage2Colors.cinnabar};
            &:before {
              opacity: 1;
            }
          }
        }
      }
    }
    .navbar_drawer_button button {
      width: 100%;
    }
  }
}

  .sticky-outer-wrapper.active > .sticky-inner-wrapper > div {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    transition: 0.35s ease-in-out;
    padding: 15px 0;
    background-color: ${landingPage2Colors.white};
  }
  .sticky-outer-wrapper > .sticky-inner-wrapper > div {
    padding: 30px 0;
  }
`;
