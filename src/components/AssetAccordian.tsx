import { useState } from "react"
import { useAppContext } from "../context/Context";
import { v4 as uuidv4 } from 'uuid';

export default function AssetAccordian() {
    const [showAccordian, setShowAccordian] = useState<boolean>(true);
    const [valueList] = useState<string[]>([
        "Financial Security",
        "Social Security",
        "Job Skills",
        "Family Oriented-Skills",
        "Physical Health",
        "Mental Health",
        "Supporting Loved Ones",
        "Supporting Others Like Us"
    ])
    const { setNodes } = useAppContext();

    return (
        <div>
            <div className={`flex flex-col absolute z-10 mt-12 ${showAccordian && `bg-gray-200`} h-screen p-2`}>
                <button
                    className="flex flex-start bg-gray-400 hover:bg-gray-300 w-12 justify-center text-white rounded p-1 my-1"
                    onClick={() => setShowAccordian(!showAccordian)}
                >
                    {showAccordian ?
                        'hide' : 'show'
                    }
                </button>
                <div className={`text-center flex flex-col ${!showAccordian && `hidden`}`}>
                    <h1 className="text-xl my-2 font-semibold">Select a Value</h1>
                    {valueList.map((value) => {
                        return (
                            <button
                                className="bg-orange-500 hover:bg-orange-400 rounded my-1 p-1 text-white"
                                onClick={() => setNodes(prev => {
                                    const updatedNodes = [...prev];
                                    if (updatedNodes.length > 0) {
                                        updatedNodes[0] = {
                                            id: uuidv4(),
                                            position: { x: window.innerWidth / 2 - 110 / 2, y: window.innerHeight / 2 - 110 / 2 / 2 },
                                            nodeType: 'value',
                                            borderColor: 'black',
                                            text: value,
                                            image: "",
                                            video: "",
                                            connectedTo: null
                                        };
                                    }
                                    return updatedNodes;
                                })}
                            >
                                {value}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}