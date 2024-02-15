
import React from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

type RegionSelectionProps = {
    onSelect: (value: string) => void;
  };
const RegionSelection = ({ onSelect }: RegionSelectionProps) => {
    const regions = ['Nakuru', 'Eldoret', 'Nairobi', 'Mombasa'];
  
    return (
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Region:</label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region} 
              onClick={() => onSelect(region)}
              >
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

export default RegionSelection;
  