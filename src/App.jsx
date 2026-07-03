// App.jsx
// Root component
// Controls which page to show based on auth state
// Later: use react-router-dom for proper routing
import { useAuth } from "./context/AuthContext";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  // TODO: replace this with real auth check from AuthContext
   const { token } = useAuth()
  return token ? <ChatPage /> : <LoginPage />

}
