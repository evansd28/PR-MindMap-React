import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import AddMediaDisplay from "./components/AddMediaDisplay";
import ImageSelectionDisplay from "./components/ImageSelectionDisplay";
import Canvas from "./components/Canvas";
import NewNodeDisplay from "./components/NewNodeDisplay";
import VideoPlayer from "./components/VideoPlayer";
import { Node } from "./Types/types";
import { useAppContext } from "./context/Context";
import Navbar from "./components/Navbar";
import AssetAccordian from "./components/AssetAccordian";
import EditAssetTextDisplay from "./components/EditAssetTextDisplay";
import FullImageDisplay from "./components/FullImageDisplay";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";

export default function App() {
  const {
    nodes,
    setNodes,
    activeNodeId,
    setActiveNodeId,
    video,
    setVideo,
    videoPlayer,
    setVideoPlayer,
    selectedValue,
    editTextDisplay,
    fullImageDisplay,
  } = useAppContext();

  const { user, loading } = useContext(AuthContext);

  const [newNodeDisplay, setNewNodeDisplay] = useState<boolean>(false);
  const [mediaDisplay, setMediaDisplay] = useState<boolean>(false);
  const [imageSelectionDisplay, setImageSelectionDisplay] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<number[]>([300, 300]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">🔄 Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const addNodeToCanvas = (
    nodeType: string | undefined,
    nodeText: string | undefined,
    mousePosition: number[],
    connectingNode: Node
  ) => {
    if (nodeType === "role" && nodeText?.length === 0) {
      alert("cannot have empty text field");
    } else {
      const newNode = {
        id: uuidv4(),
        position: { x: mousePosition[0], y: mousePosition[1] },
        nodeType: nodeType || "none",
        borderColor: "black",
        text: nodeText || "",
        image: "",
        video: "",
        childNodes: [],
      };

      if (newNode.nodeType === "role") {
        selectedValue.childNodes.push(newNode);
      }

      if (newNode.nodeType === "asset") {
        selectedValue.childNodes.map((role) => {
          if (role.id === connectingNode.id) {
            role.childNodes.push(newNode);
          }
        });
      }

      setNewNodeDisplay(false);
    }
  };

  const getNodePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition([e.clientX - 110 / 2, e.clientY - 110 / 2]);
    // No longer triggers newNodeDisplay automatically
  };

  const handleAddMedia = (
    e: React.MouseEvent<HTMLButtonElement>,
    nodeId: string
  ) => {
    e.stopPropagation();
    setMediaDisplay(true);
    setActiveNodeId(nodeId);
  };

  const handleAddImage = async () => {
    setImageSelectionDisplay(true);
    setMediaDisplay(false);
  };

  const handleAddVideo = () => {
    const query = prompt("Paste a link to a Youtube Video here:");
    if (query) {
      setVideo(query);
      addVideoToNode(activeNodeId, query);
    }
  };

  const addImageToNode = (
    activeNodeId: string | undefined,
    image: string | undefined
  ) => {
    if (image) {
      selectedValue.childNodes.forEach((role) => {
        role.childNodes.forEach((asset) => {
          if (asset.id === activeNodeId) {
            if (asset.video) asset.video = "";
            asset.image = image;
          }
        });
      });
    }
    setImageSelectionDisplay(false);
  };

  const addVideoToNode = (
    activeNodeId: string | undefined,
    video: string | undefined
  ) => {
    if (video) {
      selectedValue.childNodes.forEach((role) => {
        role.childNodes.forEach((asset) => {
          if (asset.id === activeNodeId) {
            if (asset.image) asset.image = "";
            asset.video = video;
          }
        });
      });
    }
    setMediaDisplay(false);
  };

  const removeNode = (node: Node) => {
    if (node.nodeType === "role") {
      selectedValue.childNodes = selectedValue.childNodes.filter(
        (role) => role.id !== node.id
      );
    } else {
      selectedValue.childNodes.forEach((role) => {
        role.childNodes = role.childNodes.filter(
          (asset) => asset.id !== node.id
        );
      });
    }

    setNodes((prevNodes) => {
      return prevNodes.map((n) => {
        if (n.id === selectedValue.id) {
          return { ...n, childNodes: selectedValue.childNodes };
        }
        return n;
      });
    });
  };

  return (
    <>
      <Navbar />
      <main className="flex">
        {!selectedValue ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a category from the sidebar.
          </div>
        ) : (
          <>
            {!fullImageDisplay && !videoPlayer && <AssetAccordian />}
            <Canvas
              getNodePosition={getNodePosition}
              handleAddMedia={handleAddMedia}
              removeNode={removeNode}
            />

            {/* Add Node Button */}
            <button
              className="absolute top-16 right-4 z-50 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setNewNodeDisplay(true)}
            >
              + Add Node
            </button>

            {mediaDisplay && (
              <div
                className="media-display absolute shadow-xl w-1/3"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 50,
                }}
              >
                <AddMediaDisplay
                  handleAddImage={handleAddImage}
                  handleAddVideo={handleAddVideo}
                  setMediaDisplay={setMediaDisplay}
                />
              </div>
            )}
            {imageSelectionDisplay && (
              <ImageSelectionDisplay
                addImageToNode={addImageToNode}
                setMediaDisplay={setMediaDisplay}
                setImageSelectionDisplay={setImageSelectionDisplay}
                activeNodeId={activeNodeId}
              />
            )}
            {newNodeDisplay && (
              <div
                className="media-display absolute rounded-xl w-1/3"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 50,
                }}
              >
                <NewNodeDisplay
                  nodes={nodes}
                  addNodeToCanvas={addNodeToCanvas}
                  mousePosition={mousePosition}
                  setNewNodeDisplay={setNewNodeDisplay}
                  setImageSelectionDisplay={setImageSelectionDisplay}
                />
              </div>
            )}
            {videoPlayer && (
              <VideoPlayer video={video} setVideoPlayer={setVideoPlayer} />
            )}
            {fullImageDisplay && <FullImageDisplay />}
            {editTextDisplay && (
              <div
                className="media-display absolute rounded-xl w-1/3"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 50,
                }}
              >
                <EditAssetTextDisplay />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
