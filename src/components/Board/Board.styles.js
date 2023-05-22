import styled from 'styled-components';

const playerColor = {
  0: props => props.theme.dark.green,
  1: props => props.theme.dark.blue,
  2: props => props.theme.dark.pink,
  3: props => props.theme.dark.yellow
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  align-items: center;
  justify-content: center;

  >div{
    min-height: 2rem;
  }

  button{
    width: 8rem;
    border: none;
    border-radius: 8px;
    height: 2rem;
    background-color: green;
    font-weight: bold;
    color: white;
    letter-spacing: 1.2px;
    font-size: 1rem;
  }

` 

export const GameLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`

export const BoardContainer = styled.div`
  border: none;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(11, 30px);
  grid-template-rows: repeat(11, 30px);
  margin: 0 auto;
  max-width: 880px;
`;

export const PlayersContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

` 

export const StartGame = styled.button`
  align-items: center;
  background-color: ${props => props.theme.dark.blue};
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.colors.White_300};
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  height: 2.5rem;
  justify-content: center;
  letter-spacing: 1.2px;
  outline: none;
  padding: 0.075rem;
  width: 4.5rem;

  &:focus{
    border-color: ${props => props.theme.darkest.blue};
  }
`


export const Cards = styled.div`
 align-self: flex-start;
  background-color: blue;
  border-radius: 8px;
  display: flex;
  height: 15px;
  margin: .785rem;
  padding: 2rem;
  width: 15px;
`

export const Luck = styled.div`
  align-self: flex-end;
  background-color: blue;
  border-radius: 8px;
  display: flex;
  height: 15px;
  margin: .785rem;
  padding: 2rem;
  width: 15px;
`

export const ImageContainer = styled.div`
  background-color: red;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  grid-column: 2 / span 9;
  grid-row: 2 / span 9;
  justify-content: space-between;
`;


export const Cell = styled.div`
  align-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid black;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  justify-items: center;
  position: relative;
  
`;

export const Square = styled.div`
  background-color: ${props => playerColor[props.color](props)};
  border-radius: 50%;
  grid-column: 4;
  grid-row: 1;
  height: 10px;
  left: ${props => props.position.x1}px;
  margin: -5px 0 0 -5px;
  position: absolute;
  top: ${props => props.position.y1}px;
  transition: left 0.5s ease, top 0.5s ease;
  width: 10px;
`;