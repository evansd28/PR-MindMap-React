import { useState } from "react"
import { useAppContext } from "../context/Context";

export default function EditAssetTextDisplay() {
    const [newText, setNewText] = useState<string>("");
    const { setEditTextDisplay, activeNodeId, selectedValue } = useAppContext();

    const updateText = () => {
        selectedValue.childNodes.forEach((role) => {
            if(role.id === activeNodeId) {
                role.text = newText;
            }
            role.childNodes.forEach((asset) => {
                if(asset.id === activeNodeId) {
                    asset.text = newText;
                }
            })
        })
        setEditTextDisplay(false);
    }

    return (
        <div className="bg-gray-200 border-2 border-gray-400 shadow-xl rounded-xl text-black p-8 flex flex-col text-center items-center justify-center text-xl">
            <div className="flex flex-col">
                <h1>Edit Text</h1>
                <input
                    type="text"
                    className="p-2 text-black rouneded border-2 border-gray-400 rounded w-96"
                    placeholder="edit the current text here"
                    onChange={(e) => setNewText(e.target.value)}></input>
            </div>
            <div className="flex flex-row gap-4">
                <button
                    className="mt-2 bg-orange-500 text-white p-2 rounded-xl w-44 m-auto"
                    onClick={updateText}
                >
                    Update Text
                </button>
                <button
                    className="mt-2 bg-orange-500 text-white p-2 rounded-xl w-44 m-auto"
                    onClick={() => setEditTextDisplay(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}