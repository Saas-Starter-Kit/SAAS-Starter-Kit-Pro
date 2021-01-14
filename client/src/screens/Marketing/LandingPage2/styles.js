import { createGlobalStyle } from 'styled-components';
import { breakpoints, colors } from '../../../styles/theme';

// Create global styles for Landing page 2
export const GlobalStyle = createGlobalStyle`
.drawer-content-wrapper {
  @media (max-width: ${breakpoints.medium}) {
    width: 300px !important;
  }
  .drawer-content {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: ${breakpoints.medium}) {
      padding: 50px 40px 30px 40px;
    }
    ul {
      padding-inline-start: 0px;
      margin-bottom: 40px;
      flex-grow: 1;
      @media (max-width: ${breakpoints.medium}) {
        margin-bottom: 30px;
      }
      li {
        margin-bottom: 35px;
        @media (max-width: ${breakpoints.medium}) {
          margin-bottom: 25px;
        }
        a {
          font-size: 20px;
          font-weight: 400;
          line-height: 20px;
          position: relative;
          transition: 0.15s ease-in-out;
          @media (max-width: ${breakpoints.medium}) {
            font-size: 18px;
          }
          &:hover {
            color: ${colors.cinnabar};
          }
          &:before {
            content: '';
            width: 7px;
            height: 7px;
            background: ${colors.cinnabar};
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
            color: ${colors.cinnabar};
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
    background-color: ${colors.white};
  }
  .sticky-outer-wrapper > .sticky-inner-wrapper > div {
    padding: 30px 0;
  }
`;
