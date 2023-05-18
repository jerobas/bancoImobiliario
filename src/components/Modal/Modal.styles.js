import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: auto;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  overscroll-behavior: contain;
  &.active {
    display: flex;
  }
  @media screen and (max-width: 600px) {
    padding: 8px;
  }
`;

export const Wrapper = styled.section`
  border-radius: 8px;
  display: flex;
  width: ${(props) => props.hasWidth ? props.width : "100%"};
  height: ${(props) => props.hasHeight ? props.height : "100%"};
  background-color: ${props => props.theme.colors.quaternary};
  padding: 1.5rem;
`
