import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate(); // Navigate hook for page redirection
  const { loading, logout } = useLogout();

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch("http://localhost:5000/api/rooms/user-rooms", {
        credentials: "include",
      });
      const data = await res.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const deleteRoom = async (roomId) => {
    await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setRooms((prev) => prev.filter((room) => room._id !== roomId));
  };

  const updateRoom = async (roomId) => {
    await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: newName }),
    });

    setRooms((prev) =>
      prev.map((room) =>
        room._id === roomId ? { ...room, name: newName } : room
      )
    );
    setEditingRoomId(null);
    setNewName("");
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

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Omat huoneet
        </h2>

        {/* Centered "Go back" button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => navigate("/rooms")} // Navigate back to the rooms page
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
          >
            Takaisin huoneet valikkoon
          </button>
        </div>

        {rooms.length === 0 ? (
          <p className="text-center text-lg">Sinulta ei löydy omia huoneita!</p>
        ) : (
          <ul className="space-y-4">
            {rooms.map((room) => (
              <li
                key={room._id}
                className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg"
              >
                {editingRoomId === room._id ? (
                  <div className="flex space-x-4 items-center">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <button
                      onClick={() => updateRoom(room._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                      Tallenna
                    </button>
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
                    >
                      Peruuta
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <span className="text-xl font-medium">{room.name}</span>
                    <div className="space-x-4">
                      <button
                        onClick={() => {
                          setEditingRoomId(room._id);
                          setNewName(room.name);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 cursor-pointer"
                      >
                        Muokkaa
                      </button>
                      <button
                        onClick={() => deleteRoom(room._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                      >
                        Poista
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyRooms;
