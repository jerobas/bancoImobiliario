import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Room from '../pages/Room/Room'
import Rooms from '../pages/Rooms/Rooms';
import { socket } from '../services/Auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticatedLocal = useSelector(state => state.auth.isAuthenticatedLocal);
    const { user, isAuthenticated } = useAuth0()
    const dispacth = useDispatch()

    useEffect(() => {
        socket.emit('getRooms');
        socket.on('updateRooms', (data) => {
            dispacth({
                type: 'ROOMS',
                payload: data
            })
        })
    }, [])

    
    if (isAuthenticated) {
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
                <Route path="/" element={< PrivateRoute component={Home} />} />;
                <Route path="/login" element={<Login />} />;
                <Route path="/rooms" element={< PrivateRoute component={Rooms} />} />;
                <Route path="/room/:id" element={< PrivateRoute component={Room} />} />;
            </Switch>
        </Router>
    )
}