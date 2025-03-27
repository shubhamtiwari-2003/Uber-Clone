import React from "react";

const LocationSearchPanel = ({setPickuplocations,setDestinationlocations ,setVehiclePanel,setPanelOpen,suggestions,setPickup,setDestination,activeField,setActiveField}) => {

  // const locations = [
  //   {
  //       id:1,
  //     main: "Army Institute of Technlogy Pune",
  //     footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
  //   },
  //   {
  //       id:2,
  //     main: "MIT Pune",
  //     footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
  //   },
  //   {
  //       id:3,
  //     main: "COE Pune",
  //     footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
  //   },
  //   {
  //       id:4,
  //     main: "PICT Pune",
  //     footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
  //   },
  // ];

  const handleSuggestionClick = (suggestions,structuredFormating) => {
    if(activeField === "pickup") {
      setPickup(suggestions);
      setPickuplocations(structuredFormating);
      setActiveField("destination");
    } else {
      setDestination(suggestions);
      setDestinationlocations(structuredFormating);

    }
    
  };

  return (
    <div>
      {/* this is just a sample data  */}
      {suggestions.map((map,idx) => {
        
        return (
          <div key={idx} onClick={()=>{
            handleSuggestionClick(map.description,map.structured_formatting);
          }} className="hover:bg-gray-300 rounded-lg flex items-center justify-start p-2 my-3 gap-3 border-b">
            <h2 className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center ">
              <i className="ri-school-fill  text-2xl"></i>
            </h2>
            <div>
              <h4 className="font-semibold "> {map.structured_formatting.main_text} </h4>
              <span className="text-sm">
                {map.structured_formatting.secondary_text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
