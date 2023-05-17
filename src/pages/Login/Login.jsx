import React from 'react'
import { Styles, buttonVariants } from './Login.styles'
import Layout from '../../components/Layout/Layout';
import { useAuth0 } from "@auth0/auth0-react";
import {toast} from 'react-toastify'

export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Layout>
        <Styles.Container>
          <Styles.StyledButton
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => loginWithRedirect()}
          >
            Faça seu login!
          </Styles.StyledButton>
        </Styles.Container>
      </Layout>
    )

  )
}
