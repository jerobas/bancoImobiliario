import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  width: 50%;
  border-radius: 20px;
  border: 1px solid #707070;

  header {
    display: flex;
    justify-content: center;
    padding: 32px 0;
    width: 100%;
    border-bottom: 1px solid #d2d2d2;
  }

  main {
    padding: 30px;
  }

  @media (max-width: 1107px) {
    padding: 28px 0px;
  }
`