import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Remove default font styles */
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #DADADA;
    color: #000;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit; 
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
  }
`;

export default GlobalStyles;
