import clipboardy from "clipboardy";
import notifier from "node-notifier";
import { io } from "socket.io-client";
import "dotenv/config";

const socket = io(process.env.SOCKET_IP || "http://localhost:3000");
let lastContent = "";
let fromOtherMachine = "";

socket.on("connect", () => {
  console.log("socket connected to server");
  watchClipboard();
});
socket.on("copy", (args) => {
  fromOtherMachine = args;
  notifier.notify({
    title: "Clipboard Sharer",
    message: "A new string is available for copy!",
    wait: true,
  });
});

notifier.on("click", async function () {
  await clipboardy.write(fromOtherMachine);
});

function watchClipboard() {
  setInterval(async () => {
    const content = await clipboardy.read();
    if (content !== lastContent) {
      lastContent = content;
      socket.emit("copy", content);
    }
  }, 500);
}
