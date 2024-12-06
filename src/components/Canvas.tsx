import MapNode from "./MapNode";
import { Node, CanvasProps } from "../Types/types";
import { useAppContext } from "../context/Context";
import html2canvas from "html2canvas";
import getDateString from "../getDateString";
import { useRef } from "react";

export default function Canvas({
    getNodePosition,
    handleAddMedia,
    removeNode
}: CanvasProps) {
    const { selectedValue } = useAppContext();
    const imageRef = useRef<HTMLDivElement | null>(null);

    const generateImage = () => {
        if (imageRef.current) {
            html2canvas(imageRef.current, { useCORS: true, y: 50 }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `STRIVE_${getDateString()}`
                link.click();
            })
        }
    }

    return (
        <div
            className="mm-canvas w-screen h-auto border-2 border-gray-300 items-center justify-center"
            id="canvas"
            onClick={(e) => getNodePosition(e)}
            ref={imageRef}
            style={{
                position: "relative",
                width: "3840px",
                height: "1560px",
                backgroundImage: "url('/template/template.png')",
                backgroundSize: "cover",
                border: "none"
            }}
        >
            <svg className="absolute w-full h-full">
                {selectedValue.childNodes.map((node: Node) => {
                    // connects nodes on a line
                    if (node.nodeType === 'role' && selectedValue) {
                        return (
                            <line
                                key={`line-${node.id}`}
                                x1={selectedValue.position.x + (110 / 2)}
                                y1={selectedValue.position.y + (110 / 2)}
                                x2={node.position.x + (110 / 2)}
                                y2={node.position.y + (110 / 2)}
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
                                        x1={role.position.x + (110 / 2)}
                                        y1={role.position.y + (110 / 2)}
                                        x2={asset.position.x + (110 / 2)}
                                        y2={asset.position.y + (110 / 2)}
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
            <button
                className="mt-2 bg-gray-500 text-white p-1 rounded-xl w-44 m-auto absolute top-0 right-1 z-10 shadow-xl"
                onClick={(e) => {
                    e.stopPropagation();
                    generateImage();
                }}
            >
                Take Screenshot
            </button>
        </div>
    );
}