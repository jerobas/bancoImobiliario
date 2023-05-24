import { styled } from "styled-components";

export const Column = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    label{
        color: ${props => props.theme.dark.blue};
    }
    @media (max-width: 768px) {
      line-height: 2rem;
      font-size: 1.15rem;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const RoomsContainer = styled(Column)`
    min-height: 10rem;
    div{
        width: 100%;
    }
    h2{
        text-align: center;
    }
    input{
        border: none;
        border-radius: 8px;
        height: 2rem;
        outline: none;
        width: 100%;
        padding: 0 .5rem;
    }
`;

export const Button = styled.button`
    align-items: center;
    background-color: ${props => props.theme.colors.White_400};
    border: none;
    border-radius: 8px;
    color: ${props => props.theme.dark.blue};
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    height: 1.75rem;
    justify-content: center;
    letter-spacing: 0.047rem;
    outline: none;
    padding: 0.7rem;
    transition: .4s ease all;
    width: auto;

    &:hover{
      color: ${props => props.theme.vivid.blue};
    }
    &:disabled {
        display: none;
    }	
`;

export const RoomsPage = styled(Column)`
    color: #FFFFFF;
    padding: 2rem;
    justify-content: start;
    height: 80%;
    h1, h2 {	
        color: #FFFFFF;
    }

    h1 {
        font-size: 3rem;
    }
    
`;

export const RoomStyle = styled(Row)`
    cursor: pointer;
    justify-content: space-between;
    padding: 10px;
    
`;