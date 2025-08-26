import img1 from "../../../assets/services/Ellipse 31 (1).png";
import img2 from "../../../assets/services/Ellipse 31.png";
// import img1 from '../../../'

const data=[
  {
    id: 1,
    user:{
      name: "Rahul",
      userImg: img2,
    },
    email: "User@gmail.com",
    phone: "+91-6260746453",
    AdsPost: "17",
    Service: [img1, img2, img1, img2, img1, img2],
    AccountType: "personal",
    Active: true,
  },
  {
    id: 2,
    user:{
      name: "Ram",
      userImg: [img1,img2],
    },
    email: "User321@gmail.com",
    phone: "+91-6260746453",
    AdsPost: "34",
    Service: [img1, img2, img1],
    AccountType: "business",
    Active: false,
  },
  {
    id: 3,
    user:{
      name: "mojahid",
      userImg: img2,
    },
 
    email: "User456@gmail.com",
    phone: "+91-6260783653",
    AdsPost: "14",
    Service: [
      img1,
      img2,
      img1,
      img2,
      img1,
      img2,
      img1,
      img1,
      img2,
      img1,
      img2,
      img1,
      img2,
      img1,
    ],
    AccountType: "personal",
    Active: true,
  },
  {
    id: 4,
    user:{
      name: "indra",
      userImg: img1,
    },
  
    email: "User123@gmail.com",
    phone: "+91-6260795653",
    AdsPost: "04",
    Service: [img1, img2],
    AccountType: "business",
    Active: false,
  },
];
    
    export default data;