import { useState } from "react";
import { Node, NewNodeDisplayProps } from "../Types/types";
import { useAppContext } from "../context/Context";

export default function NewNodeDisplay({
    addNodeToCanvas,
    mousePosition,
    setNewNodeDisplay
}: NewNodeDisplayProps) {
    const [newNodeType, setNewNodeType] = useState<string | undefined>("role");
    const [nodeText, setNodeText] = useState<string | undefined>("");
    const [assetText, setAssetText] = useState<boolean>(false);

    const { selectedValue } = useAppContext();
    const [nodeToConnectTo, setNodeToConnectTo] = useState<Node>(selectedValue.childNodes[0]);

    const addAssetImage = () => {
        setNewNodeDisplay(false);
        addNodeToCanvas(newNodeType, nodeText, mousePosition, nodeToConnectTo)
    }

    return (
        <div className="bg-gray-200 border-2 border-gray-400 shadow-xl rounded-xl text-black p-8 flex flex-col text-center items-center justify-center text-xl">
            <div className="p-2 my-2 rounded-xl bg-gray-100 w-4/5 flex flex-col items-center">
                <label htmlFor="node-select">Select node type:</label>
                <select
                    className="node-select border-gray-400 border-2 rounded text-black p-2 w-48 text-center justify-center mt-2"
                    onChange={(e) => setNewNodeType(e.target.value)}
                >
                    <option value="role">Role Model</option>
                    <option value="asset">Asset</option>
                </select>
            </div>
            {newNodeType === 'role' &&
                <div className="p-2 my-2 rounded-xl bg-gray-100 w-4/5 flex flex-col items-center">
                    <label htmlFor="node-text">Add Text</label>
                    <input
                        type="text"
                        name="node-text"
                        className="p-2 text-black rouneded border-2 border-gray-400 rounded w-48"
                        onChange={(e) => setNodeText(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-orange-500 text-white p-2 rounded-xl w-1/2 m-auto"
                        onClick={() => addNodeToCanvas(newNodeType, nodeText, mousePosition, selectedValue)}
                    >
                        Add Node
                    </button>
                </div>
            }
            {(newNodeType === 'asset' && selectedValue.childNodes.length > 0) ?
                <div className="p-2 my-2 rounded-xl bg-gray-100 w-4/5">
                    <h1>Add text or image</h1>
                    <div className="gap-2">
                        <button
                            className="bg-orange-500 p-2 text-white mx-2"
                            onClick={() => setAssetText(true)}
                        >
                            Text
                        </button>
                        <button
                            className="bg-orange-500 p-2 text-white mx-2"
                            onClick={addAssetImage}
                        >
                            Image/Video
                        </button>
                    </div>
                </div>
                :
                (newNodeType === 'asset' && selectedValue.childNodes.length === 0) &&
                <div className="mt-2">
                    You must have one role node before adding an asset
                </div>
            }
            {newNodeType === 'asset' && selectedValue.childNodes.length > 0 &&
                <div className="p-2 my-2 rounded-xl bg-gray-100 w-4/5">
                    <h1>Connect To Node:</h1>
                    <select
                        className="text-black p-2 my-2 border-2 border-gray-400 rounded"
                        onChange={(e) => {
                            const selectedNode = selectedValue.childNodes.find(node => node.text === e.target.value);
                            console.log("selected node", selectedNode)
                            if (selectedNode) {
                                setNodeToConnectTo(selectedNode);
                                console.log("connected to", nodeToConnectTo.text);
                            }
                        }}
                    >
                        {selectedValue.childNodes.map((node: Node) => {
                            return (
                                <option key={node.id}>{node.text}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {assetText &&
                <div className="p-2 my-4 rounded-xl bg-gray-100 w-4/5">
                    <label htmlFor="node-text">Add Text</label>
                    <input
                        type="text"
                        name="node-text"
                        className="p-2 mx-2 text-black rouneded border-2 rounded border-gray-400"
                        onChange={(e) => setNodeText(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-orange-500 text-white p-2 rounded-xl w-1/2 m-auto"
                        onClick={() => addNodeToCanvas(newNodeType, nodeText, mousePosition, nodeToConnectTo)}
                    >
                        Add Node
                    </button>
                </div>
            }
            <button
                className="mt-2 bg-orange-500 text-white p-2 rounded-xl w-1/2 m-auto"
                onClick={() => setNewNodeDisplay(false)}
            >
                Cancel
            </button>
        </div>
    )
}