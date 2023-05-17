import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';

import Player from '../../components/Player/Player'
import { BoardContainer, Cell, Cards, ImageContainer, Luck, Square } from './Board.styles'

const player = new Player(0);

export default function Board() {
    const user = useSelector(state => state.auth.user);
    const componentRef = useRef(null);

    const cells = Array.from(Array(40)).map((_) => 1);

    const [squarePosition, setSquarePosition] = useState(0);
    const [dices, setDices] = useState([0, 0]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        x1: 0,
        y1: 0
    });
    const [destination, setDestination] = useState(0);

    const getPosition = () => {
        if (componentRef.current) {
            const componentPosition = componentRef.current.getBoundingClientRect();
            return { x: componentPosition.x + componentPosition.width / 2, y: componentPosition.y + componentPosition.height / 2 }
        }
    };

    const handleDice = () => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;

        let dices = d1 + d2;

        setDices([d1, d2])

        if (destination + dices >= cells.length) {
            player.add(200)
        }

        setDestination((squarePosition + dices) % cells.length)
        setSquarePosition((squarePosition + 1) % cells.length)
        setButtonDisabled(true)
    }


    useEffect(() => {
        if (squarePosition !== destination) {
            setTimeout(() => {
                setSquarePosition((squarePosition + 1) % cells.length);
            }, 200)
        }
        if (squarePosition === destination) {
            setTimeout(() => { setButtonDisabled(false); }, 400)
        }
    }, [squarePosition, destination]);

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

    useEffect(() => {
        const { x, y } = getPosition();
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
    }, [squarePosition]);



    return (
        <>
            <button onClick={handleDice} disabled={buttonDisabled}>Roll Dices</button>
            <span>{`${dices[0]} + ${dices[1]} = ${dices[0] + dices[1]}`}</span>
            <br />
            <span>{player.toString()}</span>
            <br />
            {
                user && <> 
                    <span>{JSON.stringify(user)}</span>
                </>
            }
                <BoardContainer>
                {
                    cells.map((_, index) =>
                    (
                        <Cell key={`cell-${index}`}>
                            {mappedBoard(index) + 1}
                            {
                                squarePosition === mappedBoard(index) &&
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    ref={componentRef}
                                />
                            }

                        </Cell>

                    ))
                }
                < Square
                    position={position}
                />
                <ImageContainer >
                    < Cards />
                    < Luck />
                </ImageContainer>

            </BoardContainer>
           
        </>
    );
}
