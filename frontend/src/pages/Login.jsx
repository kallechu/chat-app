import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Submitting with username:",
      username,
      "and password:",
      password
    );
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Kirjaudu</h2>
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
          <button className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 cursor-pointer">
            {loading ? "Loading..." : "Kirjaudu"}
          </button>
          <p className="text-sm text-center">
            Ei tiliä?{" "}
            <a href="/register" className="text-blue-600 underline">
              Rekisteröidy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
