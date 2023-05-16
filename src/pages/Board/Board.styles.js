import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 30px);
  grid-template-rows: repeat(11, 30px);
  margin: 0 auto;
  max-width: 880px;
  border: none;
  border-radius: 8px;
`;

export const Cards = styled.div`
 display: flex;
  background-color: blue;
  align-self: flex-start;
  padding: 2rem;
  margin: .785rem;
  width: 15px;
  height: 15px;
  border-radius: 8px;
`

export const Luck = styled.div`
  display: flex;
  background-color: blue;
  align-self: flex-end;
  padding: 2rem;
  margin: .785rem;
  width: 15px;
  height: 15px;
  border-radius: 8px;
`

export const ImageContainer = styled.div`
  grid-column: 2 / span 9;
  grid-row: 2 / span 9;
  background-color: red;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 8px;
`;


export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  background-color: #fff;
  border: 1px solid black;
  font-size: 12px;
  font-weight: bold;
  position: relative;
`;

export const Square = styled.div`
  margin: -5px 0 0 -5px;
  position: absolute;
  left: ${props => props.position.x1}px;
  top: ${props => props.position.y1}px;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  grid-column: 4;
  grid-row: 1;
  transition: left 0.5s ease, top 0.5s ease;
`;