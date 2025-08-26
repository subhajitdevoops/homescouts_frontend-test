import { useLocation } from "react-router-dom";
import ImageKit from "imagekit-javascript";
import configData from "../config/config.json";

export const Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
export const createMarkup = (text) => {
  return { __html: text };
};

export const isValidUrl = (urlString) => {
  var inputElement = document.createElement("input");
  inputElement.type = "url";
  inputElement.value = urlString;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const imageKit = async (file, folderPath) => {
  const imagekit = new ImageKit({
    publicKey: configData.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: configData.IMAGEKIT_URL_END_POINT,
    transformationPosition: "path",
    authenticationEndpoint: configData.IMAGEKIT_AUTHENDTICATION_ENDPOINT,
  });

  return new Promise((resolve, reject) => {
    imagekit
      .upload({
        file: file,
        fileName: file.name,
        folder: folderPath,
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((response) => {
        console.log(response);
        resolve(response.url);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const getLocations = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const address = await getUserAddress(
              position.coords.latitude,
              position.coords.longitude
            );
            resolve(address);
          } catch (error) {
            reject(error);
          }
        },
        (error) => showError(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

function showError(error) {
  switch (error.code) {
    // case error.PERMISSION_DENIED:
      // alert("User denied the request for Geolocation.");
      // break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    // case error.UNKNOWN_ERROR:
    //   alert("An unknown error occurred.");
    //   break;
    // default:
    //   alert("An unknown error occurred.");
  }
}
// ------------ MapMyIndia API code for getting Address using latitude and longitude --------
// const MapMyIndia_Api_key = "2c78f7c9768e2cdf375079d84c953d48";//local keys
const MapMyIndia_Api_key = configData.MAP_MY_INDIA_API_KEY; //site keys
// const MapMyIndia_Api_key = "2aa04c2520d1e10fd9fa200e4943d2ca"; //ram keys

const getUserAddress = async (latitude, longitude) => {
  return fetch(
    `https://apis.mapmyindia.com/advancedmaps/v1/${MapMyIndia_Api_key}/rev_geocode?lat=${latitude}&lng=${longitude}&lang=eng`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => console.log(error));
};
