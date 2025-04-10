// socket.js
import { io } from "socket.io-client";

// Määrittele palvelimen URL, joka voi olla joko localhost tai tuotantopalvelimen IP-osoite
const socketUrl = "http://localhost:5000"; // Vaihda tarvittaessa oikeaan IP-osoitteeseen tai domainiin

let socket;

const initSocket = () => {
  if (!socket) {
    socket = io(socketUrl);  // Käytetään socketUrl:ia yhteyden luomiseen
  }
  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { initSocket, disconnectSocket };
