// pages/api/generateReport.js
import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
    console.log(req.body)
    const { prompt } = await req.json();

 console.log(prompt);
 
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
       Your a story generator, you can generate a story based on the details provided below.

        `,
      },
      {
        role: "user",
        content: `
         ${prompt}
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

         