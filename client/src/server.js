import axios from "axios";

const serverAddress = process.env.SERVER_ADDRESS || 'localhost';
const serverPort = process.env.SERVER_PORT || 3042;

const server = axios.create({
  baseURL: `http://${serverAddress}:${serverPort}`,
});

export default server;
