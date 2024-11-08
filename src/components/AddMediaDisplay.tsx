export default function AddMediaDisplay({
    handleAddImage,
    handleAddVideo
}: {
    handleAddImage: () => void;
    handleAddVideo: () => void;
}) {
    return (
        <div className='bg-gray-500 text-white p-8 flex flex-col text-center justify-center text-xl'>
            <h1>Add Media</h1>
            <div className='flex flex-row justify-center text-center p-2'>
                <button
                    className='bg-blue-500 p-2 mx-2'
                    onClick={() => handleAddImage()}
                >
                    Add Picture
                </button>
                <button
                    className='bg-green-500 p-2 mx-2'
                    onClick={() => handleAddVideo()}
                >
                    Add Video
                </button>
            </div>
        </div>
    )
}