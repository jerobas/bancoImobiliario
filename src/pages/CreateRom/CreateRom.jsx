import React, { useState } from 'react'

import Modal from '../../components/Modal/Modal';
import { socket } from '../../services/Auth';
import { Container } from './CreateRom.styles'

export default function CreateRom({
    handleClose, isOpen
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
        >
            <Container>
                <header>
                    <h1>Criar Sala</h1>
                    <button onClick={() => handleClose()}>Close</button>
                </header>
                <main>
                    <form>
                        <labe>Nome da sala: </labe>
                        <input type="text" onChange={(e) => setFormData({ ...formData, roomName: e.target.value })} value={formData.roomName} />
                        <labe>Senha da sala: </labe>
                        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                        <button onClick={handleCreateRoom}>Criar</button>
                    </form>
                </main>
            </Container>
        </Modal>
    )
}
