const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("send-location", (data) => {
        console.log("Message from client:", data);
        io.emit("receive-location", {id: socket.id, ...data}); // Broadcast message to all clients
    });
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});

