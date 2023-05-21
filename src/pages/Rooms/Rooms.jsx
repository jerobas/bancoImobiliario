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


export default function Rooms() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const salas = useSelector(state => state.room)
    const user = useSelector(state => state.auth)

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

    const Room = ({ children, selected, onClick }) => <RoomStyle onClick={onClick} style={{ backgroundColor: selected ? '#FFFFFF20' : 'transparent' }}>{children}</RoomStyle>

    useEffect(() => {
        console.log('d')
    },[true])

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
                userEmail: user.user.name
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
        socket.emit('getRooms');
        socket.on('updateRooms', (data) => {
            dispatch({
                type: 'ROOMS',
                payload: data
            })
        })
    }, [])

    useEffect(() => {
        setSearchInput('');
    }, []);


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
            <RoomsPage style={{ backgroundImage: `url(${background})` }}>
                <RoomsPage style={{ backgroundColor: `#030b13AA`, padding: '40px' }}>
                    <RoomsContainer>
                        <h2>Número de Salas: {salas.numberOfRooms}</h2>
                        <Column style={{ width: '100%', padding: '10px' }}>
                            <input
                                placeholder='Buscar sala...'
                                onChange={handleSearchInputChange}
                                value={searchInput}
                            />
                        </Column>
                        {

                            salas && salas.rooms?.map((sala, index) =>
                                <Room selected={index === selectedRoom} onClick={() => {
                                    setSelectedRoom(index)
                                    setRoom({ ...setRoom, name: sala[1], hasPasswod: sala[2], nameShown: sala[0] })
                                    setFull(sala[3])
                                }} key={index}>
                                    <Row style={{ width: "max-content", gap: '5px' }}>
                                        <p>{index + 1} - {sala[0]}</p>
                                        {sala[2] ? <FaLock /> : null}
                                    </Row>
                                    <p style={{ color: sala[3] ? 'red' : 'green' }}>{sala[4]}/4</p>
                                </Room>)
                        }
                    </RoomsContainer>
                    <Row style={{ gap: '20px' }}>
                        <CreateRoomButton />
                        <JoinRoomButton />
                    </Row>
                </RoomsPage>
            </RoomsPage>
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
        </Layout >
    )
}