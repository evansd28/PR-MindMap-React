export default function AddMediaDisplay({
    handleAddImage,
    handleAddVideo,
    setMediaDisplay
}: {
    handleAddImage: () => void;
    handleAddVideo: () => void;
    setMediaDisplay: (display: boolean) => void
}) {
    return (
        <div className='bg-gray-200 text-black rounded-xl p-8 flex flex-col border-2 border-gray-400 text-center justify-center items-center text-xl'>
            <h1>Add Media</h1>
            <div className='flex flex-row justify-center text-center p-2'>
                <button
                    className='bg-orange-500 hover:bg-orange-400 text-white rounded p-2 mx-2'
                    onClick={() => handleAddImage()}
                >
                    Add Picture
                </button>
                <button
                    className='bg-orange-500 hover:bg-orange-400 text-white rounded p-2 mx-2'
                    onClick={() => handleAddVideo()}
                >
                    Add Video
                </button>
            </div>
            <button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded p-2 mx-2 w-1/4 mt-2"
                onClick={() => setMediaDisplay(false)}
            >
                Cancel
            </button>
        </div>
    )
}