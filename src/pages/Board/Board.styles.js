import styled from 'styled-components';

export const BoardContainer = styled.div`
  border: none;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(11, 30px);
  grid-template-rows: repeat(11, 30px);
  margin: 0 auto;
  max-width: 880px;
`;


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
  background-color: green;
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