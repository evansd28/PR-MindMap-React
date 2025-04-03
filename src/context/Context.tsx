import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContextState, Node, Connection } from '../Types/types';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext<ContextState | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [valueTypes] = useState<string[]>(
        [
            "Financial Security",
            "Social Security",
            "Job Skills",
            "Family Oriented-Skills",
            "Physical Health",
            "Mental Health",
            "Supporting Loved Ones",
            "Supporting Others Like Us"
        ]
    )
    const [valueNodes, setValueNodes] = useState<Node[]>(valueTypes.map((value) => ({
        id: uuidv4(),
        position: { x: window.innerWidth / 2 - 110 / 2, y: window.innerHeight / 2 - 110 / 2 / 2 },
        nodeType: 'value',
        borderColor: 'black',
        text: value,
        image: "",
        video: "",
        childNodes: []
    })));
const [selectedValue, setSelectedValue] = useState<Node>(valueNodes[0]);
const [nodes, setNodes] = useState<Node[]>([selectedValue]);
const [activeNodeId, setActiveNodeId] = useState<string | undefined>();
const [video, setVideo] = useState<string | undefined>();
const [videoPlayer, setVideoPlayer] = useState<boolean>(false);
const [fullImageDisplay, setFullImageDisplay] = useState<boolean>(false);
const [roleNodes, setRoleNodes] = useState<Node[]>([]);
const [assetNodes, setAssetNodes] = useState<Node[]>([]);
const [newNodeDisplay, setNewNodeDisplay] = useState<boolean>(false);
const [editTextDisplay, setEditTextDisplay] = useState<boolean>(false);
const [expandedImage, setExpandedImage] = useState<string | undefined>();
const [connections, setConnections] = useState<Connection[]>([]);

useEffect(() => {
    console.log(selectedValue.childNodes)
}, [selectedValue])

const updateNodePosition = (nodeId: string, newPosition: { x: number; y: number }) => {
    setNodes(prevNodes =>
        prevNodes.map(node =>
            node.id === nodeId ? { ...node, position: newPosition } : node
        )
    );
    setValueNodes(prevValueNodes =>
        prevValueNodes.map(node =>
            node.id === nodeId ? { ...node, position: newPosition } : node
        )
    );
    setRoleNodes(prevRoleNodes =>
        prevRoleNodes.map(node =>
            node.id === nodeId ? { ...node, position: newPosition } : node
        )
    );
    setAssetNodes(prevAssetNodes =>
        prevAssetNodes.map(node =>
            node.id === nodeId ? { ...node, position: newPosition } : node
        )
    );
    setSelectedValue(prevSelectedValue => {
        const updatedSelectedValue = { ...prevSelectedValue, childNodes: prevSelectedValue.childNodes.map(role => ({
            ...role,
            childNodes: role.childNodes.map(asset => {
                if (asset.id === nodeId) {
                    return { ...asset, position: newPosition };
                }
                return asset;
            }),
            position: role.id === nodeId ? newPosition : role.position,
            })),
                position: prevSelectedValue.id === nodeId ? newPosition : prevSelectedValue.position,
        };
            return updatedSelectedValue;
     });


    updateConnections();
};
const updateConnections = () => {
    const updatedConnections = connections.map(connection => {
        const fromNode = nodes.find(node => node.id === connection.from);
        const toNode = nodes.find(node => node.id === connection.to);

        if (fromNode && toNode) {
            return {
                ...connection,
                fromPosition: fromNode.position,
                toPosition: toNode.position,
            };
        }
        return connection;
    });
    setConnections(updatedConnections);
};
const addConnection = (from: string, to: string) => {
  setConnections(prevConnections => [...prevConnections, {
    id: uuidv4(),
    from: from,
    to: to,
    fromPosition: nodes.find(node => node.id === from)?.position || {x:0, y:0},
    toPosition: nodes.find(node => node.id === to)?.position || {x:0, y:0},
  }])
}

const removeConnection = (connectionId: string) => {
  setConnections(prevConnections => prevConnections.filter(connection => connection.id !== connectionId))
}

return (
    <AppContext.Provider value={{
        nodes,
        setNodes,
        activeNodeId,
        setActiveNodeId,
        video,
        setVideo,
        videoPlayer,
        setVideoPlayer,
        fullImageDisplay,
        setFullImageDisplay,
        valueTypes,
        valueNodes,
        setValueNodes,
        roleNodes,
        setRoleNodes,
        assetNodes,
        setAssetNodes,
        selectedValue,
        setSelectedValue,
        newNodeDisplay,
        setNewNodeDisplay,
        editTextDisplay,
        setEditTextDisplay,
        expandedImage,
        setExpandedImage,
        updateNodePosition,
        updateConnections,
        connections,
        setConnections,
        addConnection,
        removeConnection,
    }}>
        {children}
    </AppContext.Provider>
);
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};