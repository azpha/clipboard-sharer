import clipboardy from "clipboardy";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

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
