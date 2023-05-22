import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { BoardContainer, Cell, Cards, ImageContainer, Luck, StartGame, Square } from './Board.styles'

import { socket } from '../../services/Auth'

import { arrayFromLength, mapBoard } from '../../utils'

export default function Board() {
    const { id } = useParams()
    const user = useSelector(state => state.auth.user);

    const cells = Array.from(Array(40)).map((_) => 1);
    const [dices, setDices] = useState([0, 0]);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const componentsRef = useRef([...Array(numberOfPlayers).keys()].map(() => null))
    const [players, setPlayers] = useState([])
    const [currentCellPosition, setCurrentCellPosition] = useState([])
    const [renderedPosition, setRenderedPosition] = useState([]);

    /*These two states are only used because objects' equality is not checked by React in the useEffect hook.*/
    const [recalculate, setRecalculate] = useState(false);
    const recalculatePosition = () => setRecalculate(!recalculate);
    const [restart, setRestart] = useState(false);
    const cleanRestart = () => setRestart(!restart);
    /*This could probably be the future case of some performance issues, but for now it should be fine.*/

    const getPosition = (i) => {
        if (componentsRef.current[i]) {
            const componentPosition = componentsRef.current[i].getBoundingClientRect();
            return { x: componentPosition.x + componentPosition.width / 2, y: componentPosition.y + componentPosition.height / 2 }
        }
    };

    const handleDice = () => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;

        let dicesSum = d1 + d2;

        setDices([d1, d2])
        setButtonDisabled(true)
        socket.emit('rollDicesToStart', { roomId: id, value: dicesSum, userEmail: user.name, numberOfCells: cells.length })
    }

    const handlePosition = (i) => {
        const { x, y } = getPosition(i);

        let firstTime = renderedPosition[i].x === 0 && renderedPosition[i].y !== 0;
        let aux = renderedPosition
        let somethingChanged = renderedPosition[i].x !== x || renderedPosition[i].y !== y;

        aux[i] = {
            x: firstTime ? x : renderedPosition[i].x1,
            y: firstTime ? y : renderedPosition[i].y1,
            x1: x,
            y1: y
        }
        setRenderedPosition(aux)

        if (somethingChanged) cleanRestart();
    }

    const handleMovePlayerStepByStep = (player, i) => {
        if (Number(currentCellPosition[i]) !== Number(player.position)) {
            setTimeout(() => {
                let aux = currentCellPosition
                aux[i] = (aux[i] + 1) % cells.length
                setCurrentCellPosition(aux);
                recalculatePosition();
            }, 200)
        }
        if (Number(currentCellPosition[i]) === Number(player.position)) {

            setTimeout(() => { setButtonDisabled(false); }, 200)
        }
    }

    useEffect(() => {
        players?.map((player, i) => {
            handleMovePlayerStepByStep(player, i)
            handlePosition(i)
        })
    }, [players, recalculate]);

    const handleGameStateUpdate = (data) => {
        if (data.type === 'Game starting...') {
            socket.on('playersStates', (data) => {
                setPlayers(data)
            })
        }
    }

    useEffect(() => {
        console.log('how many times getPlayers is called')
        socket.emit('getPlayers', id)
        socket.on('returnPlayer', (data) => {
            console.log('how many times returnPlayer is called')
            setNumberOfPlayers(data)
            const aux = arrayFromLength(data)
            setRenderedPosition(aux.map(() => {
                return {
                    x: 0,
                    y: 0,
                    x1: 0,
                    y1: 0
                }
            }))
            setCurrentCellPosition(aux.map(() => 0))
        })
        socket.on('gameStateUpdated', data => handleGameStateUpdate(data))
    }, [])

    const handleStartGame = () => {
        socket.emit('startGame', id)

    }

    return (
        <>
            <button onClick={() => handleDice()} disabled={buttonDisabled}>Roll Dices</button>
            <span>{`${dices[0]} + ${dices[1]} = ${dices[0] + dices[1]}`}</span>
            <br />
            <span>{JSON.stringify(players)}</span>
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
                                ...players?.map((player, i) => {
                                    return (
                                        currentCellPosition[i] === mapBoard(index, cells.length) && <div
                                            style={{
                                                backgroundColor: ['red', 'green', 'blue'][i],
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            ref={el => componentsRef.current[i] = el}
                                        />
                                    )
                                })
                            }
                        </Cell>

                    ))
                }
                {players?.map((player, i) => {
                    return (
                        < Square
                            key={i}
                            position={renderedPosition[i]}
                            color={i}
                        />
                    )
                })}
                <ImageContainer >
                    < Cards />
                    < Luck />
                </ImageContainer>

            </BoardContainer >
        </>
    );
}
