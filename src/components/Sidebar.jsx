// Sidebar.jsx
// Left panel — search bar, contact list, current user strip
import { useState } from "react"
import Avatar from "./Avatar";
import ContactRow from "./ContactRow";
import { useAuth } from "../context/AuthContext"



export default function Sidebar({ contacts, activeId, onSelect }) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside style={{
      width: 300,
      flexShrink: 0,
      background: "rgba(255,255,255,0.03)",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      flexDirection: "column",
      backdropFilter: "blur(20px)",
    }}>

      {/* Header */}
      <div style={{
        padding: "20px 16px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14
        }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: "#e8e8f0" }}>
            Messages
          </span>
          <button style={{
            background: "rgba(108,99,255,0.2)",
            border: "1px solid rgba(108,99,255,0.35)",
            borderRadius: 10,
            width: 34, height: 34,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a89dff",
            fontSize: 18,
          }}>
            +
          </button>
        </div>

        {/* Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 10,
          padding: "8px 12px",
        }}>
          <span style={{ color: "rgba(180,180,200,0.5)", fontSize: 15 }}>🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              flex: 1,
              color: "#e8e8f0",
              fontSize: 14,
              fontFamily: "Inter, sans-serif"
            }}
          />
        </div>
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 8, paddingBottom: 8 }}>
        {filtered.map(contact => (
          <ContactRow
            key={contact._id}
            contact={contact}
            isActive={contact._id === activeId}
            onClick={() => onSelect(contact._id)}
          />
        ))}
      </div>

      {/* Current user strip */}
      <div style={{
        padding: "12px 16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
        <Avatar name={user?.name || "?"} size={36} />
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#e8e8f0" }}>
          {user?.name}
        </div>
        <button style={{
          background: "transparent",
          border: "none",
          color: "rgba(180,180,200,0.4)",
          fontSize: 18,
          cursor: "pointer"
        }}>

        </button>
      </div>
    </aside>
  );
}
