import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';

import Modal from '../../components/Modal/Modal';
import { socket } from '../../services/Auth';
import { Column } from '../Rooms/Rooms.styles';
import { Container } from './JoinRoom.styles'


const CustomColumn = ({ children }) => <Column style={{
    alignItems: 'flex-start',
    width: '100%',
    gap: '10px',
    marginBottom: '20px',
}}>{children}</Column>

export default function JoinRoom({
    handleClose, isOpen, roomName,
}) {

    const [formData, setFormData] = useState({
        roomName: '',
        password: '',
    })

    const handleCreateRoom = () => {
        socket.emit('createRoom', formData.roomName, formData.password)
        handleClose()
    }


    return (
        <Modal
            visible={isOpen}
            hasHeight={true}
            height='min-content'
            hasWidth={true}
            width='400px'
        >
            <Container>
                <header style={{
                    padding: '20px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{
                        height: '36px',
                        width: '36px',
                    }} />
                    <h1 style={{ fontSize: '26px' }}>Entrar na sala</h1>
                    <button style={{
                        height: '36px',
                        width: '36px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onClick={() => handleClose()}>
                        <FaTimes
                            style={{
                                fontSize: '20px',
                                color: '#ff0000'
                            }}
                        />
                    </button>
                </header>
                <main>
                    <form>
                        <Column>
                            <CustomColumn>
                                <h2>{roomName}</h2>
                            </CustomColumn>
                            <CustomColumn>
                                <label>Senha da sala: </label>
                                <input style={{ width: '100%' }} type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                            </CustomColumn>
                            <button onClick={handleCreateRoom}>Entrar na sala</button>
                        </Column>
                    </form>
                </main>
            </Container>
        </Modal>
    )
}
