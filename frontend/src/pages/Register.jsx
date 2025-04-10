import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSignup from "../hooks/useSignup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Rekisteröidy</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full rounded-md"
            type="text"
            placeholder="Käyttäjänimi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 w-full rounded-md"
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-600 cursor-pointer">
            Rekisteröidy
          </button>
          <p className="text-sm text-center">
            Onko sinulla jo tili?{" "}
            <a href="/login" className="text-blue-600 underline">
              Kirjaudu sisään
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
