import React from "react";

const LocationSearchPanel = ({setVehiclePanel,setPanelOpen}) => {
  const locations = [
    {
        id:1,
      main: "Army Institute of Technlogy Pune",
      footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
    },
    {
        id:2,
      main: "MIT Pune",
      footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
    },
    {
        id:3,
      main: "COE Pune",
      footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
    },
    {
        id:4,
      main: "PICT Pune",
      footer: "Dighi road, Vishrantwadi, Pune, Maharashtra",
    },
  ];

  return (
    <div>
      {/* this is just a sample data  */}
      {locations.map((map) => {
        
        return (
          <div key={map.id} onClick={()=>{
            setVehiclePanel(true);
            setPanelOpen(false);
          }} className="flex items-center justify-start py-2 my-3 gap-3 border-b">
            <h2 className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center ">
              <i className="ri-school-fill  text-2xl"></i>
            </h2>
            <div>
              <h4 className="font-bold"> {map.main} </h4>
              <span className="text-sm">
                {map.footer}
              </span>
            </div>
          </div>
        );
      })}
      {/* <div className="flex items-center justify-start py-2 my-3 gap-3 border-b">
        <h2 className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center ">
          <i className="ri-school-fill  text-2xl"></i>
        </h2>
        <div>
          <h4 className="font-bold">Army Institute of Technlogy Pune </h4>
          <span className="text-sm">
            Dighi road, Vishrantwadi, Pune, Maharashtra
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default LocationSearchPanel;
