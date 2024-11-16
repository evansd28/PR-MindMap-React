export interface Node {
    id: string;
    position: { x: number, y: number };
    nodeType: string;
    borderColor: string;
    text: string;
    image: string;
    video: string;
    connectedTo: Node | null;
}

export interface ContextState {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    activeNodeId: string | undefined;
    setActiveNodeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    video: string | undefined;
    setVideo: React.Dispatch<React.SetStateAction<string | undefined>>;
    videoPlayer: boolean;
    setVideoPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    valueNode: Node | undefined;
    setValueNode: React.Dispatch<React.SetStateAction<Node | undefined>>;
    roleNodes: Node[];
    setRoleNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    assetNodes: Node[];
    setAssetNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export interface CanvasProps {
    getNodePosition: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
}

export interface MapNodeProps {
    node: Node;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
}

export interface ImageSelectionDisplayProps {
    addImageToNode: (nodeId: string | undefined, image: string | undefined) => void; 
    setMediaDisplay: (display: boolean) => void; 
    setImageSelectionDisplay: (display: boolean) => void; 
    activeNodeId: string | undefined; 
}

export interface NewNodeDisplayProps {
    nodes: Node[];
    addNodeToCanvas: (nodeType: string | undefined, nodeText: string | undefined, mousePosition: number[], nodeToConnectTo: Node) => void;
    mousePosition: number[];
    setImageSelectionDisplay: (display: boolean) => void; 
    setNewNodeDisplay: (display: boolean) => void; 
}