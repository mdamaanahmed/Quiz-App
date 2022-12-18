const PORT = process.env.PORT || 8200;
const HOST = process.env.HOST || "localhost";
const app = require("./app");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000"
}))

const requireDir = require("require-dir");
requireDir("./controllers");
requireDir("./routes");

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
})