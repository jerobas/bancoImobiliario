import { styled } from "styled-components";

export const Column = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;

export const Row = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

export const RoomsContainer = styled(Column)`
    border: 3px solid #FFFFFF;
    border-radius: 10px;
    height: min-content;
    min-width: 400px;
    padding: 20px;

    input{
        border: none;
        border-radius: 8px;
        height: 2rem;
        outline: none;
        padding: 0 .5rem;
        width: 100%;
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
    background-size: cover;
    color: #FFFFFF;
    gap: 20px;
    height: 100%;

    justify-content: start;

    h1, h2 {	
        color: #FFFFFF;
    }

    h1 {
        font-size: 40px;
    }

    vertical-align: middle;

    width: 100%;
`;

export const RoomStyle = styled(Row)`
    cursor: pointer;
    justify-content: space-between;
    padding: 10px;
`;