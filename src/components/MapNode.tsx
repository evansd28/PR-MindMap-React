interface Node {
    id: string;
    position: { x: number, y: number };
    nodeType: string;
    borderColor: string;
    text: string;
    image: string;
    video: string;
}


export default function MapNode({
    node,
    handleAddMedia,
    removeNode
}: {
    node: Node;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
}) {
    return (
        <div>
            <div
                key={node.id}
                className={`absolute flex flex-col items-center justify-center rounded-full text-center p-4 border-2 border-black`}
                style={{ left: node.position.x, top: node.position.y, borderColor: node.borderColor }}
            >
                {/* list node type */}
                <h1 className='font-semibold'>{node.nodeType}</h1>
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
                        <iframe
                            src={node.video}
                            className='rounded-xl'
                            title="node video"
                        />
                    </div>
                }
                {/* button to remove the node */}
                <button
                    className='bg-red-500 p-2 text-white rounded-xl my-2'
                    onClick={(e) => removeNode(e, node.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}