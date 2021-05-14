import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    ${/*@ts-ignore*/ null}
    background-color: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
  ul {
    list-style: none; 
  }
  li {
    display: flex;
    align-items: center;
  }
  li::before {
    content: "•";
    ${/*@ts-ignore*/ null}
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
  }
`;

export default GlobalStyle;
