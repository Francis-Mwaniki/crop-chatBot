"use client";
// pages/index.tsx

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useCompletion, useChat } from "ai/react";
import { ArrowUpIcon, CopyCheckIcon, CopyIcon, Loader2, RefreshCcw, Trash, Trash2 } from "lucide-react"
import Head from 'next/head';
import { Card, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
interface Props {
  userAddedCrops: string[
  ];
}

interface cropCondition {
  ph: string;
  region: string;
  rainfall: string;
  temperature: string;
  soilType: string;
  soilFertility: string;
  humidity: string;
  altitude: string;
  sunlight: string;
  wind: string;
  pests: string;
  diseases: string;
  irrigation: string;
  fertilization: string;
  harvesting: string;
  storage: string;
}

const example= {
  ph: "5.5-7.5",
  rainfall: "1000-1500mm",
  temperature: "25-30°C",
  soilType: "Loamy",
  soilFertility: "High",
  region: "Western Kenya",
  humidity: "60-80%",
  altitude: "1000-1500m",
  sunlight: "6-8 hours",
  wind: "Moderate",
  pests: "Aphids, Thrips, Cutworms",
  diseases: "Rust, Blight",
  irrigation: "Regular",
  fertilization: "Regular",
  harvesting: "6-8 months",
  storage: "Cool, Dry place"
}
export default function Home() {
  const [fetchAdvisory, setFetchAdvisory] = useState<boolean>(false);
  const [advisory, setAdvisory] = useState<string | null>(null);
  const regions = ["Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo-Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi"];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const predefinedCrops = ["Maize",
  "Tea",
  "Coffee",
  "Horticultural crops",
  "Sugarcane",
  "Tobacco",
  "Wheat",
  "Barley",
  "Pyrethrum",
  "Beans",
  "Bananas",
  "Pineapples",
  "Mangoes",
  "Avocado",
  "Papaya",
  "Passion fruit",
  "Irish potatoes",
  "Sweet potatoes",
  "Cassava",
  "Sorghum",
  "Millet",
  "Rice",
  "Sesame",
  "Sunflower",
  "Cotton",
  "Soybeans",
  "Groundnuts",
  "Green grams",
  "Lentils",
  "Cowpeas",
  "Pigeon peas",
  "Sorghum",
  "Finger millet",
  "Pearl millet",
  "Sugarcane",
  "Sweet sorghum",
  "Napier grass",
  "Pyrethrum",
  "Chilies",
  "Onions",
  "Tomatoes",
  "Carrots",
  "Cabbages",
  "Kale",
  "Spinach",
  "Broccoli",
  "Cauliflower",
  "Capsicums",
  "Pumpkins",
  "Watermelons"];
  const [prompt, setPrompt] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const clearRef = useRef<HTMLElement | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showExample, setShowExample] = useState<boolean>(false);
  const [PH, setPH] = useState<string>('');
  const [rainfall, setRainfall] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [soilFertility, setSoilFertility] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [altitude, setAltitude] = useState<string>('');
  const [sunlight, setSunlight] = useState<string>('');

  // const [wind, setWind] = useState<string>('');
  // const [pests, setPests] = useState<string>('');
  // const [diseases, setDiseases] = useState<string>('');
  // const [irrigation, setIrrigation] = useState<string>('');
  // const [fertilization, setFertilization] = useState<string>('');
  // const [harvesting, setHarvesting] = useState<string>('');
  // const [storage, setStorage] = useState<string>('');
  // const [marketOpportunities, setMarketOpportunities] = useState<string>('');

  const rainfalls = [
    "1000-1500mm",
    "1500-2000mm",
    "2000-2500mm",
    "2500-3000mm",
    "3000-3500mm",
    "3500-4000mm",
    "4000-4500mm",
    "4500-5000mm",
  ];
  const temperatures = [
    "25-30°C",
    "30-35°C",
    "35-40°C",
    "40-45°C",
    "45-50°C",
    "50-55°C",
    "55-60°C",
    "60-65°C",
  ];
  const phs = [
    "5.5-6.5",
    "6.5-7.5",
    "7.5-8.5",
    "8.5-9.5",
    "9.5-10.5",
    "10.5-11.5",
    "11.5-12.5",
    "12.5-13.5",
  ];
  const soilTypes = [
    "Sandy",
    "Clay",
    "Loamy",
    "Silty",
    "Peaty",
    "Chalky",
    "Sandy Loam",
    "Clay Loam",
    "Silt Loam",
    "Peat Loam",
    "Chalky Loam",
  ];
  const soilFertilities = [
    "Low",
    "Medium",
    "High",
    "Very High",
    "Extremely High",
  ];
  const humidities = [
    "0-20%",
    "20-40%",
    "40-60%",
    "60-80%",
    "80-100%",
  ];
  const altitudes = [
    "0-500m",
    "500-1000m",
    "1000-1500m",
    "1500-2000m",
    "2000-2500m",
    "2500-3000m",
    "3000-3500m",
    "3500-4000m",
  ];
  const sunlights = [
    "0-2 hours",
    "2-4 hours",
    "4-6 hours",
    "6-8 hours",
    "8-10 hours",
    "10-12 hours",
    "12-14 hours",
    "14-16 hours",
  ];
  const wind = [
    "Low",
    "Moderate",
    "High",
    "Very High",
    "Extremely High",
  ];
  const pests = [
    "Aphids",
    "Thrips",
    "Cutworms",
    "Armyworms",
    "Bollworms",
    "Stem borers",
    "Whiteflies",
    "Leaf miners",
    "Mites",
    "Nematodes",
    "Rodents",
    "Birds",
    "Insects",
    "Mammals",
  ];
  const diseases = [
    "Rust",
    "Blight",
    "Mildew",
    "Leaf spot",
    "Wilt",
    "Rot",
    "Blight",
    "Mosaic",
    "Canker",
    "Scab",
    "Curl",
    "Anthracnose",
    "Smuts",
    "Blast",
    "Spot",
  ];
  const irrigation = [
    "Regular",
    "Frequent",
    "Occasional",
    "Rare",
    "Very Rare",
  ];
  const fertilization = [
    "Regular",
    "Frequent",
    "Occasional",
    "Rare",
    "Very Rare",
  ];
  const harvesting = [
    "1-3 months",
    "3-6 months",
    "6-9 months",
    "9-12 months",
    "12-15 months",
    "15-18 months",
    "18-21 months",
    "21-24 months",
  ];
  const storage = [
    "Cool, Dry place",
    "Warm, Dry place",
    "Cool, Wet place",
    "Warm, Wet place",
    "Cold, Dry place",
    "Cold, Wet place",
    "Hot, Dry place",
    "Hot, Wet place",
  ];
  const marketOpportunities = [
    "Local",
    "Regional",
    "National",
    "International",
  ];
  
  

  const { complete, completion, isLoading, stop } = useCompletion({
    api: "/api/cropB",
  });


  const handleClear = () => {
    // clearRef to clear the completion

      clearRef.current = null;
    setPH('');
    setRainfall('');
    setTemperature('');
    setSoilType('');
    setSoilFertility('');
    setHumidity('');
    setAltitude('');
    setSunlight('');

    //reset completion
    setAdvisory(null);
    
  }
  const [newCrop, setNewCrop] = useState<string>('');
  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [completion]);
  useEffect(() => {
    if (fetchAdvisory  && region && PH && rainfall && temperature && soilType && soilFertility && humidity && altitude && sunlight) {
      console.log("fetching advisory");
      const newAdvisory = `Advisory for ${PH}, ${rainfall}, ${temperature}, ${soilType}, ${soilFertility}, ${humidity}, ${altitude}, ${sunlight}`;
      setAdvisory(newAdvisory);
      setFetchAdvisory(false); // Reset the flag
    }
  }, [fetchAdvisory, region, PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight]);

  const handleSubmit = async () => {
    console.log("Button clicked!");
    console.log("Crops", PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight);
    // if (PH && rainfall && temperature && soilType && soilFertility && humidity && altitude && sunlight) {
    //   setFetchAdvisory(true);
    // }

    if (PH && rainfall && temperature && soilType && soilFertility && humidity && altitude && sunlight && region) {
      setGenerating(true);
      setPrompt(JSON.stringify({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region }));
      await complete(JSON.stringify({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region }));
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
      <section className='mb-16'>
        <h1 className="text-4xl font-bold text-center mt-8">Crop Advisory App</h1>
        <p className="text-center mt-4">
          Get better advisory for your crops
        </p>
        {/* Nav */}
        <nav className="flex justify-center items-center mt-8">
          <a 
          onClick={() => setShowExample(!showExample)}
          href="#contact" className=" bg-black px-2 py-1 rounded-md text-white  hover:bg-slate-900 transition-all ml-4">Example 
          Advisory
          </a>
        </nav>
{
  !generating && (<>
   {
         showExample && !generating && (
          <Card className="p-4 flex flex-col items-center m-5 max-w-md w-full rounded-md shadow-md">
      <CardDescription className="text-center">Example Advisory</CardDescription>
      <Card className="p-4 m-2 flex flex-row justify-center gap-x-2
          bg-transparent w-full sm:max-w-2xl max-w-full
          ">
       

       

        {/* copy  */}
        <Button
        className='bg-transparent text-black hover:bg-transparent'
          onClick={() => {
           handleCopy(
              JSON.stringify(example, null, 2)
           )
          }}
        >
          {
            isCopied ? 
            <CopyCheckIcon className='w-6 h-6' />  : <CopyIcon className='w-6 h-6' />
          }
        </Button>
        </Card>
      <p className="text-center font-medium text-gray-700 mt-8">
        {JSON.stringify(example, null, 2)}
      </p>
      </Card>
         )
      }
  
  <main className="container mx-auto mt-8 p-4   flex flex-col items-center">
       <Card className="p-4">
       <Tabs defaultValue="select" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="select">Select Crops</TabsTrigger>
        <TabsTrigger value="addcrops">Preference(add manually)</TabsTrigger>
      </TabsList>
      <TabsContent value="select">
      {/* <div className="mb-4">
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
      </div> */}
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
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select ph:</label>
        <select
          value={PH}
          onChange={(e) => setPH(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select ph</option>
          {phs.map((ph) => (
            <option key={ph} value={ph}>{ph}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Rainfall:</label>
        <select
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Rainfall</option>
          {rainfalls.map((rainfall) => (
            <option key={rainfall} value={rainfall}>{rainfall}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Temperature:</label>
        <select
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Temperature</option>
          {temperatures.map((temperature) => (
            <option key={temperature} value={temperature}>{temperature}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Soil Type:</label>
        <select
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Soil Type</option>
          {soilTypes.map((soilType) => (
            <option key={soilType} value={soilType}>{soilType}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Soil Fertility:</label>
        <select
          value={soilFertility}
          onChange={(e) => setSoilFertility(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Soil Fertility</option>
          {soilFertilities.map((soilFertility) => (
            <option key={soilFertility} value={soilFertility}>{soilFertility}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Humidity:</label>
        <select
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Humidity</option>
          {humidities.map((humidity) => (
            <option key={humidity} value={humidity}>{humidity}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Altitude:</label>
        <select
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Altitude</option>
          {altitudes.map((altitude) => (
            <option key={altitude} value={altitude}>{altitude}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Sunlight:</label>
        <select
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
          className="p-2 border border-gray-50 rounded w-full"
        >
          <option value="" disabled>Select Sunlight</option>
          {sunlights.map((sunlight) => (
            <option key={sunlight} value={sunlight}>{sunlight}</option>
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
        {/* <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Add Your Crop:</label>
          <Card className="flex items-center p-4">
            <Input
              type="text"
              className="p-2 border border-gray-300 rounded mr-2"
              value={newCrop}
              onChange={(e) => setCrop(e.target.value)}
            />
          </Card>
        </div> */}
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
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select ph:</label>
        <Input
          value={PH}
          onChange={(e) => setPH(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Rainfall:</label>
        <Input
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Temperature:</label>
        <Input
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Soil Type:</label>
        <Input
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Soil Fertility:</label>
        <Input
          value={soilFertility}
          onChange={(e) => setSoilFertility(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Humidity:</label>
        <Input
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Altitude:</label>
        <Input
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          className=""
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Sunlight:</label>
        <Input
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
          className=""
        />
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
    <div className="text-center mt-52  fixed inset-0 z-30 bg-transparent
     opacity-80 flex flex-col items-center
      backdrop-filter backdrop-blur-lg

     ">
      <div className='  text-3xl p-5'>
        Analyzing your data to generate an advisory
      </div>
      <img src="/load.gif" alt="loader" className="w-40 h-40" />
    </div>
  )
}

{
  completion && (
    <div ref={clearRef as React.RefObject<HTMLDivElement>} className={`${isLoading ? 'hidden' : 'block'}`}>
     <Card 
    ref={(ref) => (messagesRef.current = ref as HTMLDivElement)}
     className='p-4 flex flex-col items-center m-5
      bg-transparent border-none sm:max-w-2xl w-full shadow-transparent
      overflow-hidden
      ' style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <h2 className="text-center">Crop Analysis </h2>
      <span
       ref={(ref) => (messagesRef.current = ref as HTMLDivElement)}
      >
<pre

       
       style={
        {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontFamily: 'monospace',

        }
       }
        className="text-start 
         bg-transparent   p-4 rounded-md w-full sm:max-w-2xl max-w-full overflow-auto
        text-sm mt-4

        ">
          <Markdown remarkPlugins={[remarkGfm]}>
             {completion}
          </Markdown>
         
        </pre>

     
      </span>
          <Card className="p-4 m-2 flex flex-row justify-center gap-x-2
          bg-transparent w-full sm:max-w-2xl max-w-full
          ">
        <Button
          onClick={() => {
            complete(JSON.stringify({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region }));
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
             handleClear();
             
            
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
    </div>
   
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

     
      


      
      <footer className="flex flex-row justify-between fixed bottom-0 inset-x-0 z-20 bg-white opacity-100 items-center  mt-8">
      <div className="flex flex-col justify-center items-center">
        </div>
       <div className="flex flex-col justify-center items-center">
       <p className="text-center">Crop Advisory App</p>
       
        <p className="text-center">© {new Date().getFullYear()}</p>
        </div>
        <div
        onClick={() => {
          window.scrollTo(0, 0);
        }
        }
         className=' mr-4 rounded-full bg-black text-white p-2'>
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <ArrowUpIcon className="w-8 h-8" />
    </TooltipTrigger>
    <TooltipContent>
      <p>
       Scroll to top 
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>



        </div>
        
        
      </footer>
    </div>
  );
}
