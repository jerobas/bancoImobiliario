import { styled } from "styled-components";

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const RoomsContainer = styled(Column)`
    border-radius: 10px;
    //flex-grow: 1;
    border: 3px solid #FFFFFF;
    padding: 20px;
    height: min-content;
    min-width: 400px;
`;

export const Button = styled.button`
    border-radius: 5px;
    background-color: aliceblue;

    &:disabled {
        background-color: #FF0000;
    }	
`;

export const RoomsPage = styled(Column)`
    justify-content: start;
    height: 100%;
    background-size: cover;
    width: 100%;

    color: #FFFFFF;

    h1, h2 {	
        color: #FFFFFF;
    }

    h1 {
        font-size: 40px;
    }

    gap: 20px;

    vertical-align: middle;
`;

export const RoomStyle = styled(Row)`
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
`;