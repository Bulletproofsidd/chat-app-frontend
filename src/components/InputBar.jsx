// InputBar.jsx
// The message input at the bottom of the chat
// handles typing, enter to send, and send button

export default function InputBar({ value, onChange, onSend, contactName }) {

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div style={{
      padding: "12px 20px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.02)",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "10px 14px",
      }}>

        {/* Attach button */}
        <button style={{
          background: "transparent",
          border: "none",
          color: "rgba(180,180,200,0.45)",
          fontSize: 19,
          cursor: "pointer",
          lineHeight: 1,
          flexShrink: 0
        }}>
          📎
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder={`Message ${contactName}...`}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e8e8f0",
            fontSize: 14.5,
            lineHeight: 1.5,
            fontFamily: "Inter, sans-serif"
          }}
        />

        {/* Emoji button */}
        <button style={{
          background: "transparent",
          border: "none",
          fontSize: 19,
          cursor: "pointer",
          flexShrink: 0
        }}>
          😊
        </button>

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={!value.trim()}
          style={{
            background: value.trim() ? "#6c63ff" : "rgba(108,99,255,0.2)",
            border: "none",
            borderRadius: 10,
            width: 36, height: 36,
            cursor: value.trim() ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
            fontSize: 17,
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
