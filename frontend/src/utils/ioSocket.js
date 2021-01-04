import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000/"
let socket = io(ENDPOINT);
export default socket;