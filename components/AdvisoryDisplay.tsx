
import React from "react";
interface AdvisoryDisplayProps {
    advisory: string;
}


const AdvisoryDisplay = ({ advisory }: AdvisoryDisplayProps) => {
    return (
      <div className="mt-8 p-4 border border-gray-300 rounded">
        <h2 className="text-xl font-semibold mb-4">Crop Advisory</h2>
        <p>{advisory}</p>
      </div>
    );
  };
  

export default AdvisoryDisplay;