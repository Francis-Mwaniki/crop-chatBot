

interface CropInstruction {
    GeneralInstructions: string;
    crop: string;
    region: string;
    duration: string;
    bestConditions: string;
    bestTimeToPlant: string;
    additionalTips: string;
    fertilization: string;
    pestManagement: string;
    diseasePrevention: string;
    harvesting: string;
    storage: string;
    marketOpportunities: string;
  }

  interface conditions {
    PH: number;
    rainfall: number;
    temperature: number;
    soilType: string;
    soilFertility: string;
    humidity: number;
    altitude: number;
    sunlight: number;
    region: string;
  }
const cropInstruction = ({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  }: conditions) => {
    // Sample instructions this  conditios PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  
    const instructions = {
      GeneralInstructions: `WITHOUT DEVIATING, Assume the role as an advisor for a farmer growing ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      note:`
       Based on the conditions, provide the best advice to the farmer,
       market opportunities, best time to plant, fertilization, pest management, disease prevention, harvesting, storage, and additional tips.
      `,
      IMPORTANT:`
       If no advice is given, please provide do not hesitate to provide the best advice to the farmer.
      `
   
      
    };
  
    return instructions;
  };
  

  export {
    cropInstruction,
  }
  