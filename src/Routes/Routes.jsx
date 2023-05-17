import React from 'react'
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Board from '../pages/Board/Board';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../pages/Login/Login';
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticatedLocal = useSelector(state => state.auth.isAuthenticatedLocal);
    const {user, isAuthenticated} = useAuth0()
    const dispacth = useDispatch()
    if(isAuthenticated && !isAuthenticatedLocal){
        dispacth({
            type: 'LOGIN_SUCCESS',
            payload: user
        })
    }

    return isAuthenticatedLocal ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default function Routes() {
    return (
        
        <Router>
            <Switch>
                <Route path="/" element={< PrivateRoute component={Board} />} />;
                <Route path="/login" element={<Login />} />;
            </Switch>
        </Router>
    )
}