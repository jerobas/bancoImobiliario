import { styled } from "styled-components";

export const Styles = {
    Container: styled.div`
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    `,
    ChatArea: styled.div`
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
    `,
    ChatContainer: styled.div`
        background: ${props => props.theme.light.black};
        border: none;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        height: 7rem;
        justify-content: space-between;
        padding:0.75rem;
        width: 20rem;

        ul{
            border-radius: 8px;
            margin-bottom: .3rem;
            max-height: 4rem;
            overflow-y: scroll;

        }
        li{
            display: flex;
            font-size: 0.8rem;
            justify-content: left;
            margin-right: 0.5rem;
        }
        li + li {
            margin-top: 0.4rem;
        }
        strong{
            font-size: .85rem;
            margin-right: .2rem;
        }
        #icon{
            margin-left: 0.42rem;
            margin-right: .3rem;
            opacity: .2;
        }
        > div{
            align-items: center;
            background-color: ${props => props.theme.colors.White_300};
            border: none;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            outline: none;
            width: 100%;
        }
        input{
            background: transparent;
            border: none;
            border-radius: 8px;
            color: ${props => props.theme.dark.black};
            outline: none;
            padding: .2rem;
            width: 100%;
        }
    `,
    GameArea: styled.div`
        align-items: center;
        justify-content: center;
    
    `

}