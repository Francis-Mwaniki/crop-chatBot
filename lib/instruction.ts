
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

const cropInstruction = ({ crop, region }: { crop: string; region: string }): CropInstruction => {
    // Sample instructions for growing rice in Eldoret
    const instructions = {
      GeneralInstructions: `WITHOUT DEVIATING, Assume the role as an advisor for a farmer growing ${crop} in ${region}. Provide detailed instructions on how to grow ${crop} in ${region}. in the format below:`,
      crop: `${crop}`,
      region: `${region}`,
      duration: `Predict The typical duration for growing ${crop} in ${region} .`,
      bestConditions: `Provide the best conditions for growing ${crop} in ${region}.`,
      bestTimeToPlant: `Suggest the best time to plant ${crop} in ${region}.`,
      additionalTips: `Provide additional tips for growing ${crop} in ${region}.`,
      fertilization: `Suggest the best fertilization practices for growing ${crop} in ${region}.`,
      pestManagement: `Provide the best pest management practices for growing ${crop} in ${region}.`,
      diseasePrevention: `Provide the best disease prevention practices for growing ${crop} in ${region}.`,
      harvesting: `Provide the best harvesting practices for growing ${crop} in ${region}.`,
      storage: `Provide the best storage practices for ${crop} in ${region}.`,
      marketOpportunities: `Provide the best market opportunities for ${crop} in ${region}.`,
      // Add any other relevant information based on the parameters passed
    };
  
    return instructions;
  };
  

  export {
    cropInstruction,
  }
  