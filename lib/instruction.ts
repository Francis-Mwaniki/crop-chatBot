

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
const cropInstruction = ({ PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  }: conditions): CropInstruction => {
    // Sample instructions this  conditios PH, rainfall, temperature, soilType, soilFertility, humidity, altitude, sunlight, region  
    const instructions = {
      GeneralInstructions: `WITHOUT DEVIATING, Assume the role as an advisor for a farmer growing ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      crop:  `Predict the best crop to grow in ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      region: `The best region to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      duration: `The best duration to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      bestConditions: `The best conditions to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      bestTimeToPlant: `The best time to plant ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      additionalTips: `Additional tips to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      fertilization: `The best fertilization to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH} `,
      pestManagement: `The best pest management to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH}`,
      diseasePrevention: `The best disease prevention to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH}`,
      harvesting: `The best harvesting method to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH}`,
      storage: `The best storage method to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH}`,
      marketOpportunities: `The best market opportunities to grow ${region} ${soilType} ${soilFertility} ${humidity} ${altitude} ${sunlight} ${temperature} ${rainfall} ${PH}`, 
    };
  
    return instructions;
  };
  

  export {
    cropInstruction,
  }
  