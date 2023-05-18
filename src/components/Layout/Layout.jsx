import React from 'react'
import {useSelector} from 'react-redux'

import Logout from '../Logout/Logout';
import { Styles } from './Layout.styles'

export default function Layout(props) {
    const isAuthenticatedLocal = useSelector(state => state.auth.isAuthenticatedLocal);
    const { children, ...rest } = props;
    return (
        <Styles.Container>
            {isAuthenticatedLocal && <Logout />}
            <Styles.Content>
                <Styles.Section {...rest}>
                    {children}
                </Styles.Section>
            </Styles.Content>
        </Styles.Container>
    )
}