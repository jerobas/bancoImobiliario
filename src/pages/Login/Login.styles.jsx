import styled from "styled-components";
import { motion } from 'framer-motion';

export const Styles = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.h1`
    
  `,
  StyledButton: styled(motion.button)`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
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