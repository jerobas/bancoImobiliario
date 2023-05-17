import styled from 'styled-components'

export const Styles = {
    Container: styled.main`
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f5f5f5;
        padding: 30px;
        @media (max-width: 768px) {
            padding: 50px 30px;
        }
    `,
    Content: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
    `,
    Section: styled.section`
        display: flex;
        flex-flow: column nowrap;
    `
}