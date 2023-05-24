import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import background from '../../assets/temporaryWallpaper.webp';
import Layout from '../../components/Layout/Layout';
import { socket } from '../../services/Auth';
import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom/JoinRoom';
import { Row, Column, RoomsContainer, RoomsPage, Button, RoomStyle } from './Rooms.styles';
import {getUserFromLocalStorage} from '../../services/Auth'

export default function Rooms() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const salas = useSelector(state => state.room)
    const user = getUserFromLocalStorage()

    const [searchInput, setSearchInput] = useState('')
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [joinIsVisible, setJoinIsVisible] = useState(false)
    const [selectedRoom, setSelectedRoom] = React.useState(NaN);
    const [full, setFull] = useState(false)
    const [room, setRoom] = useState({
        name: '',
        password: '',
        hasPasswod: false,
    })
    const [loading, setLoading] = useState(false)

    const Room = ({ children, selected, onClick }) => <RoomStyle onClick={onClick} style={{ backgroundColor: selected ? '#FFFFFF20' : 'transparent' }}>{children}</RoomStyle>

    const handleJoinRoom = () => {
        if (room.hasPasswod) {
            setJoinIsVisible(true)
            socket.on('joined', data => {
                if (data) {
                    navigate(`/room/${room.name}`)
                    socket.emit('getRooms');
                }
            })
        }
        else {
            socket.emit('joinRoom', {
                roomId: room.name,
                password: '',
                userEmail: user
            })
            socket.on('joined', data => {
                if (data) {
                    navigate(`/room/${room.name}`)
                    socket.emit('getRooms');
                }
            })
        }
    }

    const CreateRoomButton = () => <Button onClick={() => { setIsVisible(true) }}>Criar sala</Button>

    const JoinRoomButton = () => <Button disabled={full || !(selectedRoom < salas.numberOfRooms)} onClick={() => { handleJoinRoom() }}>Entrar na sala</Button>


    const handleModalClose = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        setLoading(true)
        try {
            setSearchInput('');
            socket.emit('getRooms');
            socket.on('updateRooms', (data) => {
            if(data && data.hasRooms){
                dispatch({
                    type: 'ROOMS',
                    payload: data
                })
            }
                
            })
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }, [])

    useEffect(() => {
        if (debouncedSearchInput.length === 0) {
            dispatch({
                type: 'CLEAN_FILTER',
            })
        } else {
            dispatch({
                type: 'SET_FILTER',
                payload: debouncedSearchInput,
            })
        }
    }, [debouncedSearchInput])

    const debounce = (func, timeout = 300) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout)
        }
    }

    const handleSearchInputChange = (e) => {
        const inputVal = e.target.value
        setSearchInput(inputVal)
        debounceDispatch(inputVal)
    }

    const debounceDispatch = debounce((inputVal) => {
        setDebouncedSearchInput(inputVal)
    }, 300)


    return (
        <Layout>
            {
                !loading && (
                    <RoomsPage>
                    <RoomsContainer>
                        <div>
                            <h2>Número de Salas: {salas.numberOfRooms ? salas.numberOfRooms : 0}</h2>
                            <Column 
                                    style={{ width: '100%', padding: '10px' }}
                                >
                                <input
                                    placeholder='Buscar sala...'
                                    onChange={handleSearchInputChange}
                                    value={searchInput}
                                />
                            </Column>
                        </div>
                        <div style={{minHeight: '3rem'}}>
                        {
                            salas.hasRooms && salas.rooms?.map((sala, index) =>
                                    <Room 
                                    style={{backgroundColor: 'red'}}
                                    selected={index === selectedRoom} 
                                    onClick={() => {
                                        setSelectedRoom(index)
                                        setRoom({ ...setRoom, name: sala[1], hasPasswod: sala[2], nameShown: sala[0] })
                                        setFull(sala[3])
                                    }} 
                                    key={index}
                                >
                                    <Row 
                                        style={{ width: "max-content", gap: '.3rem' }}
                                    >
                                        <p>{index + 1} - {sala[0]}</p>
                                        {sala[2] ? <FaLock /> : null}
                                    </Row>
                                    <p 
                                        style={{ color: sala[3] ? 'red' : 'green', marginLeft: '.5rem' }}
                                    >
                                        {sala[4]}/4
                                    </p>
                                </Room>
                            )
                        }
                         </div>   
                    </RoomsContainer>
                    <Row style={{ gap: '20px' }}>
                        <CreateRoomButton />
                        <JoinRoomButton />
                    </Row>
                    <CreateRoom
                isOpen={isVisible}
                handleClose={handleModalClose}
            />
            <JoinRoom
                isOpen={joinIsVisible}
                handleClose={() => { setJoinIsVisible(false) }}
                roomName={room.nameShown}
                roomId={room.name}
            />
            </RoomsPage>
                )
                           
            }
        </Layout >
    )
}