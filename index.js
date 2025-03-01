import path from "path";
import express from "express";

const app = express();
const __dirname = path.resolve();

// 1. 정적 파일 제공 (public 디렉터리)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/drag", (req, res) => {
  res.sendFile(__dirname + "/src/drag/index.html");
});
app.get("/dragselect", (req, res) => {
  res.sendFile(__dirname + "/src/drag_to_select/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
