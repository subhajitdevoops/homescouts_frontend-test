import React, { useState, useRef, useCallback } from "react";
import { BiArrowBack, BiCloudUpload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import PPHS from "./css/propertyPhoto.module.css";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";

export default function PropertyPhoto(props) {
  const imageInfo = [
    "Other",
    "Balcony",
    "Bathroom",
    "Bedroom",
    "Building",
    "Entrance",
    "Floor plan",
    "Hall",
    "Kitchen",
    "Location Map",
    "Master Plan",
    "Property Layout",
  ];
console.log("props123",props);

  // --------------------------------------------------------
  const getRootProps = props.getRootProps;
  const getInputProps = props.getInputProps;

  // ---------------------------------
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   console.log('acceptedFiles--------------->',acceptedFiles);
  // }, [])

  const deletePhoto = (index) => {
    props.setCoverImage("");
    setErrorMessage({ extra_image_error: "", cover_image_error: "" });
    props.set_list_of_images((oldImages) => {
      return oldImages.filter((item, i) => {
        return i !== index;
      });
    });
  };
  const deleteEditPhoto = (index) => {
    setErrorMessage({ extra_image_error: "", cover_image_error: "" });
    props.setUpdateImg((oldImages) => {
      return oldImages.filter((item, i) => {
        return i !== index;
      });
    });
    props.setImageInfo((oldImages) => {
      return oldImages.filter((item, i) => {
        return i !== index;
      });
    });
  };
  // -------cover image handler-----------

  const coverImageHandler = (i) => {
    props.setCoverImage(i);
  };

  const handleSelectImage = (e, index) => {
    const val = e.target.value;
    const AllData = [...props.updateImg];
    AllData.forEach((ele, i) => {
      if (index === i) {
        props.updateImg[i].name = val;
      }
    });
    props.setUpdateImg(AllData);
  };
  // ------------------Validation-----------------
  const errorRef = useRef(null);
  // const scrollError = () =>
  //   window.scrollTo({
  //     top: errorRef.current.offsetTop,
  //     behavior: "smooth",
  //     block: "start",
  //   });
  const scrollError = () => errorRef.current.scrollIntoView();
  // -----------------------------------------------
  const [errorMessage, setErrorMessage] = useState({
    extra_image_error: "",
    cover_image_error: "",
  });
  const ValidateImage = async () => {
    if (props.updateImg.length === 0) {
      setErrorMessage({
        ...errorMessage,
        style: { color: "red", fontWeight: "bold" },
      });
      // } else if (props.list_of_images.length > 6) {
      //   setErrorMessage({
      //     ...errorMessage,
      //     extra_image_error:
      //       " *Please delete extra images. Only 1 to 6 images You need to upload.",
      //     style: { color: "red", fontWeight: "bold" },
      //   });
      //   scrollError();
    } else if (props.coverImage.length === 0) {
      setErrorMessage({
        ...errorMessage,
        cover_image_error: " *Please choose any one cover image.",
        style: { color: "red", fontWeight: "bold" },
      });
      scrollError();
    } else {
      props.propertyPhotoRes();
    }
  };

  // ---------------------------- JSX --------------------------------
  return (
    <div className={`${PPHS.container}`}>
      <button
        className="p-1 btn btn-secondary"
        onClick={() => {
          props.updateStep(3);
        }}
        ref={errorRef}
      >
        <BiArrowBack style={{ margin: "0 3px" }} />
        Back
      </button>
      <br />
      <br />
      <div>
        <h1 className="pt-1 pb-3" title="min-1 photo and max-6 photos upload.">
          Add photos of your property{" "}
          {/* for making add photos section to optional in future */}
          {/* <span className={`${PPHS.span}`}>(Optional)</span> */}
        </h1>

        <p className={`${PPHS.span} pt-1 pb-3`}>
          A picture is better than a thousand words. 90% buyers look at photos
          before buying.
          <br />  
          <span style={{ fontSize: "10px" }}>
            {" "}
            Kindly upload project QR code in the image section as per RERA
            guideline in some states it is mandatory*
          </span>
        </p>
        <br />
        <p style={{ marginBottom: "10px" }}>
          Upload image.
          <span
            // ref={errorRef}
            className={`${PPHS.span}`}
            style={{ ...errorMessage.style }}
          >
            {(() => {
              if (errorMessage.extra_image_error.length !== 0) {
                return errorMessage.extra_image_error;
              } else if (errorMessage.cover_image_error.length !== 0) {
                return errorMessage.cover_image_error;
              } else {
                return "*Please Upload atleast 1 photo and maximum 6 photos.";
              }
            })()}
          </span>
        </p>
        {/* update image */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {props.updateImg
            ? props.updateImg.map((item, index) => {
                return (
                  <div key={index} style={{ width: "240px" }}>
                    <div className={`${PPHS.imageWrapper}`}>
                      <img
                        className={`${PPHS.image}`}
                        src={
                          // configData.COMMON_MEDIA_LINK_URL +
                          // "/postproperty/" +
                          item.propertyImage
                        }
                        alt={`Img-${index}`}
                      />
                      <div className={`${PPHS.deleteIcon}`}>
                        {/* delete icon  */}
                        <AiFillDelete
                          onClick={() => {
                            deleteEditPhoto(index);
                          }}
                        />
                      </div>
                      <div
                        className={`${PPHS.makeCoverImage}`}
                        onClick={() => {
                          coverImageHandler(index);
                        }}
                      >
                        {/* make cover photo */}
                        <input
                          type="radio"
                          name="cover"
                          value={item.propertyImage}
                          id={index}
                          checked={props.coverImage === index}
                          onChange={() => {
                            coverImageHandler(index);
                          }}
                        />
                        <label htmlFor={index}>Make cover photo</label>
                      </div>
                    </div>
                    <div className={`${PPHS.selectDiv}`}>
                      {/* image info by dropdown */}
                      <select
                        className={`${PPHS.select}`}
                        name="Image_Info"
                        id=""
                        value={item.name}
                        title="Select above image information."
                        onChange={
                          (e) => handleSelectImage(e, index)
                          // props.setImageInfo((i) => [...i, e.target.value])
                        }
                      >
                        {imageInfo.map((items, index) => {
                          return (
                            <option
                              className={`${PPHS.option}`}
                              key={index + items}
                              value={items}
                            >
                              {items}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        {/* image upload section */}
        {/* manage drag container */}
        {props.manageDrag ? (
          <div className={`${PPHS.dragContent} mt-3 mb-3`} {...getRootProps()}>
            {props.isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <div className={`${PPHS.dragIcon} p-1 mb-2`}>
                  <BiCloudUpload style={{ fontSize: "125px" }} />
                </div>
                <div className={`${PPHS.dragText} p-2 `}>
                  <h6 className="p-2">Drag and drop your photos here</h6>
                  <p className={`${PPHS.span} p-1`}>
                    Upload photos of max size 10mb in format .png, .jpeg, .jpg.
                  </p>
                  <p className={`${PPHS.span} p-2`}>or</p>
                  <button className="btn btn-outline-primary">
                    <input
                      type="file"
                      id="fileInput"
                      multiple
                      hidden
                      accept=".jpg, .jpeg, .png"
                      {...getInputProps()}
                    />
                    Upload Photos Now
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={`${PPHS.dragContainer} mt-3 mb-3`}>
            {/* {props.list_of_images
              ? props.list_of_images.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={`${PPHS.imageWrapper}`}>
                        <img
                          className={`${PPHS.image}`}
                          src={item}
                          alt={`Img-${index}`}
                        />
                        <div className={`${PPHS.deleteIcon}`}>
                          <AiFillDelete
                            onClick={() => {
                              deletePhoto(index);
                            }}
                          />
                        </div>
                        <div
                          className={`${PPHS.makeCoverImage}`}
                          onClick={() => {
                            coverImageHandler(index);
                          }}
                        >
                          <input
                            type="radio"
                            name="cover"
                            value={item}
                            id={index}
                            checked={props.coverImage === index}
                            onChange={() => {
                              coverImageHandler(index);
                            }}
                          />
                          <label htmlFor={index}>Make cover photo</label>
                        </div>
                      </div>
                      <div className={`${PPHS.selectDiv}`}>
                        <select
                          className={`${PPHS.select}`}
                          name="Image_Info"
                          id=""
                          title="Select above image information."
                          onChange={(e) =>
                            props.setImageInfo((i) => [...i, e.target.value])
                          }
                        >
                          {imageInfo.map((item, index) => {
                            return (
                              <option
                                className={`${PPHS.option}`}
                                key={index + item}
                                value={item}
                              >
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  );
                })
              : ""} */}
            {props.list_of_images.length !== 0 ? (
              <div
                className={`${PPHS.minidragContent}  ${PPHS.minidragContentLoader}`}
                {...getRootProps()}
              >
                {/*  */}
                {props.isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <div className={`${PPHS.dragIcon} p-1 mb-1`}>
                      <BiCloudUpload style={{ fontSize: "50px" }} />
                    </div>
                    <div className={`${PPHS.dragText} p-1 `}>
                      <h6 className="p-2" style={{ fontSize: "14px" }}>
                        Drag to Add more Photos...
                      </h6>
                      <p
                        className={`${PPHS.span} p-1`}
                        style={{ fontSize: "8px" }}
                      >
                        Add photos of max size 10mb in format .png, .jpeg, .jpg.
                      </p>
                      <p className={`${PPHS.span} p-1`}>or</p>
                      <button className="btn btn-outline-primary">
                        <input
                          type="file"
                          id="fileInput"
                          multiple
                          hidden
                          {...getInputProps()}
                        />
                        Add more photos
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          // ----------------------------------

          // ---------------
        )}
      </div>
      <br />

      <button
        className="btn btn-primary"
        onClick={() => {
          ValidateImage();
          // props.updateStep(5);
        }}
      >
        Continue
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseonhover={false}
      />
    </div>
  );
}
