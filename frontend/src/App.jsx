import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomSelection from "./pages/RoomSelection";
import ChatRoom from "./pages/ChatRoom";
import MyRooms from "./pages/MyRooms";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Root: jos kirjautunut -> rooms, muuten -> login */}
        <Route path="/" element={authUser ? <Navigate to="/rooms" /> : <Navigate to="/login" />} />

        {/* Login & Register: estä pääsy jos jo kirjautunut */}
        <Route path="/login" element={authUser ? <Navigate to="/rooms" /> : <Login />} />
        <Route path="/register" element={authUser ? <Navigate to="/rooms" /> : <Register />} />

        {/* Suojatut sivut: jos ei authUser, ohjataan login-sivulle */}
        <Route path="/rooms" element={authUser ? <RoomSelection /> : <Navigate to="/login" />} />
        <Route path="/chat/:roomId" element={authUser ? <ChatRoom /> : <Navigate to="/login" />} />
        <Route path="/my-rooms" element={authUser ? <MyRooms /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
