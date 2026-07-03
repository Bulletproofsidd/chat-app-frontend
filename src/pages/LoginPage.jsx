// LoginPage.jsx
// Login and Signup page
// Matches the dark navy + glassmorphism aesthetic of ChatPage
// Toggle between Login and Signup with one state

import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  async function handleSubmit() {
    setError("")
    setLoading(true)

    const url = isLogin
      ? `${API_URL}/api/auth/login`
      : `${API_URL}/api/auth/register`

    const body = isLogin
      ? { email, password }
      : { name, email, password }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Something went wrong")
        setLoading(false)
        return
      }

      login(data.user, data.token)

    } catch (err) {
      setError("Could not connect to server")
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div style={{
      height: "100vh",
      background: "#0a0f1e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(180,180,200,0.4); }
        input:focus { outline: none; }
      `}</style>

      <div style={{
        width: 400,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        padding: "40px 36px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48,
            background: "rgba(108,99,255,0.25)",
            border: "1px solid rgba(108,99,255,0.4)",
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, margin: "0 auto 14px",
          }}>
            💬
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#e8e8f0" }}>
            {isLogin ? "Welcome back" : "Create account"}
          </div>
          <div style={{ fontSize: 13.5, color: "rgba(180,180,200,0.5)", marginTop: 6 }}>
            {isLogin ? "Sign in to continue chatting" : "Join and start chatting"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {!isLogin && (
            <div>
              <label style={{ fontSize: 12.5, color: "rgba(180,180,200,0.6)", marginBottom: 6, display: "block" }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: 12.5, color: "rgba(180,180,200,0.6)", marginBottom: 6, display: "block" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: 12.5, color: "rgba(180,180,200,0.6)", marginBottom: 6, display: "block" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          </div>
        </div>

        {error && (
          <div style={{
            marginTop: 12,
            padding: "10px 14px",
            background: "rgba(255,80,80,0.1)",
            border: "1px solid rgba(255,80,80,0.25)",
            borderRadius: 10,
            color: "#ff8080",
            fontSize: 13,
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: "12px",
            background: loading ? "rgba(108,99,255,0.3)" : "#6c63ff",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            fontFamily: "Inter, sans-serif",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
        </button>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 13.5, color: "rgba(180,180,200,0.5)" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <span
            onClick={() => { setIsLogin(!isLogin); setError("") }}
            style={{
              fontSize: 13.5,
              color: "#a89dff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#e8e8f0",
  fontSize: 14,
  fontFamily: "Inter, sans-serif",
}