import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContextState, Node } from '../Types/types';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext<ContextState | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [valueNode, setValueNode] = useState<Node | undefined>(
        {
            id: uuidv4(),
            position: { x: window.innerWidth / 2 - 110/2, y: window.innerHeight / 2 - 110/2/2},
            nodeType: 'value',
            borderColor: 'black',
            text: "Financial Security",
            image: "",
            video: "",
            connectedTo: null
        }
    );
    const [nodes, setNodes] = useState<Node[]>([valueNode]);
    const [activeNodeId, setActiveNodeId] = useState<string | undefined>();
    const [video, setVideo] = useState<string | undefined>();
    const [videoPlayer, setVideoPlayer] = useState<boolean>(false);
    const [roleNodes, setRoleNodes] = useState<Node[]>([]);
    const [assetNodes, setAssetNodes] = useState<Node[]>([]);

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
            valueNode,
            setValueNode,
            roleNodes,
            setRoleNodes,
            assetNodes,
            setAssetNodes,
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