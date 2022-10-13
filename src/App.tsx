import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messageText, setMessageText] = useState('')
  const [usersMessages, setUsersMessages] = useState<usersMessagesType[]>([])
  if (ws) {
    ws.onmessage = (messageEvent) => {
      const messages = JSON.parse(messageEvent.data)
      setUsersMessages([...usersMessages, ...messages])
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
  useEffect(() => {
    const localWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    setWs(localWs)
  }, [])

  const sendMessage = () => {
    ws && ws.send(messageText)
    setMessageText('')
  }
  return (
    <div className="App">
      <div>
        <input type="text" value={messageText} onChange={(e) => setMessageText(e.currentTarget.value)} />
        <button onClick={sendMessage}>SEND MESSAGE</button>
      </div>
      {
        usersMessages.map((m, i) => (
          <div key={i} style={{ border: '1px solid #f5f5f5', width: 'fit-content', padding: '10px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <img style={{ width: '70px' }} src={m.photo ? m.photo : ''} alt="" /> <span>{m.userName}</span>
            </div>
            <h3>{m.message}</h3>
          </div>

        ))
      }

    </div>
  );
}

export default App;
type usersMessagesType = { userId: number, userName: string, message: string, photo: null | string }