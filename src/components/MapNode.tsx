import { useAppContext } from "../context/Context";
import { MapNodeProps } from "../Types/types";

export default function MapNode({
    node,
    handleAddMedia,
    removeNode
}: MapNodeProps) {
    const { setVideo, setVideoPlayer } = useAppContext();

    const getBorderColor = (nodeType: string) => {
        if(nodeType === 'value') {
            return '#ff002f'
        } else if (nodeType === 'role') {
            return '#0077ff'
        } else {
            return '#77ff00'
        }
    }

    return (
        <div onClick={(e) => {
            e.stopPropagation();
            console.log("node clicked")
        }}>
            <div
                key={node.id}
                className={`absolute flex flex-col items-center justify-center rounded-full text-center p-4 border-2`}
                style={{ left: node.position.x, top: node.position.y, borderColor: getBorderColor(node.nodeType) }}
            >
                {
                    // hide the input if the node has an image
                    !node.image &&
                    <h1>{node.text}</h1>
                }

                {
                    // if the node is of type 'asset', let users add media (photo, video)
                    node.nodeType === 'asset' &&
                    // hide the 'add media' button if there is already an image inside teh node
                    !node.image && !node.text &&
                    !node.video &&
                    <button
                        className='border-2 border-gray-500 rounded-xl p-1 text-center mt-1'
                        onClick={(e) =>
                            handleAddMedia(e, node.id)
                        }
                    >
                        Add Image/video
                    </button>
                }
                {
                    // add the image
                    node.image &&
                    <div className='py-2'>
                        <img
                            src={node.image}
                            className='rounded-xl'
                            alt="node image"
                        />
                    </div>
                }
                {
                    // add the video
                    node.video &&
                    <div className='py-2'>
                        <button
                            className=""
                            onClick={() => {
                                setVideo(node.video)
                                setVideoPlayer(true);
                            }}
                        >
                            Watch Video
                        </button>
                    </div>
                }
                {/* button to remove the node
                This is gonna get replaced later. Just having it for now */}
                <button
                    className='bg-red-500 p-1 text-white rounded-xl my-1'
                    onClick={(e) => removeNode(e, node.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}