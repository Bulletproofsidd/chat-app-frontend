// ContactRow.jsx
// Single contact in the sidebar list
// shows name, last message, time, unread count, online dot

import Avatar from "./Avatar";

export default function ContactRow({ contact, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        cursor: "pointer",
        borderRadius: 12,
        margin: "2px 8px",
        background: isActive ? "rgba(108, 99, 255, 0.18)" : "transparent",
        border: isActive
          ? "1px solid rgba(108, 99, 255, 0.25)"
          : "1px solid transparent",
        transition: "all 0.18s ease",
      }}
      onMouseEnter={e => {
        if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      }}
      onMouseLeave={e => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Avatar with online dot */}
      <div style={{ position: "relative" }}>
        <Avatar name={contact.name} size={42} />
        {contact.online && (
          <div style={{
            position: "absolute",
            bottom: 1, right: 1,
            width: 10, height: 10,
            borderRadius: "50%",
            background: "#3dd68c",
            border: "2px solid #0e1120"
          }} />
        )}
      </div>

      {/* Name + last message */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 500, fontSize: 14.5, color: "#e8e8f0", fontFamily: "Inter, sans-serif" }}>
            {contact.name}
          </span>
          <span style={{ fontSize: 11, color: "rgba(180,180,200,0.5)", flexShrink: 0 }}>
            {contact.time}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <span style={{
            fontSize: 13,
            color: "rgba(180,180,200,0.6)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "75%"
          }}>
            {contact.lastMsg}
          </span>

          {/* Unread badge */}
          {contact.unread > 0 && (
            <span style={{
              background: "#6c63ff",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              borderRadius: "50%",
              width: 18, height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
