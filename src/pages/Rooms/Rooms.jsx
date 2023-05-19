import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import background from '../../assets/temporaryWallpaper.webp';
import Layout from '../../components/Layout/Layout';
import { socket } from '../../services/Auth';
import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom/JoinRoom';
import { Row, Column, RoomsContainer, RoomsPage, Button, RoomStyle } from './Rooms.styles';


export default function Rooms() {
    const salas = useSelector(state => state.room)
    const user = useSelector(state => state.auth)
    const [isVisible, setIsVisible] = useState(false)
    const [joinIsVisible, setJoinIsVisible] = useState(false)
    const dispacth = useDispatch()
    const [selectedRoom, setSelectedRoom] = React.useState(NaN);
    const [full, setFull] = useState(false)
    const [room, setRoom] = useState({
        name: '',
        password: '',
        hasPasswod: false
    })

    const Room = ({ children, selected, onClick }) => <RoomStyle onClick={onClick} style={{ backgroundColor: selected ? '#FFFFFF20' : 'transparent' }}>{children}</RoomStyle>

    const handleJoinRoom = () => {
        if (room.hasPasswod) {
            setJoinIsVisible(true)
            // console.log(room.name, room.password)
            // socket.emit('joinRoom', room.name, room.password)
            // socket.on('joined', data => {
            //     if (data) socket.emit('getRooms');
            // })
        }
        else {
            socket.emit('joinRoom', room.name)
            socket.on('joined', data => {
                if (data) socket.emit('getRooms');
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
            dispacth({
                type: 'ROOMS',
                payload: data
            })
        })
    }, [isVisible])


    return (
        <Layout>
            <RoomsPage style={{ backgroundImage: `url(${background})` }}>
                <RoomsPage style={{ backgroundColor: `#030b13AA`, padding: '40px' }}>
                    <h1>Multiplayer Online</h1>
                    <RoomsContainer>
                        <h2>Salas disponíveis: {salas.numberOfRooms}</h2>
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
                                    setRoom({ ...setRoom, name: sala[1], hasPasswod: sala[2], nameShown: sala[0] })
                                    setFull(sala[3])
                                }} key={index}>
                                    <Row style={{ width: "max-content", gap: '5px' }}>
                                        <p>{sala[0]}</p>
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
            />
        </Layout >
    )
}