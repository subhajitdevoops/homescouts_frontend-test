import axios from "axios";
import configData from "./config.json";

//   -------------ApiRequist -----------------
export const API_REQ_GET = async (URL, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(
          URL,
          token && {
            headers: {
              authtoken: token,
            },
          }
        )
        .then((response) => {
          let resData = response && response.data;
          // console.log("Response Data........", response);
          resolve(resData);
        })
        .catch((error) => {
          console.log("Response Error........!", error);
          resolve(error);
        });
    } catch (err) {
      console.log("Error---->", err);
      reject(false);
    }
  });
};

//   -------------ApiRequist -----------------
export const API_REQ_POST = async (URL, RequestData) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(URL, RequestData)
        .then((response) => {
          let resData = response && response.data;
          console.log("Response Data........", resData);
          resolve(resData);
        })
        .catch((error) => {
          console.log("Response Error........!", error);
          resolve(error);
        });
    } catch (err) {
      console.log("Error---->", err);
      reject(false);
    }
  });
};
//   -------------ApiRequist With Token -----------------
export const API_REQ_POST_WITH_TOKEN = async (URL, RequestData, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(URL, RequestData, {
          headers: {
            authtoken: token,
          },
        })
        .then((response) => {
          let resData = response && response.data;
          console.log("Response Data........", resData);
          resolve(resData);
        })
        .catch((error) => {
          console.log("Response Error........!", error);
          resolve(error.response);
        });
    } catch (err) {
      console.log("Error---->", err);
      reject(false);
    }
  });
};

// export async function updateVmd(token,vmdMsgText,vmdAction,vmd_media,media_link){
//     return new Promise((resolve,reject)=>{

//       const formData = new FormData();
//       formData.append("action_on", vmdAction);

//       if(vmdMsgText && vmdMsgText !== ""){
//         formData.append("message_text", vmdMsgText);
//       }
//       if(vmd_media && vmd_media !== ""){
//         formData.append("vmd_media", vmd_media);
//       }
//       if(media_link && media_link !== ""){
//         formData.append("media_link", media_link);
//       }

//       console.log("Action on formData ",formData.getAll("message_text"));
//       console.log("Action on formData ",formData.getAll("action_on"));

//       try{
//           axios.post('http://localhost:5555/api/vmd/updateVmd',formData,{
//             headers: {
//               'authorization':`JWT ${token}`,
//               }
//           }).then(function (response) {
//             console.log("response of all lane",response);
//             let setOrUpdateVmd = response && response.data;
//             console.log("Default messages in service....",setOrUpdateVmd);
//             resolve(setOrUpdateVmd);
//           }).catch(function (error) {
//             // handle error
//             console.log(error.response.data);
//             resolve(error.response.data);
//           })
//         }catch(err){
//           console.log("Error :-",err);
//           reject(false);
//       }

//     })
//   }
