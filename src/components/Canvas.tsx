import MapNode from "./MapNode";

interface Node {
    id: string;
    position: { x: number, y: number };
    nodeType: string;
    borderColor: string;
    text: string;
    image: string;
    video: string;
} 

interface CanvasProps {
    nodes: Node[];
    getNodePosition: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
}

export default function Canvas({
    nodes,
    getNodePosition,
    handleAddMedia,
    removeNode
}: CanvasProps) {
    return (
        <div
            className="mm-canvas w-11/12 h-screen border-2 border-black rounded-xl items-center justify-center mt-10"
            id="canvas"
            onClick={(e) => getNodePosition(e)}
        >
            {nodes.map((node: Node) => (
                <MapNode node={node} handleAddMedia={handleAddMedia} removeNode={removeNode} />
            ))}
        </div>
    )
}