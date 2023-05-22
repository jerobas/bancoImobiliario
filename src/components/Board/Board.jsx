import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import Player from '../../components/Player/Player'
import { BoardContainer, Cell, Cards, ImageContainer, Luck, Square, StartGame } from './Board.styles'

import { socket } from '../../services/Auth'

import { mapBoard } from '../../utils';

const players = [
    new Player(0),
    new Player(0),
    new Player(0),
]

export default function Board() {
    const { id } = useParams()
    const user = useSelector(state => state.auth.user);
    const componentsRef = players.map(e => useRef(null));

    const cells = Array.from(Array(40)).map((_) => 1);
    const [dices, setDices] = useState([0, 0]);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [update, setUpdate] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        x1: 0,
        y1: 0
    });
    const [destination, setDestination] = useState(0);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);

    const [players_, setPlayers_] = useState()

    const getPosition = (i) => {
        if (componentsRef[i].current) {
            const componentPosition = componentsRef[i].current.getBoundingClientRect();
            return { x: componentPosition.x + componentPosition.width / 2, y: componentPosition.y + componentPosition.height / 2 }
        }
    };

    const handleDice = (player) => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;

        let dicesSum = d1 + d2;

        setDices([d1, d2])

        if (destination + dicesSum >= cells.length) {
            player.add(200)
        }

        setDestination((player.position + dicesSum) % cells.length)
        player.setPosition((player.position + 1) % cells.length)
        setButtonDisabled(true)
        socket.emit('rollDicesToStart', {roomId: id, value: dicesSum, userEmail: user.name})
        socket.on('playersStates', (data) => {
            setPlayers_(data)
        })
    }

    useEffect(() => {
        if (players[0].getPosition() !== destination) {
            setTimeout(() => {
                players[0].setPosition((players[0].getPosition() + 1) % cells.length);
                setUpdate(!update);
            }, 200)
        }
        if (players[0].getPosition() === destination) {
            setTimeout(() => { setButtonDisabled(false); }, 400)
        }
    }, [players[0].getPosition(), destination]);

    useEffect(() => {
        const { x, y } = getPosition(0);
        if (position.x !== 0 && position.y !== 0) {
            if (position.x1 && position.y1)
                setPosition({
                    x: position.x1,
                    y: position.y1,
                    x1: x,
                    y1: y
                })
            else {
                setPosition({
                    x: position.x,
                    y: position.y,
                    x1: x,
                    y1: y
                })
            }
        } else
            setPosition({
                x1: x,
                y1: y,
            })
    }, [players[0].getPosition()]);

    useEffect(() => {
        socket.emit('getPlayers', id)
        socket.on('returnPlayer', (data) => {
            setNumberOfPlayers(data)
        })
    }, [])

    const handleGameStateUpdate = (data) => {
        console.log('recieved game update')
        console.log(data)
    }

    const handleStartGame = () => {
        socket.emit('startGame', id)
        socket.on('gameStateUpdated', data => handleGameStateUpdate(data))
    }

    return (
        <>
            <button onClick={() => handleDice(players[0])} disabled={buttonDisabled}>Roll Dices</button>
            <span>{`${dices[0]} + ${dices[1]} = ${dices[0] + dices[1]}`}</span>
            <br />
            <span>{JSON.stringify(players_)}</span>
            <StartGame
                onClick={handleStartGame}
            >
                Start
            </StartGame>
            <BoardContainer>

                {
                    cells.map((_, index) =>
                    (
                        <Cell key={`cell-${index}`}>
                            {mapBoard(index, cells.length) + 1}
                            {
                                ...players.map((player, i) => player.getPosition() === mapBoard(index, cells.length) && <div
                                    style={{
                                        backgroundColor: ['red', 'green', 'blue'][i],
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    ref={componentsRef[i]}
                                />)
                            }
                        </Cell>

                    ))
                }
                {players.map(player => player.render(position))}
                <div style={{ display: 'flex', marginRight: '20px;' }}>
                    {
                        [...Array(numberOfPlayers).keys()].map(data => (
                            <span>{data}</span>
                        ))
                    }
                </div>

                <ImageContainer >
                    < Cards />
                    < Luck />
                </ImageContainer>

            </BoardContainer >

        </>
    );
}
