import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ToDoList from "./components/ToDoList";

const Body = styled.body`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: ${(prop) => prop.theme.bgColor};
`;

const GlobalStyle = createGlobalStyle`
margin: 0;
padding: 0;
`;

function App() {
  return (
    <Body>
      <GlobalStyle />
      <ToDoList />
    </Body>
  );
}

export default App;
