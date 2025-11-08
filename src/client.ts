import clipboardy from "clipboardy";
import { io } from "socket.io-client";
import "dotenv/config";

console.log(process.env.SOCKET_IP);
const socket = io(process.env.SOCKET_IP || "http://localhost:3000");

socket.on("connect", () => {
  console.log("socket connected to server");
  watchClipboard();
});

let lastContent = "";
function watchClipboard() {
  setInterval(async () => {
    const content = await clipboardy.read();
    console.log(await clipboardy.read(), content !== lastContent);
    if (content !== lastContent) {
      lastContent = content;
      socket.emit("copy", content);
    }
  }, 500);
}
