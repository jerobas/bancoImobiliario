import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";

import Login from '../pages/Login/Login';
import Room from '../pages/Room/Room'
import Rooms from '../pages/Rooms/Rooms';
import { socket } from '../services/Auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('getRooms');
        socket.on('updateRooms', (data) => {
            dispatch({
                type: 'ROOMS',
                payload: data
            })
        })
    }, [])

    
    if (isAuthenticated) {
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: user
        })
    }


    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/login" element={<Login />} />;
                <Route path="/" element={< PrivateRoute component={Rooms} />} />;
                <Route path="/room/:id" element={< PrivateRoute component={Room} />} />;
            </Switch>
        </Router>
    )
}