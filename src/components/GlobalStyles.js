import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: #f6f7f9;
    font-family: 'Roboto', sans-serif;          
  }

  p {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
