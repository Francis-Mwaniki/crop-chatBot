"use client";
// pages/index.tsx

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useCompletion, useChat } from "ai/react";
import { CopyCheckIcon, CopyIcon, Loader2, RefreshCcw, Trash, Trash2 } from "lucide-react"
import Head from 'next/head';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface Props {
  userAddedCrops: string[
  ];
}
export default function Home() {
  const [fetchAdvisory, setFetchAdvisory] = useState<boolean>(false);
  const [advisory, setAdvisory] = useState<string | null>(null);
  const regions = ['Nakuru', 'Eldoret', 'Nairobi', 'Mombasa'];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const predefinedCrops = ['Maize', 'Wheat', 'Rice', 'Barley'];
  const [prompt, setPrompt] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { complete, completion, isLoading, stop } = useCompletion({
    api: "/api/cropB",
  });

  const [newCrop, setNewCrop] = useState<string>('');
  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [completion]);
  useEffect(() => {
    if (fetchAdvisory && crop && region) {
      console.log("fetching advisory");
      const newAdvisory = `Advisory for ${crop} in ${region}`;
      setAdvisory(newAdvisory);
      setFetchAdvisory(false); // Reset the flag
    }
  }, [fetchAdvisory, crop, region]);

  const handleSubmit = async () => {
    console.log("Button clicked!");
    console.log("Crop:", crop);
    console.log("Region:", region);

    if (crop && region) {
      setGenerating(true);
      setPrompt(JSON.stringify({ crop, region }));
      await complete(JSON.stringify({ crop, region }));
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  }
  

  return (
    <div className=" flex flex-col justify-center
    items-center mx-auto">
      <Head>
        <title>Crop Advisory App</title>
        <meta name="description" content="Crop Advisory App using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className="text-4xl font-bold text-center mt-8">Crop Advisory App</h1>
        <p className="text-center mt-4">Get advisory for your crops</p>
{
  !generating && (<>
  
  <main className="container mx-auto mt-8 p-4   flex flex-col items-center">
       <Card className="p-4">
       <Tabs defaultValue="select" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="select">Select Crops</TabsTrigger>
        <TabsTrigger value="addcrops">Add Crops Manually</TabsTrigger>
      </TabsList>
      <TabsContent value="select">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Crop:</label>
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Crop</option>
          {predefinedCrops.map((crop) => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </div>
        <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Region:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
  
        {/* submit */}
        <Button
          className="w-full"
          onClick={handleSubmit}
        >
          Get Advisory
        </Button>
      </TabsContent>
      <TabsContent value="addcrops">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Add Your Crop:</label>
          <Card className="flex items-center p-4">
            <Input
              type="text"
              className="p-2 border border-gray-300 rounded mr-2"
              placeholder="Enter crop name"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            />
          </Card>
        </div>
        <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Region:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option 
          className=''
          value="" disabled>Select Region</option>
          {regions.map((region) => (
            <option
            className='p-2 bg-gray-50 py-3'
             key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
     
        {/* submit */}
        <Button
        
          className="w-full"
          onClick={handleSubmit}
        >
          Get Advisory
        </Button>
      </TabsContent>
    </Tabs>
        
       </Card>

      </main>
  </>)
}

{
  isLoading && (
    <div className="text-center flex flex-col items-center">
      <p>Generating advisory...</p>
      <img src="/load.gif" alt="loader" className="w-10 h-10" />
    </div>
  )
}

{
  completion && (
    <Card 
    ref={(ref) => (messagesRef.current = ref as HTMLDivElement)}
     className='p-4 flex flex-col items-center m-5
      bg-white sm:max-w-2xl w-full rounded-md shadow-md
      overflow-hidden
      ' style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ccc', borderRadius:10 }}>
      <h2 className="text-center">Advisory for {crop} in {region}</h2>
      <span
       ref={(ref) => (messagesRef.current = ref as HTMLDivElement)}
      >
<pre
       
       style={
        {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'

        }
       }
        className="text-start 
         bg-transparent   p-4 rounded-md w-full sm:max-w-2xl max-w-full overflow-auto
        text-sm mt-4

        ">
          {completion}
        </pre>

     
      </span>
          <Card className="p-4 m-2 flex flex-row justify-center gap-x-2
          bg-transparent w-full sm:max-w-2xl max-w-full
          ">
        <Button
          onClick={() => {
            setGenerating(false);
            stop();
          }}
        >
          <RefreshCcw className='w-6 h-6' />
        </Button>

        <Button
          onClick={() => {
            setGenerating(false);
            setCrop('');
            setRegion('');
            setAdvisory(null);
          }}
        >
          <Trash2 className='w-6 h-6' />
        </Button>

        {/* copy  */}
        <Button
          onClick={() => {
           handleCopy(completion)
          }}
        >
          {
            isCopied ? 
            <CopyCheckIcon className='w-6 h-6' />  : <CopyIcon className='w-6 h-6' />
          }
        </Button>
        </Card>
    </Card>
  )
}


{
  error && (
    <div className="text-center">
      <p>Error: {error}</p>
    </div>
  )
}



      </section>

     
      


      
    </div>
  );
}
