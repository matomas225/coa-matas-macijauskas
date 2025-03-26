import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
   font-family: 'circular-black';
   src: url('/src/assets/fonts/circular-black.ttf') format('truetype');
   font-weight: normal;
   font-style: normal;
  }

  html{
    font-family: "circular-black";
  }

`;

export default GlobalStyle;
