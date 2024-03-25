import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { cropInstruction } from "../../../lib/instruction"; // Assuming this function remains unchanged
import { NextResponse } from "next/server";
const apikey="AIzaSyCUP6NgFTLHkSwit4HK-nuE4Uq4NdzSp7U"
const genAI = new GoogleGenerativeAI( apikey || '');
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const data = await req.json();
  const parsedObject = JSON.parse(data.prompt);

  const {
    PH,
    rainfall,
    temperature,
    soilType,
    soilFertility,
    humidity,
    altitude,
    sunlight,
    region
  } = parsedObject;

  console.log("Data", parsedObject);
  
  if (!region || !soilType || !soilFertility || !humidity || !altitude || !sunlight || !temperature || !rainfall || !PH) {
    return NextResponse.json("Please provide a valid crop and region", {
      status: 400,
    });
  }

  const instructions = cropInstruction({
    PH,
    rainfall,
    temperature,
    soilType,
    soilFertility,
    humidity,
    altitude,
    sunlight,
    region
  });

  const prompt = instructions.GeneralInstructions;
  const part_of_instructions = JSON.stringify(instructions);
 
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts:[{ text: part_of_instructions
      },
        
      ],
      
     }],
    });
 
  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}