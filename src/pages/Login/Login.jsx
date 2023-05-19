import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useAuth0 } from "@auth0/auth0-react";

import Layout from '../../components/Layout/Layout';
import { Styles, buttonVariants } from './Login.styles'


export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const originalText = 'Um jogo de tabuleiro diferente de todos os outros!';
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    let timerId = null;
    const typeText = () => {
      setText(originalText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex <= originalText.length) {
        timerId = setTimeout(typeText, typingSpeed);
      }
      if(currentIndex === originalText.length) setProgress(100);
    };

    typeText();

    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    isAuthenticated && (
      <Layout>
        <Styles.Container>
          <Styles.Content>


            <Styles.TypingText>
              {text}
              <Styles.Line progress={progress} />
            </Styles.TypingText>
            <Styles.StyledButton
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => loginWithRedirect()}
            >
              Fazer login!
            </Styles.StyledButton>
          </Styles.Content>
        </Styles.Container>
      </Layout>
    )

  )
}
