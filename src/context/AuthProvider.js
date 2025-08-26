import { createContext, useEffect, useState } from "react";
import { getLocations } from "../config/Helper";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [productId, setProductId] = useState(""); //------------------product id
  const [searchQuary, setSearchQuary] = useState(""); //----------------search query from input field
  const [typeOfBusiness, setTypeOfBusiness] = useState("sell"); //-----------property  for sell , buy or rent data
  const [selectSearch, setSelectSearch] = useState(""); //-----------property  for sell , buy or rent data

  const [locations, setLocations] = useState(""); //------------------------- location for property
  // -----------------------service ---------------------------
  const [serviceLocation,setServiceLocation] = useState(""); //-----------------------location for service
  const [serviceSearchQuary, setServiceSearchQuary] = useState(""); //------------------search query for service from searchbar
  //----------------------------------for status --------------------------------------
  const [lists, setLists] = useState([]); //-------------All data from the list
  const [counter, setCounter] = useState(0);
  const [openStory, setOpenStory] = useState(false);
  const [noOfStatus, setNoOfStatus] = useState(0);
  const [currentUserType, setCurrentUserType] = useState("user");
  const [roomId, setRoomId] = useState("");

  // console.log("================typeOfBusiness=========", serviceSearchQuery);
  // -------------------------geo Locations--------------------------------------------
  const [geoLocations, setGeoLocations] = useState([]);
  console.log('getGeoLocation is running',geoLocations);

  const getGeoLocation = async () => {
    let Locations = await getLocations();
    setGeoLocations(Locations);
  };

  useEffect(() => {
    getGeoLocation();
    console.log('getGeoLocation is running');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        productId,
        setProductId,
        searchQuary,
        setSearchQuary,
        typeOfBusiness,
        setTypeOfBusiness,
        locations,
        setLocations,
        serviceLocation,
        setServiceLocation,
        serviceSearchQuary,
        setServiceSearchQuary,
        counter,
        setCounter,
        openStory,
        setOpenStory,
        noOfStatus,
        setNoOfStatus,
        lists,
        setLists,
        roomId,
        setRoomId,
        selectSearch,
        setSelectSearch,
        currentUserType,
        setCurrentUserType,
        geoLocations,
        setGeoLocations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
