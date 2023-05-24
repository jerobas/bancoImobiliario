import styled from 'styled-components'
import background from '../../assets/temporaryWallpaper.webp';

export const Styles = {
    Container: styled.main`
        background-image: url(${background});
        background-size: cover;
        display: flex;
        height: 100vh;
        overflow: hidden;
        width: 100vw;
        align-items: center;
        justify-content: center;
    `,
    Section: styled.section`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    `
}