import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/analyze", async (req, res) => {

  console.log("REQUEST RECEIVED");

  res.status(200).json({
    reply: "Coco backend is working."
  });

});

export default app;
