import React, { useState, useEffect } from 'react'

import Layout from '../../components/Layout/Layout';
import { Styles, buttonVariants } from './Login.styles'
import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {saveUserInStorage} from '../../services/Auth'
const userSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório!').min(1, 'Precisa ter no mínimo 1 letra!').max(20, 'Pode ter no máximo 15 letras!'),
})


export default function Login() {

  const navigate = useNavigate()
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const originalText = 'Um jogo de tabuleiro diferente de todos os outros!';
  const typingSpeed = 100;

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({
        mode: 'onChange',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        resolver: zodResolver(userSchema)
    })

  useEffect(() => {
    let currentIndex = 0;
    let timerId = null;
    const typeText = () => {
      setText(originalText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex <= originalText.length) {
        timerId = setTimeout(typeText, typingSpeed);
      }
      if (currentIndex === originalText.length) setProgress(100);
    };

    typeText();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleLogin = (data) => {
    saveUserInStorage(data.name)
    navigate('/')
  }

  addEventListener("input", () => {
    let input = document.getElementById("input");
    if(errors.name){
      input.style.outlineColor = '#861515'
      input.placeholder = errors.name.message
    }

  });

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.TypingText>
            {text}
            <Styles.Line progress={progress} />
          </Styles.TypingText>

<div>
<form onSubmit={handleSubmit(handleLogin)}>
<input
                                    type="text"
                                    autoComplete="off"
                                    id="input"
                                    placeholder='Seu nome'
                                    {...register('name')}
                                />
          <Styles.StyledButton
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => {

            }}
          >
            Fazer login!
          </Styles.StyledButton>
</form>
</div>


        </Styles.Content>
      </Styles.Container>
    </Layout>

  )
}
