import { useState } from "react"

export default function EditNodeDIsplay({ setEditNodeDisplay, editedNodeInfo }) {
    const [editedText, setEditedText] = useState<string>(editedNodeInfo.text)

    return (
        <div className="bg-gray-500 text-white p-8 flex flex-col text-center justify-center text-xl">
            <h1>Edit Node</h1>
            <input
                type="text"
                className="p-2 text-black rouneded border-2 border-black"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <button className="mt-2 bg-green-500 text-white p-2 rounded-xl w-1/2 m-auto">Submit Edit</button>
        </div>
    )
}