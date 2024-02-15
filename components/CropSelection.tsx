
import React from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

type CropSelectionProps = {
    onSelect: (value: string) => void;
    userAddedCrops: string[];
  };

const CropSelection = ({ onSelect, userAddedCrops }: CropSelectionProps) => {
    const predefinedCrops = ['Maize', 'Wheat', 'Rice', 'Barley'];
  
    return (
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Crop:</label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Crop" />
          </SelectTrigger>
          <SelectContent>
            {predefinedCrops.map((crop) => (
              <SelectItem key={crop} value={crop} 
              onSelect={() => onSelect(crop)}
              >
                {crop}
              </SelectItem>
            ))}
            {userAddedCrops.map((crop) => (
              <SelectItem key={crop} value={crop} 
                onSelect={() => onSelect(crop)}>
                {crop} 
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      
      </div>
    );
  };
  

export default CropSelection;