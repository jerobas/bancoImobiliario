import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';

import {isAlreadyAuthenticated} from '../services/Auth'

import Login from '../pages/Login/Login';
import Room from '../pages/Room/Room'
import Rooms from '../pages/Rooms/Rooms';
import { socket } from '../services/Auth';


const PrivateRoute = ({ component: Component, ...rest}) => {
    const isAuthenticatedLocal = isAlreadyAuthenticated()
    
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('getRooms');
        socket.on('updateRooms', (data) => {
            if(data && data.numberOfRooms > 0){
                dispatch({
                    type: 'ROOMS',
                    payload: data
                })
            }
            
        })
    }, [])



    return isAuthenticatedLocal ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default function RoutesPage() {
    return (
        <Router>
            <Switch>
                <Route path="/login" element={<Login />} />;
                <Route path="/" element={< PrivateRoute component={Rooms} />} />;
                <Route path="/room/:id" element={< PrivateRoute component={Room}  />} />;
            </Switch>
        </Router>
    )
}