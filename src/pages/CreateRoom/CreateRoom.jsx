import React from 'react'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {getUserFromLocalStorage} from '../../services/Auth'

import Modal from '../../components/Modal/Modal';
import { socket } from '../../services/Auth';
import { Column } from '../Rooms/Rooms.styles';
import { Container, ErrorMessage } from './CreateRoom.styles'
const createRoomSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório!').toLowerCase().min(1, 'Precisa ter no mínimo 1 letra!').max(15, 'Pode ter no máximo 15 letras!'),
    password: z.string()
})

const CustomColumn = ({ children }) => <Column style={{
    alignItems: 'flex-start',
    width: '100%',
    gap: '0.08rem',
    marginBottom: '20px',
}}>{children}</Column>

export default function CreateRom({
    handleClose, isOpen
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = getUserFromLocalStorage()
    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            mode: 'onChange',
            shouldFocusError: true,
            reValidateMode: 'onChange',
            resolver: zodResolver(createRoomSchema)
        })

    const handleCreateRoom = (data) => {
        if (data.name) {
            socket.emit('createRoom', {roomName: data.name, password:data.password, owner:user})
            socket.on('roomId', roomId => {
                socket.emit('joinRoom', {
                    roomId: roomId,
                    password: data.password,
                    userEmail: user
                })     
                socket.on('joined', flag => {
                    if(flag){
                         socket.emit('getRooms');
                        socket.on('updateRooms', (data) => {
                            dispatch({
                                type: 'ROOMS',
                                payload: data
                            })
                        })
                        navigate(`/room/${roomId}`)       
                    }
                })
                    
            })
            handleClose()
        }
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
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none'
                }}>
                    <div style={{
                        height: '36px',
                        width: '36px',
                    }} />
                    <h1>Criar Sala</h1>
                    <button onClick={() => handleClose()}>
                        <FaTimes
                            style={{
                                fontSize: '20px',
                                color: '#ff0000'
                            }}
                        />
                    </button>
                </header>
                <main>
                    <form onSubmit={handleSubmit(handleCreateRoom)}>
                        <Column>
                            <CustomColumn>
                                <label>Nome da sala: </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    {...register('name')}
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                            </CustomColumn>
                            <CustomColumn>
                                <label>Senha da sala: </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    {...register('password')}
                                />
                            </CustomColumn>
                            <button onClick={handleCreateRoom}>Criar</button>
                        </Column>
                    </form>
                </main>
            </Container>
        </Modal>
    )
}
