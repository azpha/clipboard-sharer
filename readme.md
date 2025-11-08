# clipboard-sharer

A simple socket server to transmit your clipboard between multiple machines

# Usage

On all the machines you want to set up, clone the repository and download all dependencies with `npm i` & then `npm run build`.

Then, on all of the machines you want to share a clipboard, create a `.env` file with the value `SOCKET_IP=http://your-ip-address:3000`.

After you've done that, on the machine you want to host the server (can be on the same machine as a client), run `npm run start:server`. To start the client, run `npm run start:client`. And you're done! Whenever you copy text on a client, it will be broadcasted to all machines on that server.
