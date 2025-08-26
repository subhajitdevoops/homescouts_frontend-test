import React, { useContext, useEffect } from 'react';
import Header from '../../Header';
import Nav from '../../Nav';
import './PostPropertyRequest.css';
import PostPropertyRequest from './PostPropertyRequest';
import AuthContext from '../../../../context/AuthProvider';

const PostPropertyRequestMain = () => { 
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="d-flex">
    <Header sideActive="PropertyRequest" />
    <div className="col">
      <Nav 
        setDataTranscript={''}
        />
      <div className="Dashboard_mainContainerDiv">
        <div className="Dashboard_ContainerDiv">
          {/* <PropertyMain /> */}
          <PostPropertyRequest />
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostPropertyRequestMain