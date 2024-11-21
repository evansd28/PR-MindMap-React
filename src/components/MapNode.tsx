import { useState } from "react";
import { useAppContext } from "../context/Context";
import { MapNodeProps } from "../Types/types";

export default function MapNode({
  node,
  handleAddMedia,
  removeNode,
}: MapNodeProps) {
  const { setVideo, setVideoPlayer, setEditTextDisplay, setActiveNodeId, setExpandedImage, setFullImageDisplay } = useAppContext();
  const [showEditFeatures, setShowEditFeatures] = useState<boolean>(false);

  const getBorderColor = (nodeType: string) => {
    if (nodeType === "value") {
      return "#f97316";
    } else if (nodeType === "role") {
      return "#3275a8";
    } else {
      return "#32a864";
    }
  };

  return (
    <div
      onMouseEnter={() => setShowEditFeatures(true)}
      onMouseLeave={() => setShowEditFeatures(false)}
    >
      <div
        key={node.id}
        className={`absolute flex flex-col items-center justify-center rounded-${node.nodeType === 'value' && 'full' || node.nodeType === 'role' && 'xl'} font-semibold text-center bg-white border-4 shadow-xl hover:cursor-pointer`}
        style={{
          left: node.position.x,
          top: node.position.y,
          borderColor: getBorderColor(node.nodeType),
          width: "110px",
          height: "110px",
          borderRadius: node.nodeType === 'value' ? '100%' : undefined
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {
          // hide the input if the node has an image
          !node.image && (!showEditFeatures || node.nodeType === 'value') && <h1>{node.text}</h1>
        }
        {
          // if the node is of type 'asset', let users add media (photo, video)
          node.nodeType === "asset" &&
          // hide the 'add media' button if there is already an image inside the node
          !node.image &&
          !node.text &&
          !node.video && (
            <button
              className="text-center hover:bg-transparent hover:underline hover:text-blue-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                handleAddMedia(e, node.id);
              }}
              style={{ pointerEvents: "auto" }} // Allow pointer events on the button
            >
              Add Media
            </button>
          )
        }
        {
          // add the image
          node.image && !showEditFeatures && (
            <div>
              <img
                src={node.image}
                className={`${node.nodeType !== "value" && "hover:bg-red-100"
                  }`}
                style={{ height: "102px", width: "102px" }}
                alt="node image"
              />
            </div>
          )
        }
        {
          // add the video
          node.video && (
            <div className="py-2">
              <div className="relative">
                <button
                  className="hover:underline hover:text-blue-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    setVideo(node.video);
                    setVideoPlayer(true);
                  }}
                >
                  Watch Video
                </button>
              </div>
            </div>
          )
        }
        {
          showEditFeatures && node.nodeType !== 'value' &&
          <div className="flex flex-col">
            <div className={`${node.video && 'absolute flex flex-row -ml-10 -mt-2'} ${node.nodeType == 'asset' && !node.video && !node.image && !node.text && 'absolute flex flex-row -ml-5 '}`}>
              {!node.video && !node.image && node.nodeType === 'role' &&
                <button
                  className="px-2 py-1 bg-sky-500 hover:bg-sky-400 rounded-xl text-lg text-white mx-1 w-8 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (node.nodeType === 'role' || (node.nodeType === 'asset' && !node.image)) {
                      setActiveNodeId(node.id)
                      setEditTextDisplay(true);
                    }
                  }}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              }
              {!node.video && !node.image && node.nodeType === 'asset' && node.text &&
                <button
                  className="px-2 py-1 bg-sky-500 hover:bg-sky-400 rounded-xl text-lg text-white mx-1 w-8 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (node.nodeType === 'role' || (node.nodeType === 'asset' && !node.image)) {
                      setActiveNodeId(node.id)
                      setEditTextDisplay(true);
                    }
                  }}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              }
              <button
                className="px-2 py-1 bg-red-500 hover:bg-red-400 rounded-xl text-lg text-white mx-1 w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  if (node.nodeType !== "value") {
                    removeNode(node);
                  }
                }}
              >
                <i className="fa-solid fa-x"></i>
              </button>
              {
                node.image &&
                <div>
                  <button
                    className="px-2 py-1 bg-green-500 hover:bg-green-400 rounded-xl text-lg text-white mx-1 w-8 h-8 mt-1"
                    onClick={(e) => handleAddMedia(e, node.id)}
                  >
                    <i className="fa-solid fa-image"></i>
                  </button>
                  <button
                    className="px-2 py-1 bg-purple-500 hover:bg-green-400 rounded-xl text-lg text-white mx-1 w-8 h-8 mt-1"
                    onClick={() => {
                      setExpandedImage(node.image);
                      setFullImageDisplay(true);
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              }
              {
                node.video &&
                <button
                  className="px-2 py-1 bg-green-500 hover:bg-green-400 rounded-xl text-lg text-white mx-1 w-8 h-8"
                  onClick={(e) => handleAddMedia(e, node.id)}
                >
                  <i className="fa-solid fa-video"></i>
                </button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
}