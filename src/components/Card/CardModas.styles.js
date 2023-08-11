import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.dark.blue};
  height: 150px;
  width: 150px;
  background-color: #fff;
  border: 1px solid #707070;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    height: 100%;
  }
`;
