import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import background from '../../assets/temporaryWallpaper.webp';
import Layout from '../../components/Layout/Layout';
import { socket } from '../../services/Auth';
import CreateRom from '../CreateRom/CreateRom';
import { Row, Column, RoomsContainer, RoomsPage, Button, RoomStyle } from './Rooms.styles';


export default function Rooms() {
    const salas = useSelector(state => state.room)
    const [isVisible, setIsVisible] = useState(false)
    const dispacth = useDispatch()
    const [selectedRoom, setSelectedRoom] = React.useState(NaN);
    const [joined, setJoined] = useState(false)
    const [full, setFull] = useState(false)
    const [room, setRoom] = useState({
        name: '',
        password: '',
        hasPasswod: false
    })

    const Room = ({ children, selected, onClick }) => <RoomStyle onClick={onClick} style={{ backgroundColor: selected ? '#FFFFFF20' : 'transparent' }}>{children}</RoomStyle>

    const handleJoinRoom = () => {
        if (room.hasPasswod) {
            socket.emit('joinRoom', room.name, room.password)
            socket.on('joined', data => setJoined(data))
        }
        else {
            socket.emit('joinRoom', room.name)
            socket.on('joined', data => setJoined(data))
        }
    }

    const CreateRoomButton = () => <Button onClick={() => { setIsVisible(true) }}>Criar sala</Button>

    const JoinRoomButton = () => <Button disabled={full} onClick={() => { handleJoinRoom() }}>Entrar na sala</Button>



    const handleModalClose = () => {
        setIsVisible(false)
    }



    useEffect(() => {
        socket.emit('getRooms');
        socket.on('updateRooms', (data, a, roomId, hasPassword, isFull) => {
            dispacth({
                type: 'ROOMS',
                payload: {
                    rooms: data.map((nome, index) => [nome, a[index], roomId[index], hasPassword[index], isFull[index]]),
                    numberOfRoom: data.length
                }
            })
        })
    }, [isVisible])

    useEffect(() => {
        if (joined) {
            socket.emit('getRooms');
            socket.on('updateRooms', (data, a, roomId, hasPassword, isFull) => {
                dispacth({
                    type: 'ROOMS',
                    payload: {
                        rooms: data.map((nome, index) => [nome, a[index], roomId[index], hasPassword[index], isFull[index]]),
                        numberOfRoom: data.length
                    }
                })
            })
        }
    }, [joined])

    return (
        <Layout>
            <RoomsPage style={{ backgroundImage: `url(${background})` }}>
                <RoomsPage style={{ backgroundColor: `#030b13AA`, padding: '40px' }}>
                    <h1>Multiplayer Online</h1>
                    <RoomsContainer>
                        <h2>Salas disponíveis: {salas.numberOfRoom}</h2>
                        <Column style={{ width: '100%', padding: '10px' }}>
                            <input placeholder='Search' style={{ width: '100%', height: '20px', borderRadius: '10px', padding: '0 8px' }} />
                            <Row>
                                <Row style={{ gap: '5px' }}>
                                    <input type='checkbox' />
                                    <p>Show Private</p>
                                </Row>
                                <Row style={{ gap: '5px' }}>
                                    <input type='checkbox' />
                                    <p>Show Full</p>
                                </Row>
                            </Row>
                        </Column>
                        {

                            salas && salas.rooms?.map((sala, index) =>
                                <Room selected={index === selectedRoom} onClick={() => {
                                    setSelectedRoom(index)
                                    setRoom({ ...setRoom, name: sala[2], hasPasswod: sala[3] ? true : false })
                                    setFull(sala[4])
                                }} key={index}>
                                    <Row style={{ width: "max-content", gap: '5px' }}>
                                        <p>{sala[0]}</p>
                                        {sala[3] ? <FaLock /> : null}
                                    </Row>
                                    <p style={{ color: sala[4] ? 'red' : 'green' }}>{sala[1]}/4</p>
                                </Room>)
                        }
                    </RoomsContainer>
                    <Row style={{ gap: '20px' }}>
                        <CreateRoomButton />
                        <JoinRoomButton />
                    </Row>
                </RoomsPage>
            </RoomsPage>
            <CreateRom
                isOpen={isVisible}
                handleClose={handleModalClose}
            />
        </Layout >
    )
}