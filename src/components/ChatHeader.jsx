// ChatHeader.jsx
// Top bar of the chat window
// shows active contact name, online status, action buttons

import Avatar from "./Avatar";

export default function ChatHeader({ contact }) {
  return (
    <div style={{
      padding: "14px 24px",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "rgba(255,255,255,0.02)",
      backdropFilter: "blur(20px)",
    }}>

      {/* Avatar + online dot */}
      <div style={{ position: "relative" }}>
        <Avatar name={contact.name} size={42} />
        {contact.online && (
          <div style={{
            position: "absolute",
            bottom: 1, right: 1,
            width: 10, height: 10,
            borderRadius: "50%",
            background: "#3dd68c",
            border: "2px solid #0a0f1e"
          }} />
        )}
      </div>

      {/* Name + status */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15.5, color: "#e8e8f0" }}>
          {contact.name}
        </div>
        <div style={{
          fontSize: 12.5,
          color: contact.online ? "#3dd68c" : "rgba(180,180,200,0.45)"
        }}>
          {contact.online ? "Active now" : "Offline"}
        </div>
      </div>

      {/* Action buttons — wire up later */}
      <div style={{ display: "flex", gap: 8 }}>
        {["📞", "🎥", "ℹ️"].map((icon, i) => (
          <button key={i} style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 10,
            width: 36, height: 36,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
