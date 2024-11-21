import { useAppContext } from "../context/Context"

export default function FullImageDisplay() {
    const { expandedImage, setFullImageDisplay } = useAppContext();
    
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="max-h-screen bg-white rounded-lg p-5">
                <img src={expandedImage} alt="Node Image" width={700} />
                <button onClick={() => setFullImageDisplay(false)} className="mt-4 bg-red-500  text-white font-bold py-2 px-4 rounded flex m-auto">
                    Close
                </button>
            </div>
        </div>
    )
}