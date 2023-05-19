import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #707070;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  width: 100%;

  header {
    border-bottom: 1px solid #d2d2d2;
    display: flex;
    justify-content: center;
    padding: 32px 0;
    width: 100%;
  }

  main {
    padding: 30px;
  }

  @media (max-width: 1107px) {
    padding: 28px 0px;
  }
`