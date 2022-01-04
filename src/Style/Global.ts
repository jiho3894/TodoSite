import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
  * {
    box-sizing: border-box;
    margin:0;
    border:0;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
    
  }

  li {
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
`;
