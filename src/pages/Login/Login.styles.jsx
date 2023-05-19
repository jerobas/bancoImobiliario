import { motion } from 'framer-motion';
import styled from "styled-components";

import background from '../../assets/temporaryWallpaper.webp';

export const Styles = {
  Container: styled.div`
    align-items: center;
    background-image: url(${background});
    background-size: cover;
    display: flex;
    height: 100%;
    justify-content: center;
  `,
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2;
    max-width: 0 1200px;
  `,
  TypingText: styled.span`
    color: #fff;
    cursor: default;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.075rem;
    margin: 2rem;
    white-space: nowrap;
  `,
   Line: styled.div`
    background-color: #fff;
    border: 8px; 
    height: 0.05rem;
    left: 0;
    margin-top: 0.17rem;
    transition: width 1s ease-in-out;
    width: ${props  => props.progress}%;
  `,
  StyledButton: styled(motion.button)`
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 0.0755rem
    padding: 10px 20px;
  `
}

export const buttonVariants = {
  hover: {
    backgroundColor: '#0056b3',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}