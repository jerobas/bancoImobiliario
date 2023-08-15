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
} from "./Board.styles";

import BuyForm from "../Forms/BuyForm";

import CardModal from "../Card/CardModal.jsx";

import { socket } from "../../services/Auth";

import { arrayFromLength, mapBoard, findColorByOwnerCell } from "../../utils";

import LeaderBoard from "../LeaderBoard/LeaderBoard.jsx";

export default function Board() {
  const { id } = useParams();
  const user = getUserFromLocalStorage();
  const ip = JSON.parse(localStorage.getItem("IP"));

  const cells = Array.from(Array(40)).map((_) => 1);
  const [dices, setDices] = useState([0, 0]);

  const [showCardModal, setShowCardModal] = useState({
    visible: false,
    data: null,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const componentsRef = useRef(
    [...Array(numberOfPlayers).keys()].map(() => null)
  );
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
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
  const [coloredCells, setColoredCells] = useState(
    [...Array(4).keys()].map(() => [])
  );
  const [canShow, setCanShow] = useState(false);
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
      }, 400);
      setTimeout(() => {
        setCanShow(true);
      }, 1000);
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
      socket.on("buyedCell", (data) => {
        let userIndex = data?.newRoom?.users.findIndex(
          (elem) => elem._id === data?.currentUser._id
        );
        setColoredCells((oldState) => {
          let _temp = [...oldState];
          let resIndex = findColorByOwnerCell(_temp, data?.currentCell.id);
          if (resIndex != null) {
            let newIndex = _temp[resIndex].findIndex(
              (elem) => elem == data?.currentCell.id
            );
            _temp[resIndex].splice(newIndex, 1);
          }
          _temp[userIndex] = [..._temp[userIndex], data?.currentCell.id];
          return _temp;
        });
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
    const handleKeyDown = (e) => {
      if (e.key == "Control") {
        setOpenLeaderBoard(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleStartGame = () => {
    socket.emit("rooms:start", id);
  };

  const handleClose = () => {
    setCanShow(false);
    setIsOpen(false);
  };

  const handleShowCardModal = (index) => {
    setShowCardModal({ visible: true, data: index });
  };

  const handleCloseCardData = () => {
    setShowCardModal({ ...showCardModal, visible: false });
  };

  const handleCloseLeaderBoard = () => {
    setOpenLeaderBoard(false);
  };

  return (
    <Wrapper>
      <div>
        {diceWinners[currentTurn] && diceWinners[currentTurn] == ip && (
          <button onClick={() => handleDice()} disabled={buttonDisabled}>
            Rodar dados!
          </button>
        )}
      </div>
      <CardModal
        open={showCardModal.visible}
        data={showCardModal.data}
        close={handleCloseCardData}
      />
      <div>
        {diceWinners[currentTurn] &&
          diceWinners[currentTurn] == ip &&
          players.map(
            (player) =>
              player.userIP === ip &&
              player.state === 3 && (
                <div key={player.userIP}>
                  <button
                    onClick={() => {
                      handlePayToLeave(player);
                    }}
                  >
                    pague
                  </button>{" "}
                  <button
                    onClick={() => handleDice()}
                    disabled={buttonDisabled}
                  >
                    não pague
                  </button>
                </div>
              )
          )}
      </div>
      <br />
      {!visible && userOwner === ip && (
        <StartGame onClick={handleStartGame}>Start</StartGame>
      )}
      {willBuy.canBuy === true && canShow === true && (
        <BuyForm open={isOpen} setOpen={handleClose} />
      )}
      {players && players.length > 0 && (
        <LeaderBoard
          players={players}
          userOwner={userOwner}
          isOpen={openLeaderBoard}
          setOpen={handleCloseLeaderBoard}
        />
      )}

      <GameLayout>
        {visible && (
          <BoardContainer>
            {cells.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                ownerCell={findColorByOwnerCell(
                  coloredCells,
                  mapBoard(index, cells.length)
                )}
                onClick={() =>
                  handleShowCardModal(mapBoard(index, cells.length))
                }
              >
                {mapBoard(index, cells.length) + 1}
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
