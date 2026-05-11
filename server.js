import express from "express";
import cors from "cors";
import OpenAI from "openai";

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

    res.status(200).json({
      reply:
        completion.choices[0].message.content
    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      reply: "Backend server error"
    });

  }

});

/* IMPORTANT FOR VERCEL */

export default app;
