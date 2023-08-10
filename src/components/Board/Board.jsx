import React, { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/Auth";
import {
  BoardContainer,
  Cell,
  ImageContainer,
  StartGame,
  Square,
  Wrapper,
  GameLayout,
  PlayersContainer,
} from "./Board.styles";
import { Container } from "../../pages/CreateRoom/CreateRoom.styles";

import { socket } from "../../services/Auth";

import { arrayFromLength, mapBoard } from "../../utils";

import { FaCrown, FaTimes, FaMoneyBillAlt } from "react-icons/fa";

import Modal from "../Modal/Modal";

import CellData from "../../cells.json";
import GifTeemo from "../../assets/teemo.gif";
import TeemoStop from "../../assets/teemoStop.png";

export default function Board() {
  const { id } = useParams();
  const user = getUserFromLocalStorage();
  const ip = JSON.parse(localStorage.getItem("IP"));

  const cells = Array.from(Array(40)).map((_) => 1);
  const [dices, setDices] = useState([0, 0]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const componentsRef = useRef(
    [...Array(numberOfPlayers).keys()].map(() => null)
  );
  const [players, setPlayers] = useState([]);
  const [currentCellPosition, setCurrentCellPosition] = useState([]);
  const [renderedPosition, setRenderedPosition] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userOwner, setUserOwner] = useState();
  const [diceWinners, setDiceWinners] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [willBuy, setWillBuy] = useState({
    canBuy: false,
    willBuy: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [recalculate, setRecalculate] = useState(false);
  const recalculatePosition = () => setRecalculate(!recalculate);
  const [restart, setRestart] = useState(false);
  const cleanRestart = () => setRestart(!restart);

  const getPosition = (i) => {
    if (componentsRef.current[i]) {
      const componentPosition = componentsRef.current[i].parentNode;
      return {
        x: componentPosition.offsetLeft + componentPosition.clientWidth / 2,
        y: componentPosition.offsetTop + componentPosition.clientHeight / 2,
      };
    }
  };

  const handlePayToLeave = (player) => {
    if (player) {
      socket.emit("rooms:payToLeave", player);
      handleDice();
    }
  };

  const handleDice = () => {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;

    setDices([d1, d2]);
    setButtonDisabled(true);
    socket.emit("rooms:rollDices", {
      roomId: id,
      value: {
        d1: d1,
        d2: d2,
      },
      userEmail: user,
      numberOfCells: cells.length,
    });
  };

  const handlePosition = (i) => {
    const { x, y } = getPosition(i);

    let firstTime = renderedPosition[i].x === 0 && renderedPosition[i].y !== 0;
    let aux = renderedPosition;
    let somethingChanged =
      renderedPosition[i].x !== x || renderedPosition[i].y !== y;

    aux[i] = {
      x: firstTime ? x : renderedPosition[i].x1,
      y: firstTime ? y : renderedPosition[i].y1,
      x1: x,
      y1: y,
    };
    setRenderedPosition(aux);

    if (somethingChanged) cleanRestart();
  };

  const handleMovePlayerStepByStep = (player, i) => {
    if (Number(currentCellPosition[i]) !== Number(player.position)) {
      setTimeout(() => {
        let aux = currentCellPosition;
        aux[i] = (aux[i] + 1) % cells.length;
        setCurrentCellPosition(aux);
        recalculatePosition();
      }, 200);
    }
    if (Number(currentCellPosition[i]) === Number(player.position)) {
      setTimeout(() => {
        setButtonDisabled(false);
      }, 200);
    }
  };

  useEffect(() => {
    players?.map((player, i) => {
      handleMovePlayerStepByStep(player, i);
      handlePosition(i);
    });
  }, [players, recalculate]);

  const handleGameStateUpdate = (data) => {
    if (data.type === "Game starting...") {
      socket.on("playersStates", (data) => {
        setPlayers(data.users);
        setCurrentTurn(data.currentTurn);
      });
      socket.on("willBuy", (data) => {
        if (data && data.canBuy) {
          setWillBuy({
            canBuy: true,
            willBuy: false,
          });
          setIsOpen(true);
        }
      });
      setDiceWinners(data.diceWinners);
      setCurrentTurn(data.currentTurn);
      setVisible(true);
    }
  };

  useEffect(() => {
    socket.emit("rooms:getOwner", id);
    socket.on("returnOwner", (data) => {
      setUserOwner(data);
    });
    socket.emit("rooms:getUsers", id);
    socket.on("returnPlayer", async (data) => {
      setNumberOfPlayers(data.length);
      const aux = arrayFromLength(data.length);
      setRenderedPosition(
        aux.map(() => {
          return {
            x: 0,
            y: 0,
            x1: 0,
            y1: 0,
          };
        })
      );
      setCurrentCellPosition(aux.map(() => 0));
    });
    socket.on("gameStateUpdated", (data) => handleGameStateUpdate(data));
  }, []);

  const handleStartGame = () => {
    socket.emit("rooms:start", id);
  };

  const handleBuy = (data) => {
    socket.emit("buyResponse", data)
    setIsOpen(false)
  }

  return (
    <Wrapper>
      <div>
        {diceWinners[currentTurn] && diceWinners[currentTurn] == ip && (
          <button onClick={() => handleDice()} disabled={buttonDisabled}>
            Rodar dados!
          </button>
        )}
      </div>
      <div>
        {players.map(
          (player) =>
            player.userIP === ip &&
            player.state === 3 &&
            player.money >= 50 && (
              <div>
                <button
                  onClick={() => {
                    handlePayToLeave(player);
                  }}
                >
                  pague
                </button>{" "}
                <button onClick={() => handleDice()} disabled={buttonDisabled}>
                  não pague
                </button>
              </div>
            )
        )}
      </div>
      <div style={{ background: "white" }}>
        <span>
          Dados: {dices[0]} + {dices[1]}
        </span>
      </div>
      <br />
      {!visible && userOwner === ip && (
        <StartGame onClick={handleStartGame}>Start</StartGame>
      )}
      {willBuy.canBuy === true && (
        <Modal
          visible={isOpen}
          hasHeight={true}
          height="min-content"
          hasWidth={true}
          width="400px"
        >
          <Container>
            <header
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "none",
              }}
            >
              <div
                style={{
                  height: "36px",
                  width: "36px",
                }}
              />
              <h1>Deseja Comprar</h1>
            </header>
            <main>
              <div>
                <p>name</p>
                <p>card image</p>
                <p>price</p>
                <button onClick={()=> handleBuy(true)}>
                  <FaMoneyBillAlt
                    style={{
                      fontSize: "20px",
                      color: "#00f00f",
                    }}
                  />
                </button>
                <button onClick={() => handleBuy(false)}>
                  <FaTimes
                    style={{
                      fontSize: "20px",
                      color: "#ff0000",
                    }}
                  />
                </button>
              </div>
            </main>
          </Container>
        </Modal>
      )}
      <GameLayout>
        <PlayersContainer>
          {players &&
            players.map((player, i) => {
              return (
                <div
                  key={player._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
                  }}
                >
                  <span>
                    {player.userName} {userOwner === ip && <FaCrown />}
                  </span>
                  <span>Dinheiro: R${player.money}</span>
                </div>
              );
            })}
        </PlayersContainer>
        {visible && (
          <BoardContainer>
            {cells.map((_, index) => (
              <Cell key={`cell-${index}`}>
                {mapBoard(index, cells.length) + 1}
                {
                  // <div key={CellData[index].id}>
                  //     <span>{CellData[index].name}</span>
                  //     <span>{CellData[index].price}</span>
                  // </div>
                }
                {...players?.map((_, i) => {
                  return (
                    currentCellPosition[i] ===
                      mapBoard(index, cells.length) && (
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                        ref={(el) => (componentsRef.current[i] = el)}
                      />
                    )
                  );
                })}
              </Cell>
            ))}
            {players?.map((player, i) => {
              return (
                <Square
                  key={player._id}
                  position={renderedPosition[i]}
                  color={i}
                />
              );
            })}
            <ImageContainer />
          </BoardContainer>
        )}
      </GameLayout>
    </Wrapper>
  );
}
