// pages/api/generateReport.js
import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {cropInstruction} from "../../../lib/instruction"

// /api/completion
const config = new Configuration({
  apiKey: "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"
});
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const openai = new OpenAIApi(config);

export async function POST(req: Request) {

// const cropAndRegion = await req.json()

// console.log(cropAndRegion);


/* { prompt: '{"crop":"Maize","region":"Nakuru"}' } */
const data = await req.json();

// Parsing the string within the object into an object
const parsedObject = JSON.parse(data.prompt);

console.log(parsedObject);
// PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  
const { PH , rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region } = parsedObject;

 if(!region || !soilType || !soilFertility || !humidity || !altitude || !sunlight || !temperature || !rainfall || !PH){
    return NextResponse.json("Please provide a valid crop and region", {
        status: 400,
        });
    }
    

    const instructions = cropInstruction({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  });
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:  JSON.stringify(instructions)
      },
      {
        role: "user",
        content: `
        ${instructions.GeneralInstructions}
        `
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

         