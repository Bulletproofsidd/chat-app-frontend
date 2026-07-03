// Avatar.jsx
// Shows a colored circle with the user's first initial
// color is picked automatically based on the name

const COLORS = [
  "#6c63ff", "#ff6584", "#43d8c9", "#f7a440",
  "#7bed9f", "#ff6b81", "#a29bfe", "#fd79a8"
];

export default function Avatar({ name, size = 38 }) {
  const color = COLORS[name.charCodeAt(0) % COLORS.length];

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: size * 0.38,
      color: "#fff",
      flexShrink: 0,
      fontFamily: "Inter, sans-serif",
      letterSpacing: "-0.3px"
    }}>
      {name[0].toUpperCase()}
    </div>
  );
}
