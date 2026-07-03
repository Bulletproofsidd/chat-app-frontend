// ChatBubble.jsx
// Single message bubble
// isMine = true  → purple glass (right side)
// isMine = false → white glass (left side)

export default function ChatBubble({ msg, isMine }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: isMine ? "flex-end" : "flex-start",
      marginBottom: 6,
    }}>
      <div style={{
        maxWidth: "68%",
        padding: "10px 14px",
        borderRadius: isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isMine
          ? "rgba(108, 99, 255, 0.22)"
          : "rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isMine
          ? "1px solid rgba(108, 99, 255, 0.35)"
          : "1px solid rgba(255, 255, 255, 0.12)",
        color: "#f0f0f5",
        fontSize: 14.5,
        lineHeight: 1.5,
        fontFamily: "Inter, sans-serif",
        wordBreak: "break-word",
      }}>
        {msg.text}
        <div style={{
          fontSize: 11,
          color: isMine ? "rgba(200,196,255,0.6)" : "rgba(180,180,200,0.5)",
          textAlign: "right",
          marginTop: 4,
        }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}
