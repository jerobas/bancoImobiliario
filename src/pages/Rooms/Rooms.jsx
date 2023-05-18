import React from 'react';
import Layout from '../../components/Layout/Layout';
import background from '../../assets/temporaryWallpaper.webp';

import { Row, Column, RoomsContainer, RoomsPage, Button, RoomStyle } from './Rooms.styles';
import { FaLock } from 'react-icons/fa';

export default function Rooms({ salas = [...Array(5)].map((e, i) => {
    return {
        name: `Sala ${i}`,
        players: i,
        private: i % 2 === 0
    }
}) }) {
    const Room = ({ children, selected, onClick }) => <RoomStyle onClick={onClick} style={{ backgroundColor: selected ? '#FFFFFF20' : 'transparent' }}>{children}</RoomStyle>

    const CreateRoomButton = () => <Button onClick={() => { }}>Criar sala</Button>

    const JoinRoomButton = () => <Button disabled={!salas[selectedRoom]} onClick={() => { }}>Entrar na sala</Button>

    const [selectedRoom, setSelectedRoom] = React.useState(NaN);

    return (
        <Layout>
            <RoomsPage style={{ backgroundImage: `url(${background})` }}>
                <RoomsPage style={{ backgroundColor: `#030b13AA`, padding: '40px' }}>
                    <h1>Multiplayer Online</h1>
                    <RoomsContainer>
                        <h2>Salas disponíveis: {salas.length}</h2>
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
                        {salas.map((sala, index) => <Room selected={index === selectedRoom} onClick={() => {
                            console.log(index)
                            setSelectedRoom(index)
                        }} key={index}>
                            <Row style={{ width: "max-content", gap: '5px' }}>
                                <p>{sala.name}</p>
                                {sala.private ? <FaLock /> : null}
                            </Row>
                            <p>{sala.players}/4</p>
                        </Room>)}
                    </RoomsContainer>
                    <Row style={{ gap: '20px' }}>
                        <CreateRoomButton />
                        <JoinRoomButton />
                    </Row>
                </RoomsPage>
            </RoomsPage>
        </Layout >
    )
}