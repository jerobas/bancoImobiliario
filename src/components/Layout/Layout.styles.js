import styled from 'styled-components'

export const Styles = {
    Container: styled.main`
        background-color: #f5f5f5;
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        overflow-x: hidden;
        //overflow-y: auto;
        //padding: 30px;
        width: 100%;
        @media (max-width: 768px) {
            padding: 50px 30px;
        }
    `,
    Content: styled.div`
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    `,
    Section: styled.section`
        display: flex;
        flex-flow: column nowrap;
        flex-grow: 1;
    `
}