import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({
  limit: "50mb"
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/analyze", async (req, res) => {

  try {

    const { message } = req.body;

    console.log("REQUEST RECEIVED");

    const completion =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content:
              "You are Coco, a luxury skincare AI assistant."
          },
          {
            role: "user",
            content:
              message || "Hello"
          }
        ]

      });

    res.json({
      reply:
        completion.choices[0].message.content
    });

  }

  catch(error){

    console.log("OPENAI ERROR:");
    console.log(error);

    res.status(500).json({
      reply: "Server error"
    });

  }

});

app.listen(3000, () => {

  console.log(
    "Server running on port 3000"
  );

});