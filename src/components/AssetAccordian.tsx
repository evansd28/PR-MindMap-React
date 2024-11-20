import { useState } from "react"
import { useAppContext } from "../context/Context";
import { v4 as uuidv4 } from 'uuid';

export default function AssetAccordian() {
    const [showAccordian, setShowAccordian] = useState<boolean>(true);
    const { valueTypes, setSelectedValue, valueNodes } = useAppContext();

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
                    {valueTypes.map((value: string, index: number) => {
                        return (
                            <button
                                className="bg-orange-500 hover:bg-orange-400 rounded my-1 p-1 text-white"
                                onClick={() => setSelectedValue(valueNodes[index])}
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