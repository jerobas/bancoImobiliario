import React, { useEffect, useState, useRef } from 'react'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useParams  } from 'react-router-dom'

import Layout from '../../components/Layout/Layout';
import { socket } from '../../services/Auth';
import Board from '../../components/Board/Board';
import { Styles } from './Room.styles'
import {globalTheme} from '../../styles/theme/global.theme'

export default function Room() {
  const user = useSelector(state => state.auth.user.name)
  const { id } = useParams()

  const messagesRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message, users) => {
      setMessages((prevMessages) => [...prevMessages, { users, message }]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', id, message, user);
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message.length > 0) {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <Styles.Container>
        <Styles.GameArea>
          <Board />
        </Styles.GameArea>

        <Styles.ChatArea>
          <Styles.ChatContainer>
            <ul ref={messagesRef}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  style={{ justifyContent: msg.users === user ? 'left' : 'right'}}
                >
                  <strong
                    style={{color: msg.users !== 'Sistema' ? globalTheme.vivid.black : globalTheme.vivid.green}}
                  >{msg.users}:</strong>
                  {msg.message}
                </li>
              ))}
            </ul>
            <div>
              <BsFillChatDotsFill id="icon" />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Chat...'
              />
            </div>
          </Styles.ChatContainer>
        </Styles.ChatArea>
      </Styles.Container>

    </Layout>
  )
}
