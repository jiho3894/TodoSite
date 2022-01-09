import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
${reset}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Oswald', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  margin: 0;
  padding: 0;
}
a {
  text-decoration:none;
  color: inherit;
}`;
