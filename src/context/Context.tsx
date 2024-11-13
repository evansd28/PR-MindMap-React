import React, { createContext, useContext, useState } from 'react';
import { ContextState, Node } from '../Types/types';

const AppContext = createContext<ContextState | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [activeNodeId, setActiveNodeId] = useState<string | undefined>();
    const [video, setVideo] = useState<string | undefined>();
    const [videoPlayer, setVideoPlayer] = useState<boolean>(false);
    const [valueNode, setValueNode] = useState<Node | undefined>();
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
            setAssetNodes
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