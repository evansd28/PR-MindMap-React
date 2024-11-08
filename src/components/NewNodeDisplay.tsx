import { useEffect, useState } from "react";

interface Node {
    id: string;
    position: { x: number, y: number };
    nodeType: string;
    borderColor: string;
    text: string;
    image: string;
    video: string;
}

interface NewNodeDisplayProps {
    nodes: Node[];
    addNodeToCanvas: (nodeType: string | undefined, nodeText: string | undefined, mousePosition: number[]) => void;
    mousePosition: number[];
    setImageSelectionDisplay: (display: boolean) => void; 
    setNewNodeDisplay: (display: boolean) => void; 
}

export default function NewNodeDisplay({ 
    nodes, 
    addNodeToCanvas,
    mousePosition, 
    setNewNodeDisplay 
}: NewNodeDisplayProps) {
    const [newNodeType, setNewNodeType] = useState<string | undefined>("");
    const [nodeText, setNodeText] = useState<string | undefined>("");
    const [nodeToConnectTo, setNodeToConnectTo] = useState<Node>();
    const [assetText, setAssetText] = useState<boolean>(false)

    const addAssetImage = () => {
        setNewNodeDisplay(false);
        addNodeToCanvas(newNodeType, nodeText, mousePosition)
    }

    return (
        <div className="bg-gray-500 text-white p-8 flex flex-col text-center justify-center text-xl">
            <label htmlFor="node-select">Select node type:</label>
            <select
                className="node-select mx-5 border-black border-2 text-black p-2"
                onChange={(e) => setNewNodeType(e.target.value)}
            >
                <option value="value">Value</option>
                <option value="role">Role</option>
                <option value="asset">Asset</option>
            </select>
            {newNodeType !== 'asset' &&
                <div>
                    <label htmlFor="node-text">Add Text</label>
                    <input
                        type="text"
                        name="node-text"
                        className="p-2 text-black rouneded border-2 border-black"
                        onChange={(e) => setNodeText(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-green-500 text-white p-2 rounded-xl w-1/2 m-auto"
                        onClick={() => addNodeToCanvas(newNodeType, nodeText, mousePosition)}
                    >
                        Add Node
                    </button>
                </div>
            }
            {newNodeType === 'asset' &&
                <div>
                    <h1>Add text or image</h1>
                    <div className="gap-2">
                        <button
                            className="bg-blue-500 p-2 text-white mx-2"
                            onClick={() => setAssetText(true)}
                        >
                            Text
                        </button>
                        <button
                            className="bg-blue-500 p-2 text-white mx-2"
                            onClick={addAssetImage}
                        >
                            Image/Video
                        </button>
                    </div>
                </div>
            }
            {newNodeType === 'asset' && nodes.length !== 0 &&
                <div>
                    <h1>Connect To Node:</h1>
                    <select
                        onChange={(e) => setNodeToConnectTo(nodes.find(node => node.text === e.target.value))}
                    >
                        {nodes.map((node: Node) => {
                            return (
                                <option key={node.id}>{node.text}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {assetText &&
                <div>
                    <label htmlFor="node-text">Add Text</label>
                    <input
                        type="text"
                        name="node-text"
                        className="p-2 text-black rouneded border-2 border-black"
                        onChange={(e) => setNodeText(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-green-500 text-white p-2 rounded-xl w-1/2 m-auto"
                        onClick={() => addNodeToCanvas(newNodeType, nodeText, mousePosition)}
                    >
                        Add Node
                    </button>
                </div>
            }
        </div>
    )
}