import { motion } from 'framer-motion';
import styled from "styled-components";

export const Styles = {
  Container: styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  Title: styled.h1`
    
  `,
  StyledButton: styled(motion.button)`
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
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