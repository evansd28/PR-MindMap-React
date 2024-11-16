import MapNode from "./MapNode";
import { Node, CanvasProps } from "../Types/types";
import { useAppContext } from "../context/Context";

export default function Canvas({
    getNodePosition,
    handleAddMedia,
    removeNode
}: CanvasProps) {
    const { nodes, valueNode } = useAppContext();

    return (
        <div
            className="mm-canvas w-screen h-auto border-2 border-gray-300 items-center justify-center"
            id="canvas"
            onClick={(e) => getNodePosition(e)}
        >
            <svg className="absolute w-full h-full">
                {nodes.map((node: Node) => {
                    if (node.nodeType === 'role' && valueNode) {
                        return (
                            <line
                                key={`line-${node.id}`}
                                x1={valueNode.position.x + (110/2)} // Adjust for node size
                                y1={valueNode.position.y + (110/2)} // Adjust for node size
                                x2={node.position.x + (110/2)} // Adjust for node size
                                y2={node.position.y + (110/2)} // Adjust for node size
                                stroke="black"
                                strokeWidth="2"
                            />
                        );
                    }
                    if (node.nodeType === 'asset' && node.connectedTo) {
                        return (
                            <line
                                key={`line-asset-${node.id}`}
                                x1={node.connectedTo.position.x + (110/2)} // Adjust for node size
                                y1={node.connectedTo.position.y + (110/2)} // Adjust for node size
                                x2={node.position.x + (110/2)} // Adjust for node size
                                y2={node.position.y + (110/2)} // Adjust for node size
                                stroke="black"
                                strokeWidth="2"
                            />
                        );
                    }
                    return null;
                })}
            </svg>
            {nodes.map((node: Node) => (
                <MapNode
                    key={node.id}
                    node={node}
                    handleAddMedia={handleAddMedia}
                    removeNode={removeNode}
                />
            ))}
        </div>
    );
}