import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContextState, Node } from '../Types/types';
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

useEffect(() => {
    console.log(selectedValue.childNodes)
}, [selectedValue])

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
        setExpandedImage
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