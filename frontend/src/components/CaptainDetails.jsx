import { useContext } from 'react'
import React from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center p-2 bg-yellow-400">
        <div className="flex justify-start items-center space-x-4">
          <img className="w-14 rounded-full" src="../images/Profile Photo.png" alt="" />
          <h4 className="text-lg font-light capitalize">{captain?.fullname.firstname} {captain?.fullname.lastname}</h4>
        </div>
        <div className="p-2">
          <h4 className="text-xl font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="text-center flex justify-between p-2 bg-yellow-400">
        <div>
          <i className="text-2xl font-extralight ri-history-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div>
          <i className="text-2xl font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">22.2 km</h5>
          <p className="text-sm text-gray-600">Distance covered</p>
        </div>
        <div>
          <i className="text-2xl font-extralight ri-booklet-line"></i>
          <h5 className="text-lg font-medium">12</h5>
          <p className="text-sm text-gray-600">Trips Log</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails