import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import { socket } from '../../services/Auth';
import CreateRoom from '../CreateRoom/CreateRoom';

export default function Home() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setFormData] = useState({
        roomName: '',
        password: '',
    })
    useEffect(() => {
        socket.on('receiveMessage', (message, users) => {
            setMessages((prevMessages) => [...prevMessages, { users, message }]);
        });
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => { socket.emit('getRooms') }, [])

    const rooms = useSelector(state => state.room)
    const user = useSelector(state => state.auth)

    const handleCreateRoom = () => {
        socket.emit('createRoom', formData.roomName, formData.password)

    }

    const handleLeaveRoom = () => {
        socket.emit('leaveRoom', {
            roomId: 'Ynojf0yU',
            userEmail: user.user.name
        })
    }

    const handleJoinRoom = () => {
        socket.emit('joinRoom', {
            roomId: 'Ynojf0yU',
            password: '',
            userEmail: user.user.name
        })
    }

    const handleSendMessage = () => {
        socket.emit('sendMessage', 'Ynojf0yU', message, user.user.name);
        setMessage('');
    };

    const handleModalClose = () => {
        setIsVisible(false)
    }
    return (
        <Layout>
            <h1>Salas:</h1>
            <h2>Numero de salas: {rooms.numberOfRoom}</h2>
            {
                rooms.hasRooms && rooms.rooms.map((room, i) =>
                    <div key={i}>
                        <span>{room[0]}</span>
                        <button onClick={handleJoinRoom}>Entra na sala</button>
                        <button onClick={handleLeaveRoom}>Sair da sala</button>
                    </div>)
            }
            <form>
                <labe>Nome da sala: </labe>
                <input type="text" onChange={(e) => setFormData({ ...formData, roomName: e.target.value })} value={formData.roomName} />
                <labe>Senha da sala: </labe>
                <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                <button onClick={handleCreateRoom}>Criar</button>
            </form>
            <div>
                <h2>Chat da Sala:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.users}: </strong>
                            {msg.message}
                        </li>
                    ))}
                </ul>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
            <CreateRoom
                isOpen={isVisible}
                handleClose={handleModalClose}
            />
        </Layout>
    )
}
