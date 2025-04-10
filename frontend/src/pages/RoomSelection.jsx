import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const RoomSelection = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();
  const { loading, logout } = useLogout();

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms", {
        withCredentials: true,
      });
      setRooms(res.data);
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const createRoom = async () => {
    if (!newRoom.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rooms",
        { name: newRoom },
        { withCredentials: true }
      );
      const data = await res.data;
      setNewRoom("");
      navigate(`/chat/${data._id}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const goToMyRooms = () => {
    navigate("/my-rooms");
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

      <div className="p-6 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Select or Create a Room
        </h2>

        {/* Fetch Rooms Button */}
        <div className="text-center mb-6 flex justify-center gap-4">
          <button
            onClick={fetchRooms}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 cursor-pointer"
          >
            Päivitä huoneet
          </button>

          {/* My Rooms Button */}
          <button
            onClick={goToMyRooms}
            className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 cursor-pointer"
          >
            My Rooms
          </button>
        </div>

        {/* Rooms List */}
        <ul className="mb-6 space-y-4">
          {rooms.map((room) => (
            <li
              key={room._id}
              className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg"
            >
              <span className="text-xl font-medium">{room.name}</span>
              <button
                onClick={() => joinRoom(room._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer"
              >
                Join
              </button>
            </li>
          ))}
        </ul>

        {/* Create Room Form */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <input
            type="text"
            placeholder="Room name"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={createRoom}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomSelection;
