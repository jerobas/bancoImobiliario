import { useEffect, useState, useRef } from 'react'
import { BsFillChatDotsFill, BsFillSendFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import Board from '../../components/Board/Board';
import Layout from '../../components/Layout/Layout';
import {getUserFromLocalStorage} from '../../services/Auth'
import { socket } from '../../services/Auth';
import {globalTheme} from '../../styles/theme/global.theme'
import { Styles } from './Room.styles'

export default function Room() {
  const user = getUserFromLocalStorage()
  const { id } = useParams()
  const messagesRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message, users) => {
      setMessages((prevMessages) => [...prevMessages, { users, message }]);
    });
    return () => {
      socket.emit('rooms:leave', id);
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if(message.length > 0)
      socket.emit('rooms:chat', id, message, user);
      setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

 
  return (
    <Layout>
      <Styles.Container>
      <Board />
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
              <BsFillSendFill id="iconSend" onClick={() => handleSendMessage()}/>
            </div>
          </Styles.ChatContainer>
        </Styles.ChatArea>
      </Styles.Container>
    </Layout>
  )
}
