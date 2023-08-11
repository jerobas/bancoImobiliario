import React from "react";

import { Container } from "../../pages/CreateRoom/CreateRoom.styles";

import Modal from "../../components/Modal/Modal";

import { FaTimes, FaCheck } from "react-icons/fa";

import { socket } from "../../services/Auth";

import Card from "../../assets/card.png";

export default function BuyForm({ open, setOpen }) {
  const handleBuy = (data) => {
    socket.emit("buyResponse", data);
    setOpen();
  };

  return (
    <Modal
      visible={open}
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
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
        >
          <h1>Deseja Comprar?</h1>
        </header>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Card} style={{ padding: "1rem" }} />
            <div>
              <button onClick={() => handleBuy(true)}>
                <FaCheck
                  style={{
                    fontSize: "20px",
                    color: "#00AF53",
                    marginRight: '5px',
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
          </div>
        </div>
      </Container>
    </Modal>
  );
}
