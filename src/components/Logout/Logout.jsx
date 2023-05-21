import React from 'react'
import { useDispatch } from 'react-redux';

import { useAuth0 } from "@auth0/auth0-react";

import { Styles, buttonVariants } from '../../pages/Login/Login.styles'
import { LOGOUT } from '../../pages/Redux/actions/user';
import { removeStorage } from '../../services/Auth'

export default function Logout() {
    const dispatch = useDispatch()

    const { logout } = useAuth0();

    const handleLogout = () => {
        logout()
        dispatch({
            type: LOGOUT,
        })
        removeStorage()
    }

    return (
        <Styles.Container>
            <Styles.StyledButton
                variants={buttonVariants}
                whileHover="hover"
                onClick={() => handleLogout()}
            >
                Sair!
            </Styles.StyledButton>
        </Styles.Container>
    )
}
