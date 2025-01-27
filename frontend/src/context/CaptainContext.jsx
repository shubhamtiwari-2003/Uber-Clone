import React from 'react'
import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {

  const [captain, setCaptain] = useState(null);
  const updateCaptain = (captainData) =>{
    setCaptain(captainData);
  }

  const value = [
    captain,
    setCaptain,
    updateCaptain
  ]
  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext