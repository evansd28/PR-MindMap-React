export interface Node {
    id: string;
    position: { x: number, y: number };
    nodeType: string;
    borderColor: string;
    text: string;
    image: string;
    video: string;
    childNodes: Node[];
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
    valueNodes: Node[];
    valueTypes: string[];
    setValueNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    roleNodes: Node[];
    setRoleNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    assetNodes: Node[];
    setAssetNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    selectedValue: Node;
    setSelectedValue: React.Dispatch<React.SetStateAction<Node>>;
    newNodeDisplay: boolean;
    setNewNodeDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CanvasProps {
    getNodePosition: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (node: Node) => void;
}

export interface MapNodeProps {
    node: Node;
    handleAddMedia: (e: React.MouseEvent<HTMLButtonElement>, nodeId: string) => void;
    removeNode: (node: Node) => void;
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