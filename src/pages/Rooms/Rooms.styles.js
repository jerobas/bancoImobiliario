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
    //flex-grow: 1;
    border: 3px solid #FFFFFF;
    border-radius: 10px;
    height: min-content;
    min-width: 400px;
    padding: 20px;
`;

export const Button = styled.button`
    background-color: aliceblue;
    border-radius: 5px;

    &:disabled {
        background-color: #FF0000;
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