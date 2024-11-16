import { useAppContext } from "../context/Context";
import { MapNodeProps } from "../Types/types";

export default function MapNode({
    node,
    handleAddMedia,
    removeNode
}: MapNodeProps) {
    const { setVideo, setVideoPlayer } = useAppContext();

    const getBorderColor = (nodeType: string) => {
        if (nodeType === 'value') {
            return '#8932a8'
        } else if (nodeType === 'role') {
            return '#3275a8'
        } else {
            return '#32a864'
        }
    }

    return (
        <div onClick={(e) => {
            e.stopPropagation();
            if (node.nodeType !== 'value') {
                removeNode(e, node.id);
            }
        }}>
            <div
                key={node.id}
                className={`absolute flex flex-col items-center justify-center rounded-full font-semibold text-center bg-white border-4 shadow-xl ${node.nodeType !== 'value' && 'hover:bg-red-100'} hover:cursor-pointer`}
                style={{
                    left: node.position.x,
                    top: node.position.y,
                    borderColor: getBorderColor(node.nodeType),
                    width: '110px',
                    height: '110px'
                }}
            >
                {
                    // hide the input if the node has an image
                    !node.image &&
                    <h1>{node.text}</h1>
                }

                {
                    // if the node is of type 'asset', let users add media (photo, video)
                    node.nodeType === 'asset' &&
                    // hide the 'add media' button if there is already an image inside the node
                    !node.image && !node.text &&
                    !node.video &&
                    <button
                        className='text-center hover:bg-transparent hover:underline hover:text-blue-500'
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click event from bubbling up
                            handleAddMedia(e, node.id);
                        }}
                        style={{ pointerEvents: 'auto' }} // Allow pointer events on the button
                    >
                        Add Image/video
                    </button>
                }
                {
                    // add the image
                    node.image &&
                    <div>
                        <img
                            src={node.image}
                            className={`rounded-full ${node.nodeType !== 'value' && 'hover:bg-red-100'}`}
                            style={{ height: '102px', width: '102px' }}
                            alt="node image"
                        />
                    </div>
                }
                {
                    // add the video
                    node.video &&
                    <div className='py-2'>
                        <button
                            className="hover:underline hover:text-blue-500"
                            onClick={() => {
                                setVideo(node.video)
                                setVideoPlayer(true);
                            }}
                        >
                            Watch Video
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}