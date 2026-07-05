import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import ChatHeader from "../components/ChatHeader"
import ChatBubble from "../components/ChatBubble"
import InputBar from "../components/InputBar"
import { useAuth } from "../context/AuthContext"
import { io } from "socket.io-client"

export default function ChatPage() {
  const { token, user } = useAuth()
  const [contacts, setContacts] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState({})
  const [inputText, setInputText] = useState("")
  const [conversationId, setConversationId] = useState(null)  // ← stores current conversation
  const bottomRef = useRef(null)
  const socketRef = useRef(null)

  // 1. connect socket on mount
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL||"http://localhost:5000", {
      query: { userId: user._id }
    })

    // listen for incoming messages from other person
    socketRef.current.on("receiveMessage", (message) => {
      setMessages(prev => ({
        ...prev,
        [message.sender]: [...(prev[message.sender] || []), message]
      }))
    })

    return () => socketRef.current.disconnect()
  }, [])

  // 2. fetch all users except logged in user
  useEffect(() => {
    fetch(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setContacts(data)
        if (data.length > 0) setActiveId(data[0]._id)
      })
  }, [])

  // 3. get or create conversation when active contact changes
  useEffect(() => {
    if (!activeId) return

    fetch(`${API_URL}/api/messages/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ receiverId: activeId })
    })
      .then(res => res.json())
      .then(data => {
        setConversationId(data._id)  // ← save conversationId
        return fetch(`${API_URL}/api/messages/${data._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })
      .then(res => res.json())
      .then(msgs => {
        setMessages(prev => ({ ...prev, [activeId]: msgs }))
      })
  }, [activeId])

  // 4. scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeId])

  const activeContact = contacts.find(c => c._id === activeId)
  const currentMessages = messages[activeId] || []

  function sendMessage() {
    const text = inputText.trim()
    if (!text) return

    const newMsg = {
      id: Date.now(),
      from: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // add to local state instantly (feels fast)
    setMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }))

    // emit via socket (saves to DB + delivers to receiver)
    socketRef.current.emit("sendMessage", {
      receiverId: activeId,
      text,
      conversationId
    })

    setInputText("")
  }

  if (!activeContact) {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100%",
      background: "#0a0f1e",
      fontFamily: "Inter, sans-serif",
      overflow: "hidden",
    }}>
      {/* still show sidebar */}
      <Sidebar
        contacts={contacts}
        activeId={activeId}
        onSelect={setActiveId}
      />

      {/* empty right panel */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        color: "rgba(180,180,200,0.4)",
      }}>
        <div style={{ fontSize: 48 }}>💬</div>
        <div style={{ fontSize: 16, color: "#e8e8f0" }}>
          Welcome to Chat App
        </div>
        <div style={{ fontSize: 13 }}>
          Add friends from the sidebar to start chatting
        </div>
      </main>
    </div>
  )
}

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100%",
      background: "#0a0f1e",
      fontFamily: "Inter, -apple-system, sans-serif",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <Sidebar
        contacts={contacts}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        <ChatHeader contact={activeContact} />

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
        }}>
          {currentMessages.map(msg => (
            <ChatBubble
              key={msg._id || msg.id}
              msg={msg}
              isMine={msg.sender === user._id || msg.from === "me"}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <InputBar
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onSend={sendMessage}
          contactName={activeContact.name}
        />
      </main>
    </div>
  )
}