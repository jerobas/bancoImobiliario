import React from "react";

import { Container } from "../../pages/CreateRoom/CreateRoom.styles";

import Modal from "../Modal/Modal";

import { FaCheck } from "react-icons/fa";

import { socket } from "../../services/Auth";

import Card from "../../assets/card.png";

export default function BuyForm({ open, setOpen }) {
  const handleBuy = (data) => {
    socket.emit("buyResponse", data);
    setOpen();
  };

  const handleOutsideClick = (e) => {
    if (open && e.target === e.currentTarget) {
      handleBuy(false);
    }
  };

  return (
    <Modal visible={open} onClick={handleOutsideClick}>
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
                    marginRight: "5px",
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
