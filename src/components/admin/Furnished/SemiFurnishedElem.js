// import React, { useState } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const SemiFurnishedElem = ({ handleDelete, curElem, id }) => {
//   const [check, setCheck] = useState(false);
//   return (
//     <>
//       <tr>
//         <th scope="row">{curElem}</th>
//         <td>
//           <input
//             type="checkbox"
//             onChange={() => setCheck(!check)}
//             checked={check === true ? true : false}
//           />{" "}
//         </td>
//         <td>
//           <input
//             type="checkbox"
//             onChange={() => setCheck(!check)}
//             checked={check === true ? false : true}
//           />{" "}
//         </td>
//         <td>
//           <RiDeleteBin6Line
//             id="furnised-delete-div"
//             onClick={() => handleDelete(id)}
//           />{" "}
//         </td>
//       </tr>
//     </>
//   );
// };

// export default SemiFurnishedElem;
