import MapNode from "./MapNode";
import { Node, CanvasProps } from "../Types/types";
import { useAppContext } from "../context/Context";
import { useEffect } from "react";

export default function Canvas({
    getNodePosition,
    handleAddMedia,
    removeNode
}: CanvasProps) {
    const {  selectedValue } = useAppContext();

    return (
        <div
            className="mm-canvas w-screen h-auto border-2 border-gray-300 items-center justify-center"
            id="canvas"
            onClick={(e) => getNodePosition(e)}
        >
            <svg className="absolute w-full h-full">
                {selectedValue.childNodes.map((node: Node) => {
                    // connects nodes on a line
                    if (node.nodeType === 'role' && selectedValue) {
                        return (
                            <line
                                key={`line-${node.id}`}
                                x1={selectedValue.position.x + (110 / 2)} // Adjust for node size
                                y1={selectedValue.position.y + (110 / 2)} // Adjust for node size
                                x2={node.position.x + (110 / 2)} // Adjust for node size
                                y2={node.position.y + (110 / 2)} // Adjust for node size
                                stroke="black"
                                strokeWidth="2"
                            />
                        );
                    }
                    
                    return null;
                })}
                {
                    selectedValue.childNodes.map((role: Node) => {
                        return (
                            role.childNodes.map((asset: Node) => {
                                return (
                                    <line
                                        key={`line-${asset.id}`}
                                        x1={role.position.x + (110 / 2)} // Adjust for node size
                                        y1={role.position.y + (110 / 2)} // Adjust for node size
                                        x2={asset.position.x + (110 / 2)} // Adjust for node size
                                        y2={asset.position.y + (110 / 2)} // Adjust for node size
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                );
                            })
                        )
                    })
                }
            </svg>
            <MapNode
                key={selectedValue.id}
                node={selectedValue}
                handleAddMedia={handleAddMedia}
                removeNode={removeNode}
            />
            {selectedValue.childNodes.map((node: Node) => (
                <MapNode
                    key={node.id}
                    node={node}
                    handleAddMedia={handleAddMedia}
                    removeNode={removeNode}
                />
            ))}
            {selectedValue.childNodes.map((role: Node) => {
                return (
                    role.childNodes.map((asset: Node) => {
                        return (
                            <MapNode
                                key={asset.id}
                                node={asset}
                                handleAddMedia={handleAddMedia}
                                removeNode={removeNode}
                            />
                        )

                    })

                );
            })}
        </div>
    );
}