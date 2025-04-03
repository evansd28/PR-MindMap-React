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
export interface Connection {
    id: string;
    from: string;
    to: string;
    fromPosition: { x: number; y: number };
    toPosition: { x: number; y: number };
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
    fullImageDisplay: boolean;
    setFullImageDisplay: React.Dispatch<React.SetStateAction<boolean>>;
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
    editTextDisplay: boolean;
    setEditTextDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    expandedImage: string | undefined;
    setExpandedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
    updateNodePosition: (nodeId: string, newPosition: { x: number; y: number }) => void;
    updateConnections: () => void;
    connections: Connection[];
    setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
    addConnection: (from: string, to: string) => void;
    removeConnection: (connectionId: string) => void;
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