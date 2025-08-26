import { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import photo from "../../../../assets/statusimg/img2.jpg";
// import Stories from "stories-react";
import Stories from "react-insta-stories";
// import "stories-react/dist/index.css";
import ModelStatus from "../StatusData";
import { useEffect } from "react";

const StatusStories = ({
  setOpenStory,
  counter,
  setCounter,
  data,
  openStory,
}) => {
  const [story, setSetory] = useState(true);
  const [filter, setFilter] = useState(data[counter].media);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  
  const onAllStoriesEnd = () => {
    if (counter + 1 == data.length) {
      setSetory(false);
      setFilter(data[0].media);
      setCounter(0);
      setOpenStory(false);
    } else {
      setSetory(false);
      setFilter(data[counter + 1].media);
      setCounter(counter + 1);
      setTimeout(() => {
        setSetory(true);
      }, 100);
    }
  };
  const onStoryChange = () => {};
  const handleCloseStoryButton = () => {
    setOpenStory(false);
  };
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 500);
    }

    window.addEventListener("resize", handleResize);

    // Call handleResize() once to initialize the state
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className=" statusmodule_main_div">
        <div className="flex_c react_model_content_div">
          <div className="react_model_content">
            {story === true && (
              <Stories
                width={isLargeScreen===false?'350px':'400px'}
                height={isLargeScreen===false?'550px':'600px'}
                stories={filter}
                pauseStoryWhenInActiveWindow={false}
                onAllStoriesEnd={onAllStoriesEnd}
                onStoryChange={onStoryChange}
              />
            )}
          </div>
          <div
            onClick={() => handleCloseStoryButton()}
            className="statusmodule_button_div"
          >
            <AiOutlineCloseCircle className="h1" style={{ color: "pink" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusStories;
