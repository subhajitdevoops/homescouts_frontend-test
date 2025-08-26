import React, { useContext, useEffect } from 'react'
import Header from '../../Header'
import Nav from '../../Nav'
import ServiceRequest from './ServiceRequest'
import AuthContext from '../../../../context/AuthProvider'

const ServiceRequestMain = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="d-flex">
    <Header sideActive="serviceRequest" />
    <div className="col">
      <Nav 
      setDataTranscript={''}
      />
      <div className="Dashboard_mainContainerDiv">
        <div className="Dashboard_ContainerDiv">
          {/* <Footer /> */}
          <ServiceRequest />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ServiceRequestMain