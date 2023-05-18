import React from 'react'
import Modal from '../../components/Modal/Modal';
import { Container } from './CreateRom.styles'
export default function CreateRom({
    handleClose, isOpen
}) {

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
                        
                    </main>
                </Container>
        </Modal>
    )
}
