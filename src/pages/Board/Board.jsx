import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';

import Player from '../../components/Player/Player'
import { BoardContainer, Cell, Cards, ImageContainer, Luck, Square } from './Board.styles'

const players = [
    new Player(0),
    new Player(0),
    new Player(0),
]

export default function Board() {
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

    const getPosition = (i) => {
        if (componentsRef[i].current) {
            const componentPosition = componentsRef[i].current.getBoundingClientRect();
            return { x: componentPosition.x + componentPosition.width / 2, y: componentPosition.y + componentPosition.height / 2 }
        }
    };

    const handleDice = (player) => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;

        let dices = d1 + d2;

        setDices([d1, d2])

        if (destination + dices >= cells.length) {
            player.add(200)
        }

        setDestination((player.position + dices) % cells.length)
        player.setPosition((player.position + 1) % cells.length)
        setButtonDisabled(true)
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


    const mappedBoard = (i) => {
        let size = cells.length;

        const reduceTo1 = (initial, value, newInitial) => {
            return newInitial + ((value - initial) / 2)
        }

        if (i <= size / 4) {
            return i
        }
        else if (i < 3 * size / 4 - 1) {
            if (i % 2 == (size / 4 + 1) % 2) {
                return reduceTo1(i, (size / 4) + 1, size - 1)
            }
            else {
                return reduceTo1((size / 4) + 2, i, (size / 4) + 1)
            }
        }
        else {
            return (size / 2) + (size - 1 - i)
        }
    }

    return (
        <>
            <button onClick={() => handleDice(players[0])} disabled={buttonDisabled}>Roll Dices</button>
            <button onClick={() => handleDice(players[1])} disabled={buttonDisabled}>Roll Dices</button>
            <span>{`${dices[0]} + ${dices[1]} = ${dices[0] + dices[1]}`}</span>
            <br />
            <span>{players[0].toString()}</span>
            <BoardContainer>
                {
                    cells.map((_, index) =>
                    (
                        <Cell key={`cell-${index}`}>
                            {mappedBoard(index) + 1}
                            {
                                ...players.map((player, i) => player.getPosition() === mappedBoard(index) && <div
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
                <ImageContainer >
                    < Cards />
                    < Luck />
                </ImageContainer>

            </BoardContainer>

        </>
    );
}
