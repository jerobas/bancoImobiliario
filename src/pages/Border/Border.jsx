import React, { useState, useRef, useEffect } from 'react'
import { BoardContainer, Cell, Cards, ImageContainer, Luck, Square } from './Border.styles'
import Player from '../../components/player/Player'

export default function Border() {
    const componentRef = useRef(null);

    const cells = Array.from(Array(40)).map((_) => 1);

    const [squarePosition, setSquarePosition] = useState(0);
    const [dices, setDices] = useState(0);
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
            return { x: componentPosition.x + componentPosition.width / 2, y: componentPosition.y + componentPosition.height / 2}
        }
    };

    const handleDice = () => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;

        let dices = d1 + d2;

        setDices(dices)

        setDestination((squarePosition + dices) % cells.length)
        setSquarePosition((squarePosition + 1) % cells.length)
    }


    useEffect(() => {
        if (squarePosition !== destination) {
            setTimeout(() => {
                setSquarePosition((squarePosition + 1) % cells.length);
            }, 200);
        }
    }, [squarePosition]);

    const valor = (i) => {
        let tamanho = cells.length;

        const reduceTo1 = (initial, value, newInitial) => {
            return newInitial + ((value - initial) / 2)
        }

        if (i <= tamanho / 4) {
            return i
        }
        else if (i < 3 * tamanho / 4 - 1) {
            if (i % 2 == (tamanho / 4 + 1) % 2) {
                return reduceTo1(i, (tamanho / 4) + 1, tamanho - 1)
            }
            else {
                return reduceTo1((tamanho / 4) + 2, i, (tamanho / 4) + 1)
            }
        }
        else {
            return (tamanho / 2) + (tamanho - 1 - i)
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

    const player = new Player;

    return (
        <>
            <button onClick={handleDice}>Roll Dices</button>
            <span>{dices}</span>
            <br />
            <span>{player.money}</span>
            <BoardContainer>
                {
                    cells.map((_, index) =>
                    (
                        <Cell key={`cell-${index}`}>
                            {valor(index) + 1}
                            {
                                squarePosition === valor(index) &&
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
