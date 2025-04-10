import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initSocket, disconnectSocket } from "../socket";
import axios from "axios";
import useLogout from "../hooks/useLogout";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username] = useState(localStorage.getItem("username"));
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rooms/${roomId}`,
          {
            withCredentials: true,
          }
        );
        setRoomName(res.data.name);
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomName();

    const socket = initSocket();
    socket.emit("join-room", { roomId, username });

    socket.on("chat-message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat-message");
      disconnectSocket();
    };
  }, [roomId, username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const socket = initSocket();
    socket.emit("send-message", { roomId, message, username });

    setMessage("");
  };

  const goToRoomSelection = () => {
    navigate("/rooms");
  };

  return (
    <>
      {/* Log Out Button */}
      <button
        onClick={logout}
        className="fixed top-4 right-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer"
      >
        Log out
      </button>

      <div className="p-6 max-w-xl mx-auto bg-gray-50 rounded-lg shadow-md">
        {/* Go to Room Selection Button */}
        <div className="text-center mb-6">
          <button
            onClick={goToRoomSelection}
            className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 cursor-pointer"
          >
            Back to Room Selection
          </button>
        </div>

        {/* Display Room Name or Loading Message */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          {loading ? "Loading room..." : `Room: ${roomName}`}
        </h2>

        <div className="h-96 overflow-y-auto bg-gray-50 p-4 mb-4 border rounded-lg shadow-md">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${
                msg.username === username ? "justify-end" : "justify-start"
              }`}
            >
              {/* Chat Bubble */}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.username === username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <div className="font-semibold">{msg.username}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input and Send Button */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
